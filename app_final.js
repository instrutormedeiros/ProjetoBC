/* === ARQUIVO app_final.js (VERSÃO COMPLETA V14 - CORRIGIDA E ATUALIZADA) === */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SEGURANÇA CRÍTICA: Verifica se o conteúdo (data.js) foi carregado
    if (typeof window.moduleContent === 'undefined') {
        console.error("ERRO CRÍTICO: data.js não carregado.");
        // Exibe mensagem amigável se falhar
        document.body.innerHTML = '<div style="color:#333; text-align:center; padding:50px; font-family:sans-serif; background:#f8f9fa; height:100vh; display:flex; align-items:center; justify-content:center;"><div><h2 style="margin-bottom:10px">Erro de Conexão</h2><p>O conteúdo do curso não pôde ser carregado.<br>Verifique sua internet e recarregue a página.</p><button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">Recarregar</button></div></div>';
        return;
    }

    // --- VARIÁVEIS GLOBAIS ---
    const contentArea = document.getElementById('content-area');
    const totalModules = Object.keys(window.moduleContent || {}).length; 
    let completedModules = JSON.parse(localStorage.getItem('gateBombeiroCompletedModules_v3')) || [];
    let notifiedAchievements = JSON.parse(localStorage.getItem('gateBombeiroNotifiedAchievements_v3')) || [];
    let currentModuleId = null;
    let cachedQuestionBanks = {}; 
    let currentUserData = null; 

    // --- VARIÁVEIS DE ÁUDIO (NOVAS) ---
    let speechUtterance = null;
    let isSpeaking = false;
    let isPaused = false;
    let currentSpeed = 1.0;

    // --- VARIÁVEIS PARA O SIMULADO ---
    let simuladoTimerInterval = null;
    let simuladoTimeLeft = 0;
    let activeSimuladoQuestions = [];
    let userAnswers = {};
    let currentSimuladoQuestionIndex = 0; 

    // --- VARIÁVEIS PARA MODO SOBREVIVÊNCIA ---
    let survivalLives = 3;
    let survivalScore = 0;
    let survivalQuestions = [];
    let currentSurvivalIndex = 0;

    // --- SELETORES DO DOM ---
    const toastContainer = document.getElementById('toast-container');
    const sidebar = document.getElementById('off-canvas-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const printWatermark = document.getElementById('print-watermark');
    const achievementModal = document.getElementById('achievement-modal');
    const achievementOverlay = document.getElementById('achievement-modal-overlay');
    const closeAchButton = document.getElementById('close-ach-modal');
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const adminBtn = document.getElementById('admin-panel-btn');
    const mobileAdminBtn = document.getElementById('mobile-admin-btn');
    const adminModal = document.getElementById('admin-modal');
    const adminOverlay = document.getElementById('admin-modal-overlay');
    const closeAdminBtn = document.getElementById('close-admin-modal');

    // --- INICIALIZAÇÃO DO SISTEMA ---
    function init() {
        setupProtection();
        setupTheme();
        
        // Tenta injetar melhorias com tratamento de erro para não quebrar o app
        try { injectVoiceflowFix(); } catch(e) { console.warn("Aviso Voiceflow:", e); }
        try { injectWhatsAppButton(); } catch(e) { console.warn("Aviso WhatsApp:", e); }
        
        setupMobileBackNavigation();

        const firebaseConfig = {
          apiKey: "AIzaSyDNet1QC72jr79u8JpnFMLBoPI26Re6o3g",
          authDomain: "projeto-bravo-charlie-app.firebaseapp.com",
          projectId: "projeto-bravo-charlie-app",
          storageBucket: "projeto-bravo-charlie-app.firebasestorage.app",
          messagingSenderId: "26745008470",
          appId: "1:26745008470:web:5f25965524c646b3e666f7",
          measurementId: "G-Y7VZFQ0D9F"
        };
        
        if (typeof FirebaseCourse !== 'undefined') {
            FirebaseCourse.init(firebaseConfig);
            setupAuthEventListeners(); 
            
            // Listeners de Logout Global
            const logoutBtns = document.querySelectorAll('[id^="logout-"]');
            logoutBtns.forEach(btn => {
                btn.addEventListener('click', FirebaseCourse.signOutUser);
            });

            // Verifica autenticação ao iniciar
            FirebaseCourse.checkAuth((user, userData) => {
                onLoginSuccess(user, userData);
            });
        } else {
            console.error("Módulo FirebaseCourse não encontrado.");
        }
        
        setupHeaderScroll();
        
        // Inicializa Menu de Acessibilidade
        const fab = document.getElementById('accessibility-fab');
        const menu = document.getElementById('accessibility-menu');
        if(fab && menu) {
            fab.addEventListener('click', () => menu.classList.toggle('show'));
        }
        
        setupAccessibilityListeners();
    }

    function setupAccessibilityListeners() {
        document.getElementById('acc-font-plus')?.addEventListener('click', () => {
            let currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            document.documentElement.style.fontSize = (currentSize + 1) + 'px';
        });
        document.getElementById('acc-font-minus')?.addEventListener('click', () => {
            let currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            if(currentSize > 10) document.documentElement.style.fontSize = (currentSize - 1) + 'px';
        });
        document.getElementById('acc-dyslexic')?.addEventListener('click', () => {
            document.body.classList.toggle('dyslexic-font');
        });
        document.getElementById('acc-spacing')?.addEventListener('click', () => {
            document.body.classList.toggle('high-spacing');
        });
    }

    // --- MELHORIA 1: FIX POSIÇÃO VOICEFLOW ---
    function injectVoiceflowFix() {
        const checkChat = setInterval(() => {
            const chatHost = document.getElementById('voiceflow-chat');
            if (chatHost && chatHost.shadowRoot) {
                clearInterval(checkChat);
                const style = document.createElement('style');
                style.textContent = `
                    .vfrc-launcher {
                        bottom: 20px !important; 
                        left: 20px !important;
                        right: auto !important;
                        position: fixed !important;
                        z-index: 9999 !important;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                    }
                    @media (max-width: 768px) {
                        .vfrc-launcher { bottom: 80px !important; left: 20px !important; }
                        .vfrc-widget--chat { bottom: 140px !important; left: 20px !important; right: auto !important; width: 85vw !important; height: 60vh !important; }
                    }
                `;
                chatHost.shadowRoot.appendChild(style);
            }
        }, 1000);
    }

    // --- MELHORIA 2: BOTÃO WHATSAPP (CORREÇÃO DE INSERÇÃO) ---
    function injectWhatsAppButton() {
        if (document.getElementById('whatsapp-proof-btn')) return;

        const logoutBtn = document.getElementById('logout-expired-button');
        
        // Só tenta inserir se o botão de logout existir (garantia de estar no modal correto)
        if (logoutBtn && logoutBtn.parentNode) {
            const container = document.createElement('div');
            container.className = "w-full text-center mb-6 pt-4 border-t border-gray-700 mt-4"; 
            container.innerHTML = `
                <a id="whatsapp-proof-btn" href="https://wa.me/5561992960683?text=Ol%C3%A1%2C%20estou%20enviando%20meu%20comprovante%20do%20Bravo%20Charlie" target="_blank" class="inline-flex items-center justify-center w-full md:w-auto bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105 mb-2 no-underline gap-2">
                    <i class="fab fa-whatsapp text-xl"></i> <span>Já fiz o PIX! Enviar Comprovante</span>
                </a>
                <p class="text-xs text-gray-500 mt-1">Envie o comprovante para liberação imediata pelo Administrador.</p>
            `;
            
            // Insere ANTES do botão de sair, usando o pai direto para evitar erros
            logoutBtn.parentNode.insertBefore(container, logoutBtn);
        }
    }

    // --- SUCESSO NO LOGIN ---
    function onLoginSuccess(user, userData) {
        currentUserData = userData; 
        document.body.setAttribute('data-app-ready', 'true');
        
        // Limpa todos os modais de login/bloqueio
        document.querySelectorAll('.modal, .modal-overlay').forEach(el => el.classList.remove('show'));
        
        // Atualiza UI de Boas-Vindas
        const greetingEl = document.getElementById('welcome-greeting');
        if(greetingEl) greetingEl.textContent = `Olá, ${userData.name.split(' ')[0]}!`;
        
        // Marca d'água
        if (printWatermark) {
            printWatermark.textContent = `Licenciado para ${userData.name} (CPF: ${userData.cpf || '...'}) - Proibida a Cópia`;
        }

        // Ativa Botões de Admin se for o caso
        if (userData.isAdmin === true) {
            if(adminBtn) adminBtn.classList.remove('hidden');
            if(mobileAdminBtn) mobileAdminBtn.classList.remove('hidden');
            setupAdminListeners();
        }

        checkTrialStatus(userData.acesso_ate);

        document.getElementById('total-modules').textContent = totalModules;
        document.getElementById('course-modules-count').textContent = totalModules;
        
        populateModuleLists();
        updateProgress();
        addEventListeners(); 
        handleInitialLoad();
    }

    // --- SISTEMA DE NAVEGAÇÃO ---
    async function loadModuleContent(id) {
        if (!id || !window.moduleContent[id]) return;
        const d = window.moduleContent[id];
        
        // Verifica Categoria e Premium
        const num = parseInt(id.replace('module', ''));
        let moduleCategory = null;
        for (const key in window.moduleCategories) {
            const cat = window.moduleCategories[key];
            if (num >= cat.range[0] && num <= cat.range[1]) { moduleCategory = cat; break; }
        }
        const userIsNotPremium = !currentUserData || currentUserData.status !== 'premium';
        
        // Bloqueio Premium
        if (moduleCategory && moduleCategory.isPremium && userIsNotPremium) { 
            renderPremiumLockScreen(d.title); return; 
        }

        // Histórico de Navegação
        if (currentModuleId !== id) {
            history.pushState({ module: id }, null, `#${id}`);
        }

        currentModuleId = id;
        localStorage.setItem('gateBombeiroLastModule', id);
        
        // Limpa estados anteriores
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (simuladoTimerInterval) clearInterval(simuladoTimerInterval);

        // Transição de UI
        contentArea.style.opacity = '0';
        loadingSpinner.classList.remove('hidden');
        contentArea.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Delay simulado para transição suave
        setTimeout(async () => {
            loadingSpinner.classList.add('hidden');
            contentArea.classList.remove('hidden'); 

            // Roteamento de Tipos de Módulo
            if (d.isIDCard) {
                contentArea.innerHTML = d.content;
                renderDigitalID();
            } else if (d.isSimulado) {
                renderSimuladoStart(d);
            } else if (id === 'module59') {
                renderTools();
            } else if (d.isSurvival) {
                contentArea.innerHTML = d.content;
                const scoreEl = document.getElementById('survival-last-score');
                const lastScore = localStorage.getItem('lastSurvivalScore');
                if(scoreEl && lastScore) scoreEl.innerText = `Recorde: ${lastScore}`;
                document.getElementById('start-survival-btn').addEventListener('click', initSurvivalGame);
            } else if (d.isRPG) {
                contentArea.innerHTML = d.content;
                document.getElementById('start-rpg-btn').addEventListener('click', () => initRPGGame(d.rpgData));
            } else {
                // Aula Padrão com Áudio
                renderLessonWithAudio(d, id, userIsNotPremium);
            }

            contentArea.style.opacity = '1';
            updateActiveModuleInList();
            updateNavigationButtons();
            updateBreadcrumbs(d.title);
            document.getElementById('module-nav').classList.remove('hidden');
            closeSidebar();
        }, 300);
    }

    // --- MELHORIA 6 e 7: RENDERIZAÇÃO COM PLAYER DE ÁUDIO ---
    function renderLessonWithAudio(d, id, userIsNotPremium) {
        let html = `
            <h3 class="flex items-center text-2xl md:text-3xl mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
                <i class="${d.iconClass} mr-4 text-orange-500 fa-fw"></i>${d.title}
            </h3>
            
            <div id="audio-player-container" class="flex flex-wrap items-center gap-3 mb-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 w-full md:w-auto shadow-sm">
                
                <button id="audio-play-btn" class="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-sm transition-colors min-w-[120px]">
                    <i id="audio-play-icon" class="fas fa-headphones mr-2"></i> <span id="audio-play-text">Ouvir</span>
                </button>

                <button id="audio-pause-btn" class="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-400 transition-colors border border-gray-300 dark:border-gray-600" title="Pausar/Continuar" disabled>
                    <i id="audio-pause-icon" class="fas fa-pause"></i>
                </button>

                <div class="flex items-center px-3 border-l border-gray-300 dark:border-gray-600 ml-2">
                    <i class="fas fa-tachometer-alt text-gray-500 mr-2 text-xs"></i>
                    <select id="audio-speed-select" class="bg-transparent text-sm font-bold text-gray-700 dark:text-white outline-none cursor-pointer p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <option value="0.5">0.5x (Lento)</option>
                        <option value="0.8">0.8x</option>
                        <option value="1.0" selected>1.0x (Normal)</option>
                        <option value="1.2">1.2x</option>
                        <option value="1.5">1.5x (Rápido)</option>
                        <option value="2.0">2.0x</option>
                    </select>
                </div>
            </div>

            <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                ${d.content}
            </div>
        `;

        if (d.driveLink && d.driveLink !== "SEU_LINK_DO_DRIVE_AQUI") {
            if (userIsNotPremium) {
                html += `<div class="mt-10 mb-8 p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg cursor-pointer transform hover:scale-[1.01] transition-all" onclick="document.getElementById('expired-modal').classList.add('show');"><div class="bg-gray-900 rounded-lg p-4 flex items-center justify-between text-white"><div class="flex items-center"><i class="fas fa-lock text-2xl mr-4 text-yellow-400"></i><div><p class="font-bold text-lg">Material Complementar</p><p class="text-xs text-gray-400">Vídeos e Fotos exclusivos para assinantes</p></div></div><button class="bg-yellow-500 text-black font-bold py-2 px-4 rounded text-xs hover:bg-yellow-400 transition-colors">DESBLOQUEAR</button></div></div>`;
            } else {
                html += `<div class="mt-10 mb-8"><a href="${d.driveLink}" target="_blank" class="drive-button flex items-center justify-center w-full p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors shadow-md"><i class="fab fa-google-drive mr-2 text-xl"></i> ACESSAR MATERIAL EXTRA NO DRIVE</a></div>`;
            }
        }

        const savedNote = localStorage.getItem('note-' + id) || '';
        html += `<div class="mt-12 pt-8 border-t-2 border-dashed border-gray-200 dark:border-gray-700"><h4 class="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200 flex items-center"><i class="fas fa-pencil-alt mr-3 text-orange-500"></i>Anotações Pessoais</h4><textarea id="notes-module-${id}" class="notes-textarea w-full p-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner text-gray-700 dark:text-gray-300" rows="5" placeholder="Digite suas anotações sobre esta aula aqui...">${savedNote}</textarea></div>`;
        
        html += `<div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-right"><button class="action-button conclude-button" data-module="${id}">Concluir Módulo</button></div>`;

        contentArea.innerHTML = html;
        
        initAudioLogic();
        setupConcludeButtonListener();
        setupNotesListener(id);
        
        if (window.QUIZ_DATA && window.QUIZ_DATA[id]) {
            renderEmbeddedQuiz(id);
        }
    }

    // --- LÓGICA DOS CONTROLES DE ÁUDIO ---
    function initAudioLogic() {
        const playBtn = document.getElementById('audio-play-btn');
        const pauseBtn = document.getElementById('audio-pause-btn');
        const speedSelect = document.getElementById('audio-speed-select');
        const playIcon = document.getElementById('audio-play-icon');
        const playText = document.getElementById('audio-play-text');
        const pauseIcon = document.getElementById('audio-pause-icon');

        if(!playBtn) return;

        playBtn.addEventListener('click', () => {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                isSpeaking = false;
                isPaused = false;
                updateAudioButtons(false, false);
            } else {
                speakContent();
            }
        });

        pauseBtn.addEventListener('click', () => {
            if (!isSpeaking) return;
            
            if (isPaused) {
                window.speechSynthesis.resume();
                isPaused = false;
                pauseIcon.className = "fas fa-pause";
            } else {
                window.speechSynthesis.pause();
                isPaused = true;
                pauseIcon.className = "fas fa-play";
            }
        });

        if(speedSelect) {
            speedSelect.addEventListener('change', (e) => {
                currentSpeed = parseFloat(e.target.value);
                if (isSpeaking) {
                    window.speechSynthesis.cancel();
                    speakContent();
                }
            });
        }

        function updateAudioButtons(speaking, paused) {
            if (speaking) {
                playIcon.className = "fas fa-stop";
                playText.textContent = "Parar";
                playBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
                playBtn.classList.add('bg-red-600', 'hover:bg-red-500');
                
                if(pauseBtn) {
                    pauseBtn.disabled = false;
                    pauseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
                if(pauseIcon) pauseIcon.className = paused ? "fas fa-play" : "fas fa-pause";
            } else {
                playIcon.className = "fas fa-headphones";
                playText.textContent = "Ouvir";
                playBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
                playBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                
                if(pauseBtn) {
                    pauseBtn.disabled = true;
                    pauseBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
                if(pauseIcon) pauseIcon.className = "fas fa-pause";
            }
        }
        // Expõe para uso global se necessário
        window.updateAudioUI = updateAudioButtons;
    }

    function speakContent() {
        if (!currentModuleId || !window.moduleContent[currentModuleId]) return;
        window.speechSynthesis.cancel();

        // Extrai apenas o texto limpo do HTML
        const div = document.createElement('div');
        div.innerHTML = window.moduleContent[currentModuleId].content;
        const cleanText = div.textContent || div.innerText || "";

        speechUtterance = new SpeechSynthesisUtterance(cleanText);
        speechUtterance.lang = 'pt-BR';
        speechUtterance.rate = currentSpeed;

        speechUtterance.onstart = () => {
            isSpeaking = true;
            isPaused = false;
            if(window.updateAudioUI) window.updateAudioUI(true, false);
        };
        
        speechUtterance.onend = () => {
            isSpeaking = false;
            isPaused = false;
            if(window.updateAudioUI) window.updateAudioUI(false, false);
        };

        speechUtterance.onerror = () => {
            isSpeaking = false;
            if(window.updateAudioUI) window.updateAudioUI(false, false);
        };

        window.speechSynthesis.speak(speechUtterance);
    }

    // --- MELHORIA 4 e 5: CARTEIRINHA DIGITAL (LAYOUT FIXO DARK) ---
    function renderDigitalID() {
        if (!currentUserData) return;
        const container = document.getElementById('id-card-container');
        if (!container) return;

        const savedPhoto = localStorage.getItem('user_profile_pic');
        const defaultPhoto = "https://raw.githubusercontent.com/instrutormedeiros/ProjetoBravoCharlie/refs/heads/main/assets/img/LOGO_QUADRADA.png"; 
        const currentPhoto = savedPhoto || defaultPhoto;
        const matricula = currentUserData.uid.substring(0, 8).toUpperCase();
        const validade = new Date(currentUserData.acesso_ate).toLocaleDateString('pt-BR');

        const style = `
            <style>
                .cards-wrapper { display: flex; flex-direction: column; gap: 20px; align-items: center; margin-top: 20px; }
                @media(min-width: 768px) { .cards-wrapper { flex-direction: row; justify-content: center; align-items: flex-start; } }
                .bc-card { width: 100%; max-width: 350px; aspect-ratio: 1.58/1; border-radius: 12px; overflow: hidden; position: relative; box-shadow: 0 10px 20px rgba(0,0,0,0.4); font-family: sans-serif; border: 1px solid #333; }
                .bc-front { background: #111827; display: flex; color: white; }
                .bc-sidebar { width: 35%; background: linear-gradient(180deg, #ea580c 0%, #c2410c 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; }
                .bc-photo { width: 80px; height: 100px; background: white; object-fit: cover; border: 2px solid white; border-radius: 6px; margin-bottom: 8px; cursor: pointer; }
                .bc-main { width: 65%; padding: 12px; display: flex; flex-direction: column; justify-content: center; }
                .bc-header { font-size: 9px; text-transform: uppercase; color: #9ca3af; letter-spacing: 1px; margin-bottom: 4px; }
                .bc-name { font-size: 14px; font-weight: bold; color: white; text-transform: uppercase; line-height: 1.2; margin-bottom: 12px; }
                .bc-row { display: flex; justify-content: space-between; font-size: 9px; border-bottom: 1px solid #374151; padding-bottom: 2px; margin-bottom: 6px; }
                .bc-label { color: #ea580c; font-weight: bold; }
                .bc-back { background: #1f2937; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 15px; color: #d1d5db; position: relative; }
                .bc-qr { background: white; padding: 4px; border-radius: 4px; margin-bottom: 8px; }
                .bc-legal { font-size: 7px; line-height: 1.3; max-width: 90%; }
                .bc-validity { background: #ea580c; color: white; font-size: 9px; font-weight: bold; padding: 3px 8px; border-radius: 4px; margin-top: 8px; }
            </style>
        `;

        container.innerHTML = style + `
            <div class="cards-wrapper animate-fade-in">
                <!-- FRENTE -->
                <div class="bc-card bc-front">
                    <div class="bc-sidebar">
                        <img src="${currentPhoto}" class="bc-photo" id="id-card-photo" onclick="document.getElementById('profile-pic-input').click()" title="Clique para alterar foto">
                        <img src="https://raw.githubusercontent.com/instrutormedeiros/ProjetoBravoCharlie/refs/heads/main/assets/img/LOGO_QUADRADA.png" style="width: 35px; opacity: 0.9;">
                    </div>
                    <div class="bc-main">
                        <div class="bc-header">Bombeiro Civil / Brigadista</div>
                        <div class="bc-name">${currentUserData.name}</div>
                        <div class="bc-row"><span class="bc-label">MATRÍCULA</span> <span>${matricula}</span></div>
                        <div class="bc-row"><span class="bc-label">CPF</span> <span>${currentUserData.cpf || '---'}</span></div>
                        <div class="bc-row"><span class="bc-label">TIPO SANG.</span> 
                            <input type="text" class="bg-transparent text-right w-10 text-white outline-none focus:text-orange-500" placeholder="---" onchange="window.saveExtraData('blood', this.value)" value="${localStorage.getItem('user_blood') || ''}">
                        </div>
                    </div>
                    <input type="file" id="profile-pic-input" class="hidden" accept="image/*" onchange="window.updateProfilePic(this)">
                </div>

                <!-- VERSO -->
                <div class="bc-card bc-back">
                    <div class="bc-qr">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Aluno:${currentUserData.name}|Valid:${validade}|Mat:${matricula}" width="70" height="70">
                    </div>
                    <p class="bc-legal">
                        O portador deste documento concluiu os requisitos teóricos do Curso de Formação, conforme Lei 9394/96 e normas vigentes. Válido em todo território nacional mediante apresentação de documento oficial com foto.
                    </p>
                    <div class="bc-validity">VALIDADE: ${validade}</div>
                </div>
            </div>
            <p class="text-center text-xs text-gray-500 mt-4"><i class="fas fa-camera mr-1"></i> Tire um print para salvar.</p>
        `;
    }

    // --- FUNÇÕES AUXILIARES ---
    window.updateProfilePic = function(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('id-card-photo').src = e.target.result;
                localStorage.setItem('user_profile_pic', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    window.saveExtraData = function(field, value) {
        if(value) localStorage.setItem('user_' + field, value);
    };

    // --- SIMULADOS E FERRAMENTAS ---
    function renderSimuladoStart(d) {
        contentArea.innerHTML = `
            <h3 class="text-3xl mb-4 pb-4 border-b text-orange-600 dark:text-orange-500 flex items-center">
                <i class="${d.iconClass} mr-3"></i> ${d.title}
            </h3>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 text-gray-700 dark:text-gray-300">
                ${d.content}
            </div>
            <div class="text-center mt-8">
                <button id="start-simulado-btn" class="action-button pulse-button text-xl px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
                    <i class="fas fa-play mr-2"></i> INICIAR SIMULADO
                </button>
            </div>
        `;
        document.getElementById('start-simulado-btn').addEventListener('click', () => startSimuladoMode(d));
    }
    
    function renderTools() {
        contentArea.innerHTML = `
            <h3 class="text-3xl mb-4 pb-4 border-b text-blue-600 dark:text-blue-400 flex items-center">
                <i class="fas fa-tools mr-3"></i> Ferramentas Operacionais
            </h3>
            <div id="tools-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in"></div>
        `;
        if (typeof window.ToolsApp !== 'undefined') {
            const g = document.getElementById('tools-grid');
            window.ToolsApp.renderPonto(g);
            window.ToolsApp.renderEscala(g);
            window.ToolsApp.renderPlanner(g);
            window.ToolsApp.renderWater(g);
            window.ToolsApp.renderNotes(g);
            window.ToolsApp.renderHealth(g);
        }
    }

    async function startSimuladoMode(moduleData) {
        loadingSpinner.classList.remove('hidden');
        contentArea.classList.add('hidden');

        activeSimuladoQuestions = await generateSimuladoQuestions(moduleData.simuladoConfig);
        userAnswers = {};
        simuladoTimeLeft = moduleData.simuladoConfig.timeLimit * 60; 
        currentSimuladoQuestionIndex = 0;
        
        contentArea.innerHTML = `
            <div class="relative pt-4 pb-12">
                <div id="simulado-timer-bar" class="simulado-header-sticky shadow-lg flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-b-lg sticky top-20 z-30 border-t-4 border-orange-500">
                    <span class="simulado-timer flex items-center font-mono text-xl font-bold text-orange-600 dark:text-orange-400">
                        <i class="fas fa-clock mr-2"></i><span id="timer-display">60:00</span>
                    </span>
                    <span class="simulado-progress text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-bold text-gray-600 dark:text-gray-300">
                        Questão <span id="q-current">1</span> / ${activeSimuladoQuestions.length}
                    </span>
                </div>
                <div class="mt-8 mb-6 px-2 text-center">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-2 inline-block">
                        ${moduleData.title}
                    </h3>
                </div>
                <div id="question-display-area" class="simulado-question-container min-h-[300px]"></div>
                <div class="mt-10 flex justify-between items-center px-4 pb-8">
                    <button id="sim-prev-btn" class="action-button bg-gray-500 hover:bg-gray-600 shadow-md" style="visibility: hidden;">
                        <i class="fas fa-arrow-left mr-2"></i> Anterior
                    </button>
                    <button id="sim-next-btn" class="action-button shadow-md">
                        Próxima <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;
        
        contentArea.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        window.scrollTo({top:0,behavior:'smooth'});

        showSimuladoQuestion(currentSimuladoQuestionIndex);
        startTimer(moduleData.id);

        document.getElementById('sim-next-btn').addEventListener('click', () => navigateSimulado(1, moduleData.id));
        document.getElementById('sim-prev-btn').addEventListener('click', () => navigateSimulado(-1, moduleData.id));
    }

    function showSimuladoQuestion(index) {
        const q = activeSimuladoQuestions[index];
        const container = document.getElementById('question-display-area');
        const savedAnswer = userAnswers[q.id] || null;
        
        let html = `
            <div class="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 animate-slide-in">
                <p class="font-bold text-lg mb-6 text-gray-800 dark:text-white leading-relaxed border-l-4 border-orange-500 pl-4">
                    <span class="text-orange-500 mr-2">#${index+1}</span> ${q.question}
                </p>
                <div class="space-y-3">
        `;
        for (const key in q.options) {
            const isChecked = savedAnswer === key ? 'checked' : '';
            const bgClass = savedAnswer === key ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 ring-1 ring-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700';
            
            html += `
                <label class="flex items-start p-4 rounded-lg border ${bgClass} cursor-pointer transition-all select-none group">
                    <input type="radio" name="q-curr" value="${key}" class="mt-1 mr-4 w-5 h-5 text-orange-600 focus:ring-orange-500" ${isChecked} onchange="window.registerSimuladoAnswer('${q.id}', '${key}')">
                    <span class="text-base text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        <strong class="mr-2 text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded text-sm">${key.toUpperCase()}</strong> 
                        ${q.options[key]}
                    </span>
                </label>
            `;
        }
        html += `</div></div>`;
        container.innerHTML = html;

        document.getElementById('q-current').innerText = index + 1;
        
        const prevBtn = document.getElementById('sim-prev-btn');
        const nextBtn = document.getElementById('sim-next-btn');
        
        prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        if (index === activeSimuladoQuestions.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i> ENTREGAR';
            nextBtn.className = "action-button bg-green-600 hover:bg-green-500 shadow-lg transform hover:scale-105 transition-transform";
        } else {
            nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right ml-2"></i>';
            nextBtn.className = "action-button shadow-md";
        }
    }

    window.registerSimuladoAnswer = function(qId, answer) {
        userAnswers[qId] = answer;
        // Atualiza UI imediatamente
        const currentCard = document.querySelector('.bg-white.dark\\:bg-gray-900');
        if(currentCard) {
            currentCard.querySelectorAll('label').forEach(lbl => {
                lbl.classList.remove('bg-blue-50', 'dark:bg-blue-900/30', 'border-blue-500', 'ring-1', 'ring-blue-500');
                lbl.classList.add('border-gray-200', 'dark:border-gray-700');
                if(lbl.querySelector('input').checked) {
                    lbl.classList.add('bg-blue-50', 'dark:bg-blue-900/30', 'border-blue-500', 'ring-1', 'ring-blue-500');
                    lbl.classList.remove('border-gray-200', 'dark:border-gray-700');
                }
            });
        }
    };

    function navigateSimulado(dir, modId) {
        const newIndex = currentSimuladoQuestionIndex + dir;
        if (newIndex >= 0 && newIndex < activeSimuladoQuestions.length) {
            currentSimuladoQuestionIndex = newIndex;
            showSimuladoQuestion(newIndex);
            const area = document.getElementById('question-display-area');
            if(area) area.scrollIntoView({behavior:'smooth', block:'start'});
        } else if (newIndex >= activeSimuladoQuestions.length) {
            if(confirm("Tem certeza que deseja entregar o simulado?")) {
                finishSimulado(modId);
            }
        }
    }

    function startTimer(modId) {
        const display = document.getElementById('timer-display');
        simuladoTimerInterval = setInterval(() => {
            simuladoTimeLeft--;
            const m = Math.floor(simuladoTimeLeft / 60), s = simuladoTimeLeft % 60;
            display.textContent = `${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
            
            // Alerta visual quando tempo está acabando
            if(simuladoTimeLeft < 60) display.classList.add('text-red-600', 'animate-pulse');
            
            if (simuladoTimeLeft <= 0) {
                clearInterval(simuladoTimerInterval);
                alert("Tempo esgotado! O simulado será encerrado.");
                finishSimulado(modId);
            }
        }, 1000);
    }

    function finishSimulado(modId) {
        clearInterval(simuladoTimerInterval);
        let correct = 0; 
        const total = activeSimuladoQuestions.length; 
        let feedbackHtml = '<div class="space-y-6">';

        activeSimuladoQuestions.forEach((q, i) => {
            const sel = userAnswers[q.id];
            const isCorrect = sel === q.answer;
            if(isCorrect) correct++;
            
            const statusClass = isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20';
            const icon = isCorrect ? '<i class="fas fa-check-circle text-green-500"></i>' : '<i class="fas fa-times-circle text-red-500"></i>';
            const correctAnswerText = q.options[q.answer];
            const selectedAnswerText = sel ? q.options[sel] : "Não respondeu";

            feedbackHtml += `
                <div class="p-5 rounded-lg border-l-4 ${statusClass} shadow-sm bg-white dark:bg-gray-800">
                    <div class="flex justify-between items-start mb-3">
                        <p class="font-bold text-gray-800 dark:text-gray-200 text-sm w-11/12">${i+1}. ${q.question}</p>
                        <span class="text-xl">${icon}</span>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-2 text-xs mb-4">
                        <div class="p-3 rounded ${isCorrect ? 'bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-100' : 'bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-100'}">
                            <span class="font-bold block mb-1 text-[10px] uppercase tracking-wider opacity-70">Sua Resposta</span> 
                            <span class="font-semibold">${sel ? sel.toUpperCase() + ') ' + selectedAnswerText : 'Em branco'}</span>
                        </div>
                        ${!isCorrect ? `
                        <div class="p-3 rounded bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100 border border-blue-200 dark:border-blue-800/50">
                            <span class="font-bold block mb-1 text-[10px] uppercase tracking-wider opacity-70">Resposta Correta</span> 
                            <span class="font-semibold">${q.answer.toUpperCase()}) ${correctAnswerText}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        <strong><i class="fas fa-info-circle mr-1 text-blue-500"></i> Explicação:</strong><br> 
                        ${q.explanation || 'Sem explicação adicional.'}
                    </div>
                </div>
            `;
        });
        feedbackHtml += '</div>';

        const score = (correct/total)*10;
        const percentage = ((correct/total)*100).toFixed(0);
        
        contentArea.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-8 text-center animate-slide-in">
                <h2 class="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Resultado Final</h2>
                
                <div class="relative w-40 h-40 mx-auto my-6 flex items-center justify-center rounded-full border-8 ${score >= 7 ? 'border-green-500' : 'border-orange-500'} shadow-inner bg-gray-50 dark:bg-gray-900">
                    <div class="text-center">
                        <div class="text-5xl font-extrabold text-gray-800 dark:text-white">${score.toFixed(1)}</div>
                        <div class="text-xs font-bold text-gray-500 uppercase mt-1">Nota</div>
                    </div>
                </div>
                
                <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    Você acertou <strong>${correct}</strong> de <strong>${total}</strong> questões (${percentage}%).
                </p>
                
                <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-700 h-4 rounded-full transition-all duration-1000 ease-out" style="width: 0%" id="score-bar"></div>
                </div>
                
                ${score >= 7 ? 
                    '<div class="mt-6 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg font-bold"><i class="fas fa-trophy mr-2"></i> Aprovado! Excelente desempenho.</div>' : 
                    '<div class="mt-6 p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg font-bold"><i class="fas fa-book-reader mr-2"></i> Continue estudando para melhorar.</div>'
                }
            </div>
            
            <h4 class="text-xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-3 flex items-center">
                <i class="fas fa-clipboard-check mr-3 text-blue-500"></i> Gabarito Detalhado
            </h4>
            
            ${feedbackHtml}
            
            <div class="text-center mt-12 pb-12">
                <button onclick="location.reload()" class="action-button bg-gray-600 hover:bg-gray-500 shadow-lg px-8 py-3">
                    <i class="fas fa-undo mr-2"></i> Voltar ao Início
                </button>
            </div>
        `;
        
        window.scrollTo({top:0,behavior:'smooth'});
        
        // Animação da barra
        setTimeout(() => {
            const bar = document.getElementById('score-bar');
            if(bar) bar.style.width = `${percentage}%`;
        }, 300);

        if(!completedModules.includes(modId)) {
            completedModules.push(modId);
            localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules));
            updateProgress();
        }
    }

    async function generateSimuladoQuestions(config) {
        const allQuestions = []; const questionsByCategory = {};
        
        for (const catKey in window.moduleCategories) {
            questionsByCategory[catKey] = []; 
            const cat = window.moduleCategories[catKey];
            for (let i = cat.range[0]; i <= cat.range[1]; i++) {
                const modId = `module${i}`;
                if (window.QUIZ_DATA && window.QUIZ_DATA[modId]) {
                    questionsByCategory[catKey].push(...window.QUIZ_DATA[modId]);
                }
            }
        }
        
        for (const [catKey, qty] of Object.entries(config.distribution)) {
            if (questionsByCategory[catKey] && questionsByCategory[catKey].length > 0) {
                const available = questionsByCategory[catKey];
                const needed = Math.min(qty, available.length);
                allQuestions.push(...shuffleArray(available).slice(0, needed));
            }
        }
        
        return shuffleArray(allQuestions);
    }

    async function renderEmbeddedQuiz(moduleId) {
        let questions = window.QUIZ_DATA[moduleId];
        if (!questions || !questions.length) return;
        
        const shuffled = shuffleArray([...questions]).slice(0, 4);
        const quizContainer = document.createElement('div');
        quizContainer.className = "mt-10 mb-10 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md";
        
        let quizHtml = `
            <div class="flex items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 text-blue-600 dark:text-blue-400">
                    <i class="fas fa-brain text-xl"></i>
                </div>
                <h4 class="text-xl font-bold text-gray-800 dark:text-white">Exercícios de Fixação</h4>
            </div>
        `;
        
        shuffled.forEach((q, index) => {
            quizHtml += `
                <div class="mb-8 last:mb-0 quiz-item-container">
                    <p class="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-base leading-relaxed">
                        <span class="font-bold text-blue-500 mr-1">${index + 1}.</span> ${q.question}
                    </p>
                    <div class="space-y-2 quiz-options-group pl-2">
            `;
            for (const key in q.options) {
                quizHtml += `
                    <button class="quiz-option w-full text-left p-3.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-start group" data-answer="${key}" data-correct="${q.answer}" data-explanation="${q.explanation || ''}">
                        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 mr-3 transition-colors border border-gray-300 dark:border-gray-600 uppercase">
                            ${key}
                        </span>
                        <span class="flex-1 text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">${q.options[key]}</span>
                        <span class="ripple"></span>
                    </button>
                `;
            }
            quizHtml += `</div><div class="feedback-area hidden mt-4 p-4 rounded-lg text-sm animate-fade-in border-l-4"></div></div>`;
        });
        
        quizContainer.innerHTML = quizHtml;
        
        const concludeBtnDiv = contentArea.querySelector('.conclude-button')?.parentElement;
        if (concludeBtnDiv) contentArea.insertBefore(quizContainer, concludeBtnDiv); else contentArea.appendChild(quizContainer);
        
        quizContainer.querySelectorAll('.quiz-option').forEach(btn => btn.addEventListener('click', handleEmbeddedQuizClick));
    }

    function handleEmbeddedQuizClick(e) {
        const btn = e.currentTarget;
        const parent = btn.closest('.quiz-options-group');
        const feedback = parent.nextElementSibling;
        const isCorrect = btn.dataset.answer === btn.dataset.correct;
        const explanation = btn.dataset.explanation;
        
        parent.querySelectorAll('.quiz-option').forEach(b => {
            b.disabled = true;
            if (b.dataset.answer === btn.dataset.correct) {
                b.classList.add('bg-green-50', 'dark:bg-green-900/30', 'border-green-500', 'ring-1', 'ring-green-500');
                b.querySelector('span:first-child').classList.add('bg-green-200', 'text-green-800', 'border-green-300');
            } else if (b === btn && !isCorrect) {
                b.classList.add('bg-red-50', 'dark:bg-red-900/30', 'border-red-500');
                b.querySelector('span:first-child').classList.add('bg-red-200', 'text-red-800', 'border-red-300');
            } else {
                b.classList.add('opacity-60');
            }
        });
        
        feedback.classList.remove('hidden');
        if (isCorrect) {
            feedback.classList.add('bg-green-50', 'dark:bg-green-900/20', 'border-green-500', 'text-green-900', 'dark:text-green-100');
            feedback.innerHTML = `<div class="flex gap-2"><i class="fas fa-check-circle text-green-500 text-lg mt-0.5"></i><div><strong>Correto!</strong><br>${explanation}</div></div>`;
            if(typeof confetti === 'function') confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 }, zIndex: 50 });
        } else {
            feedback.classList.add('bg-red-50', 'dark:bg-red-900/20', 'border-red-500', 'text-red-900', 'dark:text-red-100');
            feedback.innerHTML = `<div class="flex gap-2"><i class="fas fa-times-circle text-red-500 text-lg mt-0.5"></i><div><strong>Incorreto.</strong><br>${explanation}</div></div>`;
        }
    }

    // --- ADMIN ---
    window.openAdminPanel = async function() {
        const am = document.getElementById('admin-modal');
        const ao = document.getElementById('admin-modal-overlay');
        am.classList.add('show'); ao.classList.add('show');
        
        const tbody = document.getElementById('admin-table-body');
        tbody.innerHTML = '<tr><td colspan="6" class="p-8 text-center"><div class="loader mx-auto mb-2"></div><p class="text-gray-500">Carregando base de alunos...</p></td></tr>';
        
        try {
            const snapshot = await window.__fbDB.collection('users').orderBy('name').get();
            if (snapshot.empty) {
                tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-gray-500">Nenhum aluno encontrado.</td></tr>';
                return;
            }
            
            tbody.innerHTML = '';
            snapshot.forEach(doc => {
                const u = doc.data();
                const isPrem = u.status === 'premium';
                const row = `
                    <tr class="border-b hover:bg-gray-50 transition-colors">
                        <td class="p-3">
                            <div class="font-bold text-gray-800">${u.name || 'Sem Nome'}</div>
                            <div class="text-xs text-gray-400">ID: ${doc.id.substr(0,8)}...</div>
                        </td>
                        <td class="p-3 text-sm">
                            <div class="text-gray-700">${u.email}</div>
                            <div class="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-1 rounded mt-1">${u.cpf || 'CPF N/A'}</div>
                        </td>
                        <td class="p-3 text-xs text-gray-500 max-w-[150px] truncate" title="${u.last_device}">${u.last_device ? u.last_device.split(')')[0]+')' : '-'}</td>
                        <td class="p-3">
                            <span class="px-2 py-1 rounded-full text-xs font-bold uppercase ${isPrem?'bg-green-100 text-green-800 border border-green-200':'bg-yellow-100 text-yellow-800 border border-yellow-200'}">
                                ${u.status || 'trial'}
                            </span>
                        </td>
                        <td class="p-3 text-sm font-medium ${new Date(u.acesso_ate) < new Date() ? 'text-red-500' : 'text-green-600'}">
                            ${u.acesso_ate ? new Date(u.acesso_ate).toLocaleDateString('pt-BR') : '-'}
                        </td>
                        <td class="p-3">
                            <div class="flex gap-1">
                                <button class="bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded border border-blue-200" title="Editar Dados" onclick="window.editUserData('${doc.id}', '${u.name}', '${u.cpf}')"><i class="fas fa-pen"></i></button>
                                <button class="bg-green-50 text-green-600 hover:bg-green-100 p-1.5 rounded border border-green-200" title="Renovar Acesso" onclick="window.manageUserAccess('${doc.id}', '${u.acesso_ate}')"><i class="fas fa-calendar-plus"></i></button>
                                <button class="bg-red-50 text-red-600 hover:bg-red-100 p-1.5 rounded border border-red-200" title="Excluir" onclick="window.deleteUser('${doc.id}', '${u.name}', '${u.cpf}')"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>`;
                tbody.innerHTML += row;
            });
        } catch(e) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-red-500">Erro: ${e.message}</td></tr>`;
        }
    };

    window.editUserData = async function(uid, oldName, oldCpf) {
        const newName = prompt("Editar Nome:", oldName); if (newName === null) return;
        const newCpf = prompt("Editar CPF (somente números):", oldCpf); if (newCpf === null) return;
        if(!newName || !newCpf) return alert("Campos obrigatórios");
        
        try {
            const batch = window.__fbDB.batch();
            const userRef = window.__fbDB.collection('users').doc(uid);
            batch.update(userRef, { name: newName, cpf: newCpf });
            
            // Atualiza índice de CPF se mudou
            if(oldCpf && oldCpf !== 'undefined' && oldCpf !== newCpf) {
                batch.delete(window.__fbDB.collection('cpfs').doc(oldCpf));
                batch.set(window.__fbDB.collection('cpfs').doc(newCpf), { uid: uid });
            } else if (!oldCpf || oldCpf === 'undefined') {
                batch.set(window.__fbDB.collection('cpfs').doc(newCpf), { uid: uid });
            }
            await batch.commit();
            alert("Usuário atualizado!");
            window.openAdminPanel();
        } catch(e) { alert("Erro: " + e.message); }
    };

    window.manageUserAccess = async function(uid, currentExpiry) {
        const days = prompt("Quantos dias adicionar ao acesso deste aluno?", "30");
        if(!days) return;
        
        const now = new Date();
        let baseDate = new Date(currentExpiry);
        // Se já venceu, adiciona a partir de hoje
        if (isNaN(baseDate.getTime()) || baseDate < now) baseDate = now;
        
        baseDate.setDate(baseDate.getDate() + parseInt(days));
        
        try {
            await window.__fbDB.collection('users').doc(uid).update({ 
                status: 'premium', 
                acesso_ate: baseDate.toISOString(),
                planType: `Renovado Manual (+${days}d)`
            });
            alert("Acesso renovado com sucesso!");
            window.openAdminPanel();
        } catch(e) { alert("Erro: " + e.message); }
    };

    window.deleteUser = async function(uid, name, cpf) {
        if(!confirm(`ATENÇÃO: Excluir o aluno ${name} permanentemente?`)) return;
        if(prompt("Digite DELETAR para confirmar:") !== "DELETAR") return;
        
        try {
            const batch = window.__fbDB.batch();
            batch.delete(window.__fbDB.collection('users').doc(uid));
            if(cpf && cpf !== 'undefined') batch.delete(window.__fbDB.collection('cpfs').doc(cpf));
            await batch.commit();
            alert("Usuário removido.");
            window.openAdminPanel();
        } catch(e) { alert("Erro: " + e.message); }
    };
    
    function setupAdminListeners() {
        document.getElementById('admin-panel-btn')?.addEventListener('click', window.openAdminPanel);
        document.getElementById('mobile-admin-btn')?.addEventListener('click', window.openAdminPanel);
        document.getElementById('close-admin-modal')?.addEventListener('click', () => {
            document.getElementById('admin-modal').classList.remove('show');
            document.getElementById('admin-modal-overlay').classList.remove('show');
        });
    }

    // --- FUNÇÕES DE LAYOUT E HELPERS ---
    function setupHeaderScroll() { 
        window.addEventListener('scroll', () => { 
            const h = document.getElementById('main-header'); 
            if (window.scrollY > 20) h.classList.add('scrolled'); 
            else h.classList.remove('scrolled'); 
        }); 
    }
    
    function setupProtection() { 
        document.addEventListener('contextmenu', e => e.preventDefault()); 
        document.addEventListener('keydown', e => { 
            if (e.key === 'F12' || (e.ctrlKey && ['u','s','p','c'].includes(e.key.toLowerCase()))) e.preventDefault(); 
        }); 
        document.querySelectorAll('img').forEach(img => { 
            img.draggable = false; 
            img.addEventListener('dragstart', e => e.preventDefault()); 
        });
    }
    
    function setupTheme() { 
        const isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches); 
        document.documentElement.classList.toggle('dark', isDark); 
        updateThemeIcons(); 
    }
    
    function toggleTheme() { 
        document.documentElement.classList.toggle('dark'); 
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); 
        updateThemeIcons(); 
    }
    
    function updateThemeIcons() { 
        const icon = document.documentElement.classList.contains('dark') ? 'fa-sun' : 'fa-moon'; 
        document.querySelectorAll('#dark-mode-toggle-desktop i, #bottom-nav-theme i').forEach(i => i.className = `fas ${icon} text-xl`); 
    }
    
    function handleInitialLoad() { 
        const last = localStorage.getItem('gateBombeiroLastModule'); 
        if (last) loadModuleContent(last); 
        else goToHomePage(false); 
    }
    
    function setupAuthEventListeners() {
        // Lógica de login
        const btnLogin = document.getElementById('login-button');
        if(btnLogin) btnLogin.addEventListener('click', async () => {
            const email = document.getElementById('email-input').value;
            const pass = document.getElementById('password-input').value;
            const fb = document.getElementById('auth-feedback');
            if(!email || !pass) return fb.textContent = "Preencha todos os campos.";
            fb.textContent = "Autenticando...";
            fb.className = "text-center text-sm mt-4 text-blue-400 font-semibold";
            try { 
                localStorage.removeItem('my_session_id'); // Limpa sessão local antiga
                await FirebaseCourse.signInWithEmail(email, pass); 
                fb.textContent = "Sucesso! Carregando...";
            } catch(e) { 
                fb.className = "text-center text-sm mt-4 text-red-400 font-semibold";
                fb.textContent = "Erro: Verifique e-mail e senha."; 
            }
        });
        
        // Lógica de cadastro
        const btnSignup = document.getElementById('signup-button');
        if(btnSignup) btnSignup.addEventListener('click', async () => {
            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const pass = document.getElementById('password-input').value;
            const cpf = document.getElementById('cpf-input').value;
            const fb = document.getElementById('auth-feedback');
            
            if(!name || !email || !pass || !cpf) {
                fb.className = "text-center text-sm mt-4 text-red-400 font-semibold";
                return fb.textContent = "Preencha todos os campos.";
            }
            
            fb.className = "text-center text-sm mt-4 text-blue-400 font-semibold";
            fb.textContent = "Criando conta...";
            try { 
                await FirebaseCourse.signUpWithEmail(name, email, pass, cpf); 
                fb.textContent = "Conta criada! Entrando...";
            } catch(e) { 
                fb.className = "text-center text-sm mt-4 text-red-400 font-semibold";
                fb.textContent = e.message || "Erro ao criar conta."; 
            }
        });
        
        // Toggles de formulário
        document.getElementById('show-signup-button')?.addEventListener('click', () => { 
            document.getElementById('login-button-group').classList.add('hidden'); 
            document.getElementById('signup-button-group').classList.remove('hidden'); 
            document.getElementById('name-field-container').classList.remove('hidden'); 
            document.getElementById('cpf-field-container').classList.remove('hidden'); 
            document.getElementById('auth-title').textContent = "Nova Conta";
        });
        
        document.getElementById('show-login-button')?.addEventListener('click', () => { 
            document.getElementById('login-button-group').classList.remove('hidden'); 
            document.getElementById('signup-button-group').classList.add('hidden'); 
            document.getElementById('name-field-container').classList.add('hidden'); 
            document.getElementById('cpf-field-container').classList.add('hidden'); 
            document.getElementById('auth-title').textContent = "Área do Aluno";
        });
        
        // Botoes de abrir modal de pagamento
        const openPay = () => { document.getElementById('expired-modal').classList.add('show'); document.getElementById('name-modal-overlay').classList.add('show'); };
        document.getElementById('header-subscribe-btn')?.addEventListener('click', openPay);
        document.getElementById('mobile-subscribe-btn')?.addEventListener('click', openPay);
        document.getElementById('open-payment-login-btn')?.addEventListener('click', openPay);
        document.getElementById('close-payment-modal-btn')?.addEventListener('click', () => { 
            document.getElementById('expired-modal').classList.remove('show'); 
            // Só fecha o overlay se o usuário já estiver logado (app ready)
            if(document.body.getAttribute('data-app-ready') === 'true') {
                document.getElementById('name-modal-overlay').classList.remove('show'); 
            }
        });
    }

    function populateModuleLists() { 
        const html = getModuleListHTML();
        document.getElementById('desktop-module-container').innerHTML = html; 
        document.getElementById('mobile-module-container').innerHTML = html; 
    }
    
    function getModuleListHTML() {
        let html = `<div class="module-accordion-container space-y-3">`;
        
        for (const k in window.moduleCategories) {
            const cat = window.moduleCategories[k];
            const isLocked = cat.isPremium && (!currentUserData || currentUserData.status !== 'premium');
            const lockIcon = isLocked ? '<i class="fas fa-lock text-xs ml-2 text-yellow-500"></i>' : '';
            const catProgress = getCategoryProgress(cat);
            
            html += `
            <div class="accordion-item border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button class="accordion-button w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span class="flex items-center font-bold text-gray-700 dark:text-gray-200 text-sm md:text-base">
                        <i class="${cat.icon} w-6 mr-2 text-gray-400 dark:text-gray-500"></i>
                        ${cat.title} ${lockIcon}
                    </span>
                    <div class="flex items-center gap-3">
                        <span class="text-xs text-gray-400 font-mono">${catProgress}</span>
                        <i class="fas fa-chevron-down text-gray-400 transition-transform duration-300"></i>
                    </div>
                </button>
                <div class="accordion-panel bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 hidden">
                    <div class="p-2 grid grid-cols-1 gap-2">`;
            
            for (let i = cat.range[0]; i <= cat.range[1]; i++) {
                const m = window.moduleContent[`module${i}`];
                if (m) {
                    const isDone = completedModules.includes(m.id);
                    html += `
                    <div class="module-list-item p-3 rounded-lg cursor-pointer transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-white dark:hover:bg-gray-800 ${isDone ? 'opacity-70' : ''} ${currentModuleId === m.id ? 'bg-white dark:bg-gray-800 border-blue-500 dark:border-blue-500 shadow-sm ring-1 ring-blue-500' : ''}" data-module="${m.id}">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                    <i class="${m.iconClass} text-sm"></i>
                                </div>
                                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1">${m.title}</span>
                            </div>
                            ${isDone ? '<i class="fas fa-check-circle text-green-500 text-lg"></i>' : ''}
                        </div>
                    </div>`;
                }
            }
            html += `</div></div></div>`;
        }
        html += `</div>`;
        
        // Seção Conquistas
        html += `
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center">
                <i class="fas fa-medal mr-2 text-yellow-500"></i> Suas Conquistas
            </h3>
            <div id="achievements-grid" class="grid grid-cols-2 gap-3">`;
            
        for (const key in window.moduleCategories) {
            const cat = window.moduleCategories[key];
            const isUnlocked = notifiedAchievements.includes(key);
            html += `
            <div id="ach-cat-${key}" class="achievement-card p-3 rounded-lg border ${isUnlocked ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'} flex flex-col items-center text-center transition-all">
                <div class="text-2xl mb-2 ${isUnlocked ? 'text-yellow-500' : 'text-gray-400'}">
                    <i class="${cat.icon}"></i>
                </div>
                <p class="text-xs font-bold ${isUnlocked ? 'text-gray-800 dark:text-white' : 'text-gray-500'}">${cat.achievementTitle}</p>
            </div>`;
        }
        html += `</div></div>`;
        
        return html;
    }
    
    function getCategoryProgress(cat) {
        let total = 0;
        let done = 0;
        for(let i = cat.range[0]; i <= cat.range[1]; i++) {
            if(window.moduleContent[`module${i}`]) {
                total++;
                if(completedModules.includes(`module${i}`)) done++;
            }
        }
        return `${done}/${total}`;
    }

    function updateProgress() {
        const p = totalModules > 0 ? (completedModules.length / totalModules) * 100 : 0;
        document.getElementById('progress-text').textContent = `${p.toFixed(0)}%`;
        document.getElementById('completed-modules-count').textContent = completedModules.length;
        if (document.getElementById('progress-bar-minimal')) document.getElementById('progress-bar-minimal').style.width = `${p}%`;
        
        // Atualiza visualmente os itens da lista
        document.querySelectorAll('.module-list-item').forEach(i => { 
            const isDone = completedModules.includes(i.dataset.module);
            if(isDone && !i.innerHTML.includes('fa-check-circle')) {
               i.querySelector('div > div').insertAdjacentHTML('afterend', '<i class="fas fa-check-circle text-green-500 text-lg"></i>');
               i.classList.add('opacity-70');
            }
        });
        
        if (totalModules > 0 && completedModules.length === totalModules) {
            document.getElementById('congratulations-modal').classList.add('show');
            document.getElementById('modal-overlay').classList.add('show');
            if(typeof confetti === 'function') confetti();
        }
    }

    function updateActiveModuleInList() {
        document.querySelectorAll('.module-list-item').forEach(i => { 
            if (i.dataset.module === currentModuleId) {
                i.classList.add('bg-white', 'dark:bg-gray-800', 'border-blue-500', 'dark:border-blue-500', 'shadow-sm', 'ring-1', 'ring-blue-500');
                // Abre o acordeão pai
                const panel = i.closest('.accordion-panel');
                if(panel) {
                    panel.classList.remove('hidden');
                    panel.style.maxHeight = "none"; // Deixa fluir
                    const btn = panel.previousElementSibling;
                    if(btn) btn.querySelector('.fa-chevron-down').classList.add('rotate-180');
                }
            } else {
                i.classList.remove('bg-white', 'dark:bg-gray-800', 'border-blue-500', 'dark:border-blue-500', 'shadow-sm', 'ring-1', 'ring-blue-500');
            }
        });
    }

    function updateBreadcrumbs(title) {
        const container = document.getElementById('breadcrumb-container');
        if(container) container.innerHTML = title ? `<span class="text-gray-400">INÍCIO</span> <i class="fas fa-chevron-right text-[10px] mx-2 text-gray-300"></i> <span class="text-orange-500">${title}</span>` : `INÍCIO`;
    }

    function goToHomePage(pushState = true) {
        if(pushState) history.pushState(null, null, window.location.pathname);
        localStorage.removeItem('gateBombeiroLastModule'); currentModuleId = null;
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        
        contentArea.innerHTML = `
            <div class="text-center py-12 fade-in">
                <div class="floating inline-block p-6 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6 shadow-inner">
                    <i class="fas fa-shield-alt text-6xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white font-serif">Bem-vindo ao QG</h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                    Sua plataforma de formação de elite. Selecione um módulo no menu lateral para começar ou continuar seus estudos.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button onclick="loadModuleContent('module1')" class="action-button pulse-button text-lg flex items-center justify-center shadow-lg">
                        <i class="fas fa-play mr-3"></i> Começar Agora
                    </button>
                    <button onclick="loadModuleContent('module60')" class="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105 flex items-center justify-center">
                        <i class="fas fa-skull mr-3"></i> Desafio Sobrevivência
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('module-nav').classList.add('hidden');
        closeSidebar(); 
        updateBreadcrumbs();
    }

    function closeSidebar() { 
        sidebar.classList.remove('open'); 
        sidebarOverlay.classList.remove('show'); 
        setTimeout(() => sidebarOverlay.classList.add('hidden'), 300); 
    }
    
    function renderPremiumLockScreen(title) { 
        contentArea.innerHTML = `
            <div class="text-center py-16 px-6 animate-fade-in">
                <div class="inline-block p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-6 ring-4 ring-yellow-50 dark:ring-yellow-900/10">
                    <i class="fas fa-lock text-5xl text-yellow-600 dark:text-yellow-500"></i>
                </div>
                <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Conteúdo Exclusivo</h2>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
                    O módulo <strong>${title}</strong> faz parte do nosso pacote avançado de treinamento.
                </p>
                <button onclick="document.getElementById('expired-modal').classList.add('show'); document.getElementById('name-modal-overlay').classList.add('show');" class="action-button pulse-button text-lg px-8 py-4 shadow-xl transform hover:scale-105 transition-transform">
                    <i class="fas fa-crown mr-2"></i> DESBLOQUEAR TUDO AGORA
                </button>
                <p class="mt-4 text-sm text-gray-400">Acesso imediato após confirmação.</p>
            </div>`; 
        updateActiveModuleInList();
        updateBreadcrumbs(title);
    }
    
    function setupConcludeButtonListener() { 
        const b = document.querySelector(`.conclude-button[data-module="${currentModuleId}"]`); 
        if(b) b.addEventListener('click', () => { 
            if(!completedModules.includes(currentModuleId)) { 
                completedModules.push(currentModuleId); 
                localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules)); 
                updateProgress(); 
                b.disabled = true; 
                b.innerHTML = '<i class="fas fa-check mr-2"></i> Concluído';
                b.classList.add('opacity-75', 'cursor-not-allowed');
                if(typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); 
            } 
        }); 
    }
    
    function setupNotesListener(id) { 
        const area = document.getElementById(`notes-module-${id}`); 
        if(area) area.addEventListener('keyup', () => localStorage.setItem('note-'+id, area.value)); 
    }
    
    function shuffleArray(arr) { 
        let newArr = [...arr]; 
        for (let i = newArr.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; 
        } 
        return newArr; 
    }
    
    function updateNavigationButtons() { 
        const prev = document.getElementById('prev-module'), next = document.getElementById('next-module');
        if(!prev || !currentModuleId) return;
        const n = parseInt(currentModuleId.replace('module',''));
        
        if (n === 1) {
            prev.disabled = true;
            prev.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            prev.disabled = false;
            prev.classList.remove('opacity-50', 'cursor-not-allowed');
            prev.onclick = () => loadModuleContent(`module${n-1}`);
        }
        
        if (n === totalModules) {
            next.disabled = true;
            next.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            next.disabled = false;
            next.classList.remove('opacity-50', 'cursor-not-allowed');
            next.onclick = () => loadModuleContent(`module${n+1}`);
        }
    }
    
    function setupMobileBackNavigation() { 
        window.addEventListener('popstate', (e) => { 
            if(!e.state && currentModuleId) goToHomePage(false); 
        }); 
    }
    
    function setupRippleEffects() { 
        document.addEventListener('click', e => { 
            const btn = e.target.closest('.action-button') || e.target.closest('.quiz-option'); 
            if(btn) { 
                const r = document.createElement('span'); 
                r.className='ripple'; 
                const rect=btn.getBoundingClientRect(); 
                r.style.width=r.style.height=Math.max(rect.width,rect.height)+'px'; 
                r.style.left=e.clientX-rect.left-rect.width/2+'px'; 
                r.style.top=e.clientY-rect.top-rect.height/2+'px'; 
                btn.appendChild(r); 
                setTimeout(()=>r.remove(),600); 
            } 
        }); 
    }

    function addEventListeners() {
        document.getElementById('mobile-menu-button')?.addEventListener('click', () => { 
            sidebar.classList.add('open'); 
            sidebarOverlay.classList.remove('hidden'); 
            setTimeout(() => sidebarOverlay.classList.add('show'), 10); 
        });
        
        document.getElementById('close-sidebar-button')?.addEventListener('click', closeSidebar);
        sidebarOverlay?.addEventListener('click', closeSidebar);
        
        // Listener para o Accordion (Menu Lateral)
        document.addEventListener('click', e => {
            const moduleItem = e.target.closest('.module-list-item');
            if(moduleItem) loadModuleContent(moduleItem.dataset.module);
            
            const accBtn = e.target.closest('.accordion-button');
            if(accBtn) {
                const panel = accBtn.nextElementSibling;
                const icon = accBtn.querySelector('.fa-chevron-down');
                
                if(panel.classList.contains('hidden')) {
                    panel.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                } else {
                    panel.classList.add('hidden');
                    icon.classList.remove('rotate-180');
                }
            }
        });
        
        document.getElementById('home-button-desktop')?.addEventListener('click', () => goToHomePage());
        document.getElementById('bottom-nav-home')?.addEventListener('click', () => goToHomePage());
        
        document.getElementById('bottom-nav-modules')?.addEventListener('click', () => {
            sidebar.classList.add('open'); 
            sidebarOverlay.classList.remove('hidden'); 
            setTimeout(() => sidebarOverlay.classList.add('show'), 10);
        });
        
        document.getElementById('bottom-nav-theme')?.addEventListener('click', toggleTheme);
        document.getElementById('dark-mode-toggle-desktop')?.addEventListener('click', toggleTheme);
        document.getElementById('focus-mode-toggle')?.addEventListener('click', toggleFocusMode);
        document.getElementById('bottom-nav-focus')?.addEventListener('click', toggleFocusMode);
        
        // Modais
        document.getElementById('close-congrats')?.addEventListener('click', () => { 
            document.getElementById('congratulations-modal').classList.remove('show'); 
            document.getElementById('modal-overlay').classList.remove('show'); 
        });
        
        closeAchButton?.addEventListener('click', hideAchievementModal);
        achievementOverlay?.addEventListener('click', hideAchievementModal);
    }

    function toggleFocusMode() {
        document.body.classList.toggle('focus-mode');
        const isFocus = document.body.classList.contains('focus-mode');
        if(isFocus) {
            document.getElementById('focus-nav-bar')?.classList.remove('hidden');
            document.getElementById('focus-menu-desktop')?.classList.remove('hidden');
            document.getElementById('focus-menu-desktop')?.classList.add('flex');
            closeSidebar();
        } else {
            document.getElementById('focus-nav-bar')?.classList.add('hidden');
            document.getElementById('focus-menu-desktop')?.classList.add('hidden');
            document.getElementById('focus-menu-desktop')?.classList.remove('flex');
        }
    }

    function hideAchievementModal() {
        achievementModal?.classList.remove('show');
        achievementOverlay?.classList.remove('show');
    }

    // Inicializa
    init();
});
