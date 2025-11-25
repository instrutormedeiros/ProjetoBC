/* === ARQUIVO app_final.js (VERSÃO FINAL INTEGRADA V13 - COMPLETA) === */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. VARIÁVEIS GLOBAIS & ESTADO
    // ==========================================================================
    const contentArea = document.getElementById('content-area');
    // Garante a leitura de todos os módulos definidos no data.js
    const totalModules = Object.keys(window.moduleContent || {}).length; 
    
    let completedModules = JSON.parse(localStorage.getItem('gateBombeiroCompletedModules_v3')) || [];
    let notifiedAchievements = JSON.parse(localStorage.getItem('gateBombeiroNotifiedAchievements_v3')) || [];
    let currentModuleId = null;
    let cachedQuestionBanks = {}; 
    let currentUserData = null; 

    // --- Variáveis: Simulado ---
    let simuladoTimerInterval = null;
    let simuladoTimeLeft = 0;
    let activeSimuladoQuestions = [];
    let userAnswers = {};
    let currentSimuladoQuestionIndex = 0; 
    
    // --- Variáveis: Modo Sobrevivência ---
    let survivalLives = 3;
    let survivalScore = 0;
    let survivalQuestions = [];
    let survivalIndex = 0;

    // ==========================================================================
    // 2. SELETORES DO DOM
    // ==========================================================================
    const toastContainer = document.getElementById('toast-container');
    const sidebar = document.getElementById('off-canvas-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const printWatermark = document.getElementById('print-watermark');
    const achievementModal = document.getElementById('achievement-modal');
    const achievementOverlay = document.getElementById('achievement-modal-overlay');
    const closeAchButton = document.getElementById('close-ach-modal');
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Modais Gerais
    const resetModal = document.getElementById('reset-modal');
    const resetOverlay = document.getElementById('reset-modal-overlay');
    const confirmResetButton = document.getElementById('confirm-reset-button');
    const cancelResetButton = document.getElementById('cancel-reset-button');

    // Admin & Pagamento
    const adminBtn = document.getElementById('admin-panel-btn');
    const mobileAdminBtn = document.getElementById('mobile-admin-btn');
    const adminModal = document.getElementById('admin-modal');
    const adminOverlay = document.getElementById('admin-modal-overlay');
    const closeAdminBtn = document.getElementById('close-admin-modal');
    const expiredModal = document.getElementById('expired-modal');
    const closePayModal = document.getElementById('close-payment-modal-btn');
    const loginModalOverlay = document.getElementById('name-modal-overlay');
    const loginModal = document.getElementById('name-prompt-modal');

    // ==========================================================================
    // 3. ACESSIBILIDADE & UTILITÁRIOS
    // ==========================================================================
    
    const fab = document.getElementById('accessibility-fab');
    const menu = document.getElementById('accessibility-menu');
    let fontSizeScale = 1;

    if (fab) {
        fab.addEventListener('click', () => menu.classList.toggle('show'));
    }
    
    document.getElementById('acc-font-plus')?.addEventListener('click', () => {
        fontSizeScale += 0.1;
        document.documentElement.style.fontSize = (16 * fontSizeScale) + 'px';
    });
    document.getElementById('acc-font-minus')?.addEventListener('click', () => {
        if(fontSizeScale > 0.8) fontSizeScale -= 0.1;
        document.documentElement.style.fontSize = (16 * fontSizeScale) + 'px';
    });
    document.getElementById('acc-dyslexic')?.addEventListener('click', () => {
        document.body.classList.toggle('dyslexic-font');
    });
    document.getElementById('acc-spacing')?.addEventListener('click', () => {
        document.body.classList.toggle('high-spacing');
    });

    // --- AUDIOBOOK (Text-to-Speech) ---
    window.speakContent = function() {
        if (!currentModuleId || !moduleContent[currentModuleId]) return;
        
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            const icon = document.getElementById('audio-btn-icon');
            const text = document.getElementById('audio-btn-text');
            const btn = document.getElementById('audio-btn');
            if(icon) { icon.classList.remove('fa-stop'); icon.classList.add('fa-headphones'); }
            if(text) text.textContent = 'Ouvir Aula';
            if(btn) btn.classList.remove('audio-playing');
            return;
        }

        // Extrai apenas texto limpo do HTML do conteúdo
        const div = document.createElement('div');
        div.innerHTML = moduleContent[currentModuleId].content;
        const cleanText = div.textContent || div.innerText || "";

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9; // Velocidade levemente ajustada para naturalidade

        utterance.onstart = () => {
            const icon = document.getElementById('audio-btn-icon');
            const text = document.getElementById('audio-btn-text');
            const btn = document.getElementById('audio-btn');
            if(icon) { icon.classList.remove('fa-headphones'); icon.classList.add('fa-stop'); }
            if(text) text.textContent = 'Parar Áudio';
            if(btn) btn.classList.add('audio-playing');
        };
        
        utterance.onend = () => {
            const icon = document.getElementById('audio-btn-icon');
            const text = document.getElementById('audio-btn-text');
            const btn = document.getElementById('audio-btn');
            if(icon) { icon.classList.remove('fa-stop'); icon.classList.add('fa-headphones'); }
            if(text) text.textContent = 'Ouvir Aula';
            if(btn) btn.classList.remove('audio-playing');
        };

        window.speechSynthesis.speak(utterance);
    };

    // --- PWA INSTALL LOGIC ---
    let deferredPrompt;
    const installBtn = document.getElementById('install-app-btn');
    const installBtnMobile = document.getElementById('install-app-btn-mobile');
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIos) {
        if(installBtn) installBtn.classList.remove('hidden'); 
        if(installBtnMobile) installBtnMobile.classList.remove('hidden');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if(installBtn) installBtn.classList.remove('hidden'); 
      if(installBtnMobile) installBtnMobile.classList.remove('hidden'); 
    });

    window.addEventListener('appinstalled', () => {
        if(installBtn) installBtn.classList.add('hidden');
        if(installBtnMobile) installBtnMobile.classList.add('hidden');
        deferredPrompt = null;
    });

    async function triggerInstall() {
        if (isIos) {
            const iosModal = document.getElementById('ios-install-modal');
            const iosOverlay = document.getElementById('ios-modal-overlay');
            if (iosModal && iosOverlay) {
                iosModal.classList.add('show');
                iosOverlay.classList.add('show');
                document.getElementById('close-ios-modal')?.addEventListener('click', () => {
                    iosModal.classList.remove('show'); iosOverlay.classList.remove('show');
                });
                iosOverlay.addEventListener('click', () => {
                    iosModal.classList.remove('show'); iosOverlay.classList.remove('show');
                });
            } else {
                alert("Para instalar no iPhone:\n1. Toque em Compartilhar (quadrado com seta).\n2. Toque em 'Adicionar à Tela de Início'.");
            }
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                if(installBtn) installBtn.classList.add('hidden');
                if(installBtnMobile) installBtnMobile.classList.add('hidden');
            }
            deferredPrompt = null;
        } else {
            alert("Para instalar: Procure o ícone de (+) ou 'Instalar' na barra de endereço do seu navegador.");
        }
    }
    if(installBtn) installBtn.addEventListener('click', triggerInstall);
    if(installBtnMobile) installBtnMobile.addEventListener('click', triggerInstall);

    // ==========================================================================
    // 4. INICIALIZAÇÃO E AUTENTICAÇÃO (FIREBASE)
    // ==========================================================================
    if (typeof moduleContent === 'undefined' || typeof moduleCategories === 'undefined') {
        // Fallback de segurança se data.js não carregar
        document.getElementById('main-header')?.classList.add('hidden');
        document.querySelector('footer')?.classList.add('hidden');
        const contentAreaError = document.getElementById('content-area');
        if (contentAreaError) {
            contentAreaError.innerHTML = `<div class="text-center py-10 px-6"><h2 class="text-3xl font-bold text-red-700">Erro Crítico</h2><p class="mt-2 text-gray-600">O banco de dados de conteúdo (data.js) não foi carregado corretamente.</p><button onclick="location.reload()" class="action-button mt-6">Tentar Recarregar</button></div>`;
        }
        return; 
    }

    function init() {
        setupProtection();
        setupTheme();
        
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
            
            document.getElementById('logout-button')?.addEventListener('click', FirebaseCourse.signOutUser);
            document.getElementById('logout-expired-button')?.addEventListener('click', FirebaseCourse.signOutUser);
            document.getElementById('logout-button-header')?.addEventListener('click', FirebaseCourse.signOutUser);

            FirebaseCourse.checkAuth((user, userData) => {
                onLoginSuccess(user, userData);
            });
        }
        
        setupHeaderScroll();
        setupRippleEffects();
    }
    
    function onLoginSuccess(user, userData) {
        currentUserData = userData; 

        if (document.body.getAttribute('data-app-ready') === 'true') return;
        document.body.setAttribute('data-app-ready', 'true');
        
        // Fecha modais de login
        document.getElementById('name-prompt-modal')?.classList.remove('show');
        document.getElementById('name-modal-overlay')?.classList.remove('show');
        document.getElementById('expired-modal')?.classList.remove('show');
        
        const greetingEl = document.getElementById('welcome-greeting');
        if(greetingEl) greetingEl.textContent = `Olá, ${userData.name.split(' ')[0]}!`;
        
        if (printWatermark) {
            printWatermark.textContent = `Licenciado para ${userData.name} (CPF: ${userData.cpf || '...'}) - Proibida a Cópia`;
        }

        // Verifica se é Admin
        if (userData.isAdmin === true) {
            if(adminBtn) adminBtn.classList.remove('hidden');
            if(mobileAdminBtn) mobileAdminBtn.classList.remove('hidden');
        }

        checkTrialStatus(userData.acesso_ate);

        document.getElementById('total-modules').textContent = totalModules;
        document.getElementById('course-modules-count').textContent = totalModules;
        
        populateModuleLists();
        updateProgress();
        addEventListeners(); 
        handleInitialLoad();
    }

    // ==========================================================================
    // 5. PAINEL ADMINISTRATIVO
    // ==========================================================================
    window.openAdminPanel = async function() {
        if (!currentUserData || !currentUserData.isAdmin) return;
        adminModal.classList.add('show');
        adminOverlay.classList.add('show');
        
        const tbody = document.getElementById('admin-table-body');
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center">Carregando usuários...</td></tr>';

        try {
            const snapshot = await window.__fbDB.collection('users').orderBy('name').get();
            tbody.innerHTML = '';
            
            snapshot.forEach(doc => {
                const u = doc.data();
                const uid = doc.id;
                const isPremium = u.status === 'premium';
                const validade = u.acesso_ate ? new Date(u.acesso_ate).toLocaleDateString('pt-BR') : '-';
                const cpf = u.cpf || 'Sem CPF';
                const deviceInfo = u.last_device || 'Desconhecido';
                const noteIconColor = u.adminNote ? 'text-yellow-500' : 'text-gray-400';
                
                const row = `
                    <tr class="border-b hover:bg-gray-50 transition-colors">
                        <td class="p-3 font-bold text-gray-800">${u.name}</td>
                        <td class="p-3 text-gray-600 text-sm">${u.email}<br><span class="text-xs text-gray-500">CPF: ${cpf}</span></td>
                        <td class="p-3 text-xs text-gray-500 max-w-[150px] truncate" title="${deviceInfo}">${deviceInfo}</td>
                        <td class="p-3">
                            <span class="px-2 py-1 rounded text-xs font-bold uppercase ${isPremium ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                ${u.status || 'trial'}
                            </span>
                        </td>
                        <td class="p-3 text-sm font-medium">${validade}</td>
                        <td class="p-3 flex flex-wrap gap-2">
                            <button onclick="editUserData('${uid}', '${u.name}', '${cpf}')" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Editar"><i class="fas fa-pen"></i></button>
                            <button onclick="editUserNote('${uid}', '${(u.adminNote || '').replace(/'/g, "\\'")}')" class="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1.5 rounded text-xs shadow" title="Notas"><i class="fas fa-sticky-note ${noteIconColor}"></i></button>
                            <button onclick="manageUserAccess('${uid}', '${u.acesso_ate}')" class="bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Renovar"><i class="fas fa-calendar-alt"></i></button>
                            <button onclick="deleteUser('${uid}', '${u.name}', '${cpf}')" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Excluir"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        } catch (err) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-red-500">Erro ao carregar: ${err.message}</td></tr>`;
        }
    };
    
    window.manageUserAccess = async function(uid, currentExpiryStr) {
        const diasToAdd = parseInt(prompt("Dias para adicionar ao acesso (ex: 30 para mensal, 365 para anual):", "30"));
        if(!diasToAdd) return;
        const hoje = new Date();
        let baseDate = new Date(currentExpiryStr);
        if (isNaN(baseDate.getTime()) || baseDate < hoje) baseDate = hoje;
        baseDate.setDate(baseDate.getDate() + diasToAdd);
        try {
            await window.__fbDB.collection('users').doc(uid).update({ status: 'premium', acesso_ate: baseDate.toISOString() });
            alert("Acesso atualizado com sucesso!"); openAdminPanel();
        } catch (err) { alert(err.message); }
    };

    window.editUserData = async function(uid, oldName, oldCpf) {
        const newName = prompt("Novo nome:", oldName); if(newName===null)return;
        const newCpfRaw = prompt("Novo CPF:", oldCpf); if(newCpfRaw===null)return;
        const newCpf = newCpfRaw.replace(/\D/g, '');
        try { 
            await window.__fbDB.collection('users').doc(uid).update({name: newName, cpf: newCpf}); 
            alert("Dados salvos!"); openAdminPanel(); 
        } catch(e){alert(e.message);}
    };
    
    window.editUserNote = async function(uid, currentNote) {
        const newNote = prompt("Observações do aluno:", currentNote);
        if (newNote === null) return;
        try { await window.__fbDB.collection('users').doc(uid).update({ adminNote: newNote }); alert("Nota salva."); openAdminPanel(); } catch(e){ alert(e.message); }
    };

    window.deleteUser = async function(uid, name, cpf) {
        if(confirm(`TEM CERTEZA que deseja excluir o aluno ${name}?`)) {
            try { 
                await window.__fbDB.collection('users').doc(uid).delete(); 
                if (cpf && cpf !== 'Sem CPF') await window.__fbDB.collection('cpfs').doc(cpf).delete();
                alert("Usuário excluído."); openAdminPanel(); 
            } catch(e) { alert(e.message); }
        }
    };

    window.sendResetEmail = async function(email) {
        if(confirm(`Enviar e-mail de redefinição de senha para ${email}?`)) {
            try { await window.__fbAuth.sendPasswordResetEmail(email); alert('E-mail enviado!'); } catch(err) { alert(err.message); }
        }
    };

    function checkTrialStatus(expiryDateString) {
        const expiryDate = new Date(expiryDateString);
        const today = new Date();
        const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)); 
        const trialToast = document.getElementById('trial-floating-notify');
        if (trialToast && diffDays <= 30 && diffDays >= 0) {
            trialToast.classList.remove('hidden');
            document.getElementById('trial-days-left').textContent = diffDays;
            document.getElementById('close-trial-notify').addEventListener('click', () => trialToast.classList.add('hidden'));
            document.getElementById('trial-subscribe-btn').addEventListener('click', () => {
                document.getElementById('expired-modal').classList.add('show');
                document.getElementById('name-modal-overlay').classList.add('show');
            });
        }
    }

    function setupAuthEventListeners() {
        const btnLogin = document.getElementById('login-button');
        const btnSignup = document.getElementById('signup-button');
        
        if(btnLogin) btnLogin.addEventListener('click', async () => {
            const email = document.getElementById('email-input').value;
            const pass = document.getElementById('password-input').value;
            const feedback = document.getElementById('auth-feedback');
            if(!email || !pass) { feedback.textContent = "Preencha todos os campos."; return; }
            feedback.textContent = "Entrando...";
            feedback.className = "text-center text-sm mt-4 text-blue-400 font-semibold";
            try {
                localStorage.removeItem('my_session_id'); 
                await FirebaseCourse.signInWithEmail(email, pass);
            } catch (e) { 
                feedback.textContent = "Erro no login. Verifique dados."; 
                feedback.className = "text-center text-sm mt-4 text-red-400 font-semibold";
            }
        });
        
        if(btnSignup) btnSignup.addEventListener('click', async () => {
            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const pass = document.getElementById('password-input').value;
            const cpf = document.getElementById('cpf-input').value;
            const feedback = document.getElementById('auth-feedback');
            if(!name || !email || !pass || !cpf) { feedback.textContent = "Todos os campos são obrigatórios."; return; }
            feedback.textContent = "Criando conta...";
            try {
                await FirebaseCourse.signUpWithEmail(name, email, pass, cpf);
                feedback.textContent = "Sucesso! Redirecionando...";
            } catch (e) { 
                feedback.textContent = e.message; 
                feedback.className = "text-center text-sm mt-4 text-red-400 font-semibold";
            }
        });

        // Alternar telas de login/cadastro
        document.getElementById('show-signup-button')?.addEventListener('click', () => {
            document.getElementById('login-button-group').classList.add('hidden');
            document.getElementById('signup-button-group').classList.remove('hidden');
            document.getElementById('name-field-container').classList.remove('hidden');
            document.getElementById('cpf-field-container').classList.remove('hidden');
            document.getElementById('auth-title').textContent = "Criar Nova Conta";
        });
        document.getElementById('show-login-button')?.addEventListener('click', () => {
            document.getElementById('login-button-group').classList.remove('hidden');
            document.getElementById('signup-button-group').classList.add('hidden');
            document.getElementById('name-field-container').classList.add('hidden');
            document.getElementById('cpf-field-container').classList.add('hidden');
            document.getElementById('auth-title').textContent = "Área do Aluno";
        });
        
        // Modais de Pagamento
        const openPay = () => { document.getElementById('expired-modal').classList.add('show'); document.getElementById('name-modal-overlay').classList.add('show'); };
        document.getElementById('header-subscribe-btn')?.addEventListener('click', openPay);
        document.getElementById('mobile-subscribe-btn')?.addEventListener('click', openPay);
        document.getElementById('open-payment-login-btn')?.addEventListener('click', openPay);
        document.getElementById('close-payment-modal-btn')?.addEventListener('click', () => {
             document.getElementById('expired-modal').classList.remove('show');
             // Se não estiver logado, mantém overlay para login
             if(document.getElementById('name-prompt-modal').classList.contains('show')) return;
             document.getElementById('name-modal-overlay').classList.remove('show');
        });
    }

    // ==========================================================================
    // 6. CARREGAMENTO DE CONTEÚDO E MÓDULOS
    // ==========================================================================
    function handleInitialLoad() {
        const lastModule = localStorage.getItem('gateBombeiroLastModule');
        if (lastModule) loadModuleContent(lastModule); else goToHomePage();
    }

    async function loadQuestionBank(moduleId) {
        if (cachedQuestionBanks[moduleId]) return cachedQuestionBanks[moduleId];
        if (typeof QUIZ_DATA === 'undefined') return null;
        const questions = QUIZ_DATA[moduleId];
        if (!questions || !Array.isArray(questions) || questions.length === 0) return null; 
        cachedQuestionBanks[moduleId] = questions;
        return questions;
    }

    // --- FUNÇÃO PRINCIPAL DE CARREGAMENTO DE MÓDULO ---
    async function loadModuleContent(id) {
        if (!id || !moduleContent[id]) return;
        const d = moduleContent[id];
        const num = parseInt(id.replace('module', ''));
        
        // Lógica de bloqueio Premium
        let moduleCategory = null;
        for (const key in moduleCategories) {
            const cat = moduleCategories[key];
            if (num >= cat.range[0] && num <= cat.range[1]) { moduleCategory = cat; break; }
        }
        const isPremiumContent = moduleCategory && moduleCategory.isPremium;
        const userIsNotPremium = !currentUserData || currentUserData.status !== 'premium';
        if (isPremiumContent && userIsNotPremium) { renderPremiumLockScreen(d.title); return; }

        currentModuleId = id;
        localStorage.setItem('gateBombeiroLastModule', id);
        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
        if (simuladoTimerInterval) clearInterval(simuladoTimerInterval);

        contentArea.style.opacity = '0';
        loadingSpinner.classList.remove('hidden');
        contentArea.classList.add('hidden'); 

        setTimeout(async () => {
            loadingSpinner.classList.add('hidden');
            contentArea.classList.remove('hidden'); 
            contentArea.innerHTML = '';

            // --- CASO 1: SIMULADO PADRÃO ---
            if (d.isSimulado) {
                contentArea.innerHTML = `
                    <div class="relative pt-4 pb-12">
                        <div id="simulado-timer-bar" class="simulado-header-sticky shadow-lg">
                            <span class="simulado-timer flex items-center"><i class="fas fa-clock mr-2 text-lg"></i><span id="timer-display">00:00</span></span>
                            <span class="simulado-progress text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Questão <span id="q-current">1</span></span>
                        </div>
                        <div class="mt-10 mb-6 px-2 text-center"><h3 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white border-b pb-2 inline-block">${d.title}</h3></div>
                        <div>${d.content}</div>
                        <div class="text-center mt-8"><button id="start-simulado-btn" class="action-button pulse-button text-xl px-8 py-4"><i class="fas fa-play mr-2"></i> INICIAR SIMULADO</button></div>
                    </div>
                `;
                document.getElementById('start-simulado-btn').addEventListener('click', () => startSimuladoMode(d));
            } 
            // --- CASO 2: FERRAMENTAS (Módulo 59) ---
            else if (id === 'module59') {
                contentArea.innerHTML = `
                    <h3 class="text-3xl mb-4 pb-4 border-b text-blue-600 dark:text-blue-400 flex items-center"><i class="fas fa-tools mr-3"></i> Ferramentas Operacionais</h3>
                    <div id="tools-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
                `;
                const grid = document.getElementById('tools-grid');
                if (typeof ToolsApp !== 'undefined') {
                    ToolsApp.renderPonto(grid); ToolsApp.renderEscala(grid);
                    ToolsApp.renderPlanner(grid); ToolsApp.renderWater(grid);
                    ToolsApp.renderNotes(grid); ToolsApp.renderHealth(grid);
                }
            }
            // --- CASO 3: MODO SOBREVIVÊNCIA ---
            else if (d.isSurvival) {
                contentArea.innerHTML = d.content;
                document.getElementById('start-survival-btn').addEventListener('click', startSurvivalMode);
                const last = localStorage.getItem('survival_highscore');
                if(last) document.getElementById('survival-last-score').textContent = `Recorde Atual: ${last} pontos`;
            }
            // --- CASO 4: RPG ---
            else if (d.isRPG) {
                contentArea.innerHTML = d.content;
                document.getElementById('start-rpg-btn').addEventListener('click', window.startRPG);
            }
            // --- CASO 5: CARTEIRINHA ---
            else if (d.isIDCard) {
                contentArea.innerHTML = d.content;
                renderDigitalID(document.getElementById('id-card-container'));
            }
            // --- CASO 6: AULA NORMAL (TEXTO + VÍDEO + QUIZ) ---
            else {
                let html = `
                    <h3 class="flex items-center text-3xl mb-6 pb-4 border-b"><i class="${d.iconClass} mr-4 ${getCategoryColor(id)} fa-fw"></i>${d.title}</h3>
                    <div id="audio-btn" class="audio-controls mb-6" onclick="window.speakContent()"><i id="audio-btn-icon" class="fas fa-headphones text-lg mr-2"></i><span id="audio-btn-text">Ouvir Aula</span></div>
                    <div>${d.content}</div>
                `;
                if (d.driveLink) {
                    if (userIsNotPremium) html += `<div class="mt-10 mb-8"><button onclick="document.getElementById('expired-modal').classList.add('show'); document.getElementById('name-modal-overlay').classList.add('show');" class="drive-button opacity-75 hover:opacity-100"><div class="absolute inset-0 bg-black/30 flex items-center justify-center z-10"><i class="fas fa-lock text-2xl mr-2"></i></div><span><i class="fab fa-google-drive mr-3"></i> VER FOTOS (PREMIUM)</span></button></div>`;
                    else html += `<div class="mt-10 mb-8"><a href="${d.driveLink}" target="_blank" class="drive-button"><i class="fab fa-google-drive"></i>VER FOTOS E VÍDEOS</a></div>`;
                }
                let allQuestions = null;
                try { allQuestions = await loadQuestionBank(id); } catch(e){}
                if (allQuestions && allQuestions.length > 0) {
                    const selected = shuffleArray([...allQuestions]).slice(0, 4);
                    html += `<div class="quiz-section-separator"></div><h3 class="text-xl font-semibold mb-4">Exercícios de Fixação</h3>`;
                    selected.forEach((q, i) => {
                        html += `<div class="quiz-block" data-question-id="${q.id}"><p class="font-semibold mt-4 mb-2">${i+1}. ${q.question}</p><div class="quiz-options-group space-y-2 mb-4">`;
                        for (const k in q.options) {
                            html += `<div class="quiz-option" data-module="${id}" data-question-id="${q.id}" data-answer="${k}"><span class="option-key">${k.toUpperCase()})</span> ${q.options[k]}<span class="ripple"></span></div>`;
                        }
                        html += `</div><div id="feedback-${q.id}" class="feedback-area hidden"></div></div>`;
                    });
                }
                html += `<div class="mt-8 pt-6 border-t text-right"><button class="action-button conclude-button" data-module="${id}">Concluir Módulo</button></div>
                         <div class="mt-10 pt-6 border-t-2 border-dashed"><h4 class="text-xl font-bold mb-3"><i class="fas fa-pencil-alt mr-2"></i>Anotações</h4><textarea id="notes-module-${id}" class="notes-textarea">${localStorage.getItem('note-' + id) || ''}</textarea></div>`;
                
                contentArea.innerHTML = html;
                setupQuizListeners();
                setupConcludeButtonListener();
                setupNotesListener(id);
            }

            contentArea.style.opacity = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveModuleInList();
            updateNavigationButtons();
            updateBreadcrumbs(d.title);
            document.getElementById('module-nav').classList.remove('hidden');
            closeSidebar();
        }, 300);
    }

    /* ==================================================================
       7. LÓGICA DE SIMULADO E QUIZ (COM FEEDBACK COMPLETO)
       ================================================================== */
    
    // Gera questões aleatórias baseadas na configuração do módulo
    async function generateSimuladoQuestions(config) {
        const allQuestions = [];
        const questionsByCategory = {};
        for (const catKey in moduleCategories) {
            questionsByCategory[catKey] = [];
            const cat = moduleCategories[catKey];
            for (let i = cat.range[0]; i <= cat.range[1]; i++) {
                const modId = `module${i}`;
                if (typeof QUIZ_DATA !== 'undefined' && QUIZ_DATA[modId]) questionsByCategory[catKey].push(...QUIZ_DATA[modId]);
            }
        }
        for (const [catKey, qty] of Object.entries(config.distribution)) {
            if (questionsByCategory[catKey]) allQuestions.push(...shuffleArray(questionsByCategory[catKey]).slice(0, qty));
        }
        return shuffleArray(allQuestions);
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
                <div id="simulado-timer-bar" class="simulado-header-sticky shadow-lg">
                    <span class="simulado-timer flex items-center"><i class="fas fa-clock mr-2 text-lg"></i><span id="timer-display">00:00</span></span>
                    <span class="simulado-progress text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Questão <span id="q-current">1</span></span>
                </div>
                <div class="mt-10 mb-6 px-2 text-center"><h3 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white border-b pb-2 inline-block">${moduleData.title}</h3></div>
                <div id="question-display-area" class="simulado-question-container"></div>
                <div class="mt-8 flex justify-between items-center">
                    <button id="sim-prev-btn" class="sim-nav-btn sim-btn-prev shadow" style="visibility: hidden;"><i class="fas fa-arrow-left mr-2"></i> Anterior</button>
                    <button id="sim-next-btn" class="sim-nav-btn sim-btn-next shadow">Próxima <i class="fas fa-arrow-right ml-2"></i></button>
                </div>
            </div>
        `;
        contentArea.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showSimuladoQuestion(currentSimuladoQuestionIndex);
        startTimer(moduleData.id);
        document.getElementById('sim-next-btn').addEventListener('click', () => navigateSimulado(1, moduleData.id));
        document.getElementById('sim-prev-btn').addEventListener('click', () => navigateSimulado(-1, moduleData.id));
    }

    function showSimuladoQuestion(index) {
        const q = activeSimuladoQuestions[index];
        const container = document.getElementById('question-display-area');
        const savedAnswer = userAnswers[q.id] || null;
        
        let html = `<div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 animate-slide-in"><p class="font-bold text-lg mb-6 text-gray-800 dark:text-white">${index+1}. ${q.question}</p><div class="space-y-3">`;
        for (const key in q.options) {
            const isChecked = savedAnswer === key ? 'checked' : '';
            html += `<label class="flex items-center p-4 rounded border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><input type="radio" name="q-curr" value="${key}" class="mr-4 w-5 h-5 text-orange-600" ${isChecked} onchange="registerSimuladoAnswer('${q.id}', '${key}')"><span class="text-base text-gray-700 dark:text-gray-300"><strong class="mr-2 text-orange-500">${key.toUpperCase()})</strong> ${q.options[key]}</span></label>`;
        }
        html += `</div></div>`;
        container.innerHTML = html;
        document.getElementById('q-current').innerText = index + 1;
        const prevBtn = document.getElementById('sim-prev-btn');
        const nextBtn = document.getElementById('sim-next-btn');
        prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        if (index === activeSimuladoQuestions.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check-double mr-2"></i> ENTREGAR';
            nextBtn.className = "sim-nav-btn bg-green-600 text-white hover:bg-green-500 shadow-lg transform hover:scale-105 transition-transform";
        } else {
            nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right ml-2"></i>';
            nextBtn.className = "sim-nav-btn sim-btn-next";
        }
    }

    function navigateSimulado(direction, moduleId) {
        const newIndex = currentSimuladoQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < activeSimuladoQuestions.length) {
            currentSimuladoQuestionIndex = newIndex;
            showSimuladoQuestion(newIndex);
            window.scrollTo({ top: 100, behavior: 'smooth' });
        } else if (newIndex >= activeSimuladoQuestions.length) {
            if(confirm("Tem certeza que deseja entregar o simulado?")) {
                finishSimulado(moduleId);
            }
        }
    }

    window.registerSimuladoAnswer = function(qId, answer) { userAnswers[qId] = answer; };

    function startTimer(moduleId) {
        const display = document.getElementById('timer-display');
        simuladoTimerInterval = setInterval(() => {
            simuladoTimeLeft--;
            const m = Math.floor(simuladoTimeLeft / 60);
            const s = simuladoTimeLeft % 60;
            display.textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
            if (simuladoTimeLeft <= 0) {
                clearInterval(simuladoTimerInterval);
                alert("Tempo esgotado! O simulado será encerrado.");
                finishSimulado(moduleId);
            }
        }, 1000);
    }

    // --- RESULTADO DO SIMULADO COM FEEDBACK COMPLETO ---
    function finishSimulado(moduleId) {
        clearInterval(simuladoTimerInterval);
        let correctCount = 0;
        const total = activeSimuladoQuestions.length;
        let feedbackHtml = '<div class="space-y-4">';

        activeSimuladoQuestions.forEach((q, i) => {
            const selected = userAnswers[q.id];
            const isCorrect = selected === q.answer;
            if(isCorrect) correctCount++;
            
            const statusClass = isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20';
            const correctAnswerText = q.options[q.answer];
            const selectedAnswerText = selected ? q.options[selected] : "Não respondeu";
            const explanation = q.explanation || "Sem explicação disponível.";

            feedbackHtml += `
                <div class="p-4 rounded border-l-4 ${statusClass} mb-4">
                    <p class="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3">${i+1}. ${q.question}</p>
                    <div class="grid grid-cols-1 gap-3 text-xs mb-3">
                        <div class="p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            <span class="font-bold">Sua Resposta:</span> ${selected ? selected.toUpperCase() + ') ' + selectedAnswerText : 'Em branco'}
                        </div>
                        ${!isCorrect ? `<div class="p-2 rounded bg-green-50 text-green-800 border border-green-200"><span class="font-bold">Resposta Correta:</span> ${q.answer.toUpperCase()}) ${correctAnswerText}</div>` : ''}
                    </div>
                    <div class="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 text-xs text-gray-600 dark:text-gray-400">
                        <strong><i class="fas fa-info-circle mr-1 text-blue-500"></i> Explicação:</strong><br> ${explanation}
                    </div>
                </div>
            `;
        });
        feedbackHtml += '</div>';
        const score = (correctCount / total) * 10;
        contentArea.innerHTML = `<div class="simulado-result-card mb-8 animate-slide-in"><h2 class="text-2xl font-bold mb-4">Resultado Final</h2><div class="simulado-score-circle">${score.toFixed(1)}</div><p>Acertou <strong>${correctCount}</strong> de <strong>${total}</strong>.</p></div><h4 class="text-xl font-bold mb-4 border-b pb-2">Gabarito & Explicações</h4>${feedbackHtml}<div class="text-center mt-8"><button onclick="location.reload()" class="action-button">Voltar ao Início</button></div>`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!completedModules.includes(moduleId)) { completedModules.push(moduleId); localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules)); updateProgress(); }
    }

    // --- QUIZ IMEDIATO (FEEDBACK AO VIVO) ---
    function handleQuizOptionClick(e) {
        const o = e.currentTarget; if (o.disabled) return;
        const moduleId = o.dataset.module;
        const questionId = o.dataset.questionId;
        const selectedAnswer = o.dataset.answer;
        const qData = cachedQuestionBanks[moduleId]?.find(q => q.id === questionId);
        if (!qData) return; 
        
        const correctAnswer = qData.answer;
        const explanationText = qData.explanation || 'Nenhuma explicação disponível.';
        const correctAnswerText = qData.options[correctAnswer];
        const feedbackArea = document.getElementById(`feedback-${questionId}`);
        
        o.closest('.quiz-options-group').querySelectorAll(`.quiz-option[data-question-id="${questionId}"]`).forEach(opt => {
            opt.disabled = true;
            if (opt.dataset.answer === correctAnswer) opt.classList.add('correct');
        });
        
        let feedbackContent = '';
        if (selectedAnswer === correctAnswer) {
            o.classList.add('correct');
            feedbackContent = `<div class="p-3 bg-green-50 border-l-4 border-green-500 rounded"><strong class="block text-green-700 mb-1"><i class="fas fa-check-circle mr-2"></i> Correto!</strong><div class="text-sm text-gray-600">${explanationText}</div></div>`;
            try { triggerSuccessParticles(e, o); } catch (err) {}
        } else {
            o.classList.add('incorrect');
            feedbackContent = `<div class="p-3 bg-red-50 border-l-4 border-red-500 rounded"><div class="mb-2"><strong class="text-red-700"><i class="fas fa-times-circle mr-2"></i> Incorreto.</strong></div><div class="mb-2 text-sm text-gray-700">A resposta correta é: <span class="font-bold text-green-600 block mt-1 p-1 bg-white rounded border border-gray-200">${correctAnswer.toUpperCase()}) ${correctAnswerText}</span></div><div class="text-sm text-gray-600 border-t border-gray-200 pt-2 mt-2"><strong>Explicação:</strong> ${explanationText}</div></div>`;
        }
        
        if (feedbackArea) {
            feedbackArea.innerHTML = `<div class="explanation mt-3 animate-slide-in">${feedbackContent}</div>`;
            feedbackArea.classList.remove('hidden');
        }
    }

    // ==========================================================================
    // 8. MODO SOBREVIVÊNCIA, RPG E CARTEIRINHA
    // ==========================================================================
    
    // --- SOBREVIVÊNCIA ---
    async function startSurvivalMode() {
        if (!currentUserData || currentUserData.status !== 'premium') {
            const lastPlayed = localStorage.getItem('survival_last_played');
            const today = new Date().toLocaleDateString();
            if (lastPlayed === today) { alert("⚠️ Modo Grátis: Você já jogou hoje!\n\nAssine o Premium para jogar ilimitado."); return; }
            localStorage.setItem('survival_last_played', today);
        }

        loadingSpinner.classList.remove('hidden');
        survivalLives = 3; survivalScore = 0; survivalIndex = 0;
        let allQ = [];
        for (let i = 1; i <= 52; i++) {
            const q = await loadQuestionBank(`module${i}`);
            if(q) allQ.push(...q);
        }
        survivalQuestions = shuffleArray(allQ);
        loadingSpinner.classList.add('hidden');

        if(survivalQuestions.length === 0) { alert("Erro no banco de questões."); return; }
        renderSurvivalScreen();
    }

    function renderSurvivalScreen() {
        if (survivalLives <= 0) { finishSurvival(); return; }
        const q = survivalQuestions[survivalIndex];
        if (!q) { finishSurvival(true); return; }

        contentArea.innerHTML = `
            <div class="max-w-2xl mx-auto pt-4">
                <div class="flex justify-between items-center mb-6 bg-gray-800 text-white p-4 rounded-lg shadow-lg sticky top-24 z-30">
                    <div class="flex items-center gap-2"><i class="fas fa-heart text-red-500 text-2xl animate-pulse"></i><span class="text-2xl font-bold">x ${survivalLives}</span></div>
                    <div class="text-xl font-bold">Pontos: <span class="text-yellow-400">${survivalScore}</span></div>
                </div>
                <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 animate-slide-in">
                    <div class="mb-4"><span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Questão ${survivalScore + 1}</span></div>
                    <p class="text-lg font-bold text-gray-800 dark:text-white mb-6">${q.question}</p>
                    <div class="space-y-3" id="survival-options">
                        ${Object.keys(q.options).map(key => `
                            <button onclick="checkSurvivalAnswer('${key}', '${q.answer}', this)" 
                                class="w-full text-left p-4 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center group">
                                <span class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 font-bold group-hover:bg-blue-500 group-hover:text-white">${key.toUpperCase()}</span>
                                <span class="flex-1 text-gray-700 dark:text-gray-200">${q.options[key]}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.checkSurvivalAnswer = function(selected, correct, btnElement) {
        const optionsDiv = document.getElementById('survival-options');
        optionsDiv.querySelectorAll('button').forEach(b => b.disabled = true);

        if (selected === correct) {
            btnElement.classList.add('bg-green-100', 'border-green-500', 'dark:bg-green-900');
            btnElement.querySelector('span').classList.add('bg-green-500', 'text-white');
            survivalScore++;
            if(typeof confetti === 'function') confetti({particleCount: 30, spread: 60, origin: { y: 0.7 }});
            setTimeout(() => { survivalIndex++; renderSurvivalScreen(); }, 1500);
        } else {
            btnElement.classList.add('bg-red-100', 'border-red-500', 'dark:bg-red-900');
            btnElement.querySelector('span').classList.add('bg-red-500', 'text-white');
            optionsDiv.querySelectorAll('button').forEach(b => {
                if (b.innerText.includes(correct.toUpperCase())) b.classList.add('bg-green-50', 'border-green-500');
            });
            survivalLives--;
            setTimeout(() => { 
                if (survivalLives === 0) finishSurvival(); else { survivalIndex++; renderSurvivalScreen(); }
            }, 2000);
        }
    };

    function finishSurvival(win = false) {
        const currentHigh = localStorage.getItem('survival_highscore') || 0;
        if (survivalScore > currentHigh) localStorage.setItem('survival_highscore', survivalScore);

        contentArea.innerHTML = `
            <div class="text-center py-10 animate-slide-in">
                <div class="text-6xl mb-4">${win ? '🏆' : '☠️'}</div>
                <h2 class="text-4xl font-bold mb-2 ${win ? 'text-yellow-500' : 'text-red-600'}">${win ? 'VOCÊ ZEROU!' : 'GAME OVER'}</h2>
                <p>Você sobreviveu a <strong>${survivalScore}</strong> perguntas.</p>
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl max-w-sm mx-auto mb-8"><p class="text-sm text-gray-500 font-bold">Seu Recorde</p><p class="text-3xl font-bold text-blue-600">${Math.max(survivalScore, currentHigh)}</p></div>
                <button onclick="loadModuleContent('module60')" class="action-button"><i class="fas fa-redo mr-2"></i> Tentar Novamente</button>
            </div>
        `;
    }

    // --- RPG (SIMULADOR DE DECISÕES) ---
    window.startRPG = function() { const rpgData = moduleContent['module61'].rpgData; if (!rpgData) return; renderRPGScene(rpgData.start, rpgData); };
    function renderRPGScene(sceneId, rpgData) {
        if (sceneId === 'exit') { loadModuleContent('module61'); return; }
        const scene = rpgData.scenes[sceneId];
        let html = `<div class="max-w-3xl mx-auto pt-4 animate-fade-in"><div class="bg-gray-900 text-white p-6 rounded-t-xl border-b-4 ${scene.type === 'death' ? 'border-red-600' : (scene.type === 'win' ? 'border-green-600' : 'border-blue-500')}"><p class="text-lg font-serif">"${scene.text}"</p></div><div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-b-xl shadow-lg"><div class="grid gap-4">`;
        scene.options.forEach(opt => { html += `<button onclick="window.rpgNext('${opt.next}')" class="text-left p-4 bg-white dark:bg-gray-700 rounded border-l-4 border-gray-400 hover:border-orange-500 shadow-sm"><span class="font-bold text-gray-800 dark:text-white"><i class="fas fa-chevron-right mr-2 text-orange-500"></i> ${opt.text}</span></button>`; });
        html += `</div></div></div>`;
        contentArea.innerHTML = html; window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.rpgNext = function(nextId) { renderRPGScene(nextId, moduleContent['module61'].rpgData); };

    // --- CARTEIRINHA DIGITAL ---
    function renderDigitalID(container) {
        if (!currentUserData) { container.innerHTML = '<p class="text-red-500">Erro de dados.</p>'; return; }
        const validade = currentUserData.acesso_ate ? new Date(currentUserData.acesso_ate).toLocaleDateString('pt-BR') : 'Indefinido';
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`BC|${currentUserData.name}|${currentUserData.cpf}|VALID:${validade}`)}`;
        const isPremium = currentUserData.status === 'premium';
        const cardColor = isPremium ? 'bg-gradient-to-r from-gray-900 to-black border-yellow-500' : 'bg-gradient-to-r from-red-700 to-red-900 border-white';
        container.innerHTML = `
            <div class="relative w-full max-w-md aspect-[1.58/1] ${cardColor} rounded-xl shadow-2xl overflow-hidden text-white p-6 border-2">
                ${isPremium ? '<div class="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">PREMIUM</div>' : ''}
                <div class="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none"><i class="fas fa-shield-alt text-9xl"></i></div>
                <div class="relative z-10 flex flex-col h-full justify-between">
                    <div class="flex items-center gap-4"><div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50"><i class="fas fa-user text-3xl"></i></div><div><h3 class="font-bold text-lg leading-tight">BOMBEIRO CIVIL</h3><p class="text-xs opacity-80">Identidade Profissional Digital</p></div></div>
                    <div class="space-y-1 mt-2"><div><p class="text-[10px] uppercase opacity-60">Nome</p><p class="font-bold text-lg truncate">${currentUserData.name}</p></div><div class="flex justify-between"><div><p class="text-[10px] uppercase opacity-60">CPF</p><p class="font-mono">${currentUserData.cpf || '---'}</p></div><div class="text-right"><p class="text-[10px] uppercase opacity-60">Validade</p><p class="font-mono text-yellow-400">${validade}</p></div></div></div>
                    <div class="flex justify-between items-end mt-2"><div class="bg-white p-1 rounded"><img src="${qrUrl}" alt="QR Code" class="w-16 h-16"></div><div class="text-right"><p class="text-[8px] opacity-50">Projeto Bravo Charlie</p><p class="text-[8px] opacity-50">Lei 11.901/2009</p></div></div>
                </div>
            </div><div class="mt-6 text-center"><button onclick="window.print()" class="text-sm text-blue-500 hover:underline"><i class="fas fa-print"></i> Imprimir Carteirinha</button></div>`;
    }

    // ==========================================================================
    // 9. HELPERS E LISTENERS FINAIS
    // ==========================================================================
    function renderPremiumLockScreen(title) { contentArea.innerHTML = `<div class="text-center py-12 px-6"><h2 class="text-3xl font-bold mb-4">Conteúdo Exclusivo</h2><p class="mb-8">O módulo <strong>${title}</strong> é exclusivo para assinantes.</p><button id="premium-lock-btn" class="action-button pulse-button text-lg px-8 py-4">DESBLOQUEAR AGORA</button></div>`; document.getElementById('premium-lock-btn').addEventListener('click', () => { document.getElementById('expired-modal').classList.add('show'); document.getElementById('name-modal-overlay').classList.add('show'); }); }
    
    function getCategoryColor(id) { const n=parseInt(id.replace('module','')); for(const k in moduleCategories){ const c=moduleCategories[k]; if(n>=c.range[0]&&n<=c.range[1]) return (k==='salvamento'?'text-blue-500':(k==='pci'?'text-red-500':'text-orange-500')); } return 'text-gray-500'; }
    function updateNavigationButtons() { const p=document.getElementById('prev-module'), n=document.getElementById('next-module'); if(!p||!n)return; if(!currentModuleId){p.disabled=true;n.disabled=true;return;} const num=parseInt(currentModuleId.replace('module','')); p.disabled=(num===1); n.disabled=(num===totalModules); }
    function updateBreadcrumbs(t='Início') { const b=document.getElementById('breadcrumb-container'); if(!currentModuleId) b.innerHTML=`<a href="#" id="home-breadcrumb">Início</a>`; else b.innerHTML=`<a href="#" id="home-breadcrumb">Início</a> / <span>${t}</span>`; document.getElementById('home-breadcrumb').addEventListener('click', goToHomePage); }
    function setupNotesListener(id) { const n=document.getElementById(`notes-module-${id}`); if(n) n.addEventListener('keyup', ()=>localStorage.setItem('note-'+id, n.value)); }
    function goToHomePage() { localStorage.removeItem('gateBombeiroLastModule'); if(window.speechSynthesis.speaking)window.speechSynthesis.cancel(); contentArea.innerHTML=`<div class="text-center py-8"><h2>Bem-vindo</h2><button id="start-course" class="action-button">Iniciar</button></div>`; document.getElementById('module-nav')?.classList.add('hidden'); closeSidebar(); document.getElementById('start-course').addEventListener('click', ()=>loadModuleContent('module1')); }
    function setupProtection() { document.addEventListener('contextmenu', e=>e.preventDefault()); }
    function setupTheme() { const isDark = localStorage.getItem('theme') === 'dark'; document.documentElement.classList.toggle('dark', isDark); updateThemeIcons(); }
    function toggleTheme() { document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); updateThemeIcons(); }
    function updateThemeIcons() { const icon=document.documentElement.classList.contains('dark')?'fa-sun':'fa-moon'; document.querySelectorAll('#dark-mode-toggle-desktop i, #bottom-nav-theme i').forEach(i=>i.className=`fas ${icon} text-2xl`); }
    function shuffleArray(a) { let n=[...a]; for(let i=n.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [n[i],n[j]]=[n[j],n[i]]; } return n; }
    function closeSidebar() { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('show'); setTimeout(()=>sidebarOverlay.classList.add('hidden'), 300); }
    function openSidebar() { sidebar.classList.add('open'); sidebarOverlay.classList.remove('hidden'); setTimeout(()=>sidebarOverlay.classList.add('show'), 10); }
    function populateModuleLists() { document.getElementById('desktop-module-container').innerHTML=getModuleListHTML(); document.getElementById('mobile-module-container').innerHTML=getModuleListHTML(); }
    function getModuleListHTML() { let h=''; for(const k in moduleCategories){ const c=moduleCategories[k]; h+=`<div><button class="accordion-button"><span><i class="${c.icon} mr-2"></i>${c.title}</span></button><div class="accordion-panel">`; for(let i=c.range[0]; i<=c.range[1]; i++){ const m=moduleContent[`module${i}`]; if(m) h+=`<div class="module-list-item ${completedModules.includes(m.id)?'completed':''}" data-module="${m.id}">${m.title}</div>`; } h+=`</div></div>`; } return h; }
    function updateProgress() { const p=(completedModules.length/totalModules)*100; document.getElementById('progress-text').textContent=`${p.toFixed(0)}%`; if(document.getElementById('progress-bar-minimal')) document.getElementById('progress-bar-minimal').style.width=`${p}%`; document.querySelectorAll('.module-list-item').forEach(i=>i.classList.toggle('completed', completedModules.includes(i.dataset.module))); checkAchievements(); }
    function setupQuizListeners() { document.querySelectorAll('.quiz-option').forEach(o=>o.addEventListener('click', handleQuizOptionClick)); }
    function setupHeaderScroll() { window.addEventListener('scroll', ()=>{ const h=document.getElementById('main-header'); if(window.scrollY>50) h.classList.add('scrolled'); else h.classList.remove('scrolled'); }); }
    function setupRippleEffects() { document.addEventListener('click', e=>{ const b=e.target.closest('.action-button,.quiz-option'); if(b){ const r=document.createElement('span'); r.classList.add('ripple'); const rect=b.getBoundingClientRect(); r.style.width=r.style.height=Math.max(rect.width,rect.height)+'px'; r.style.left=e.clientX-rect.left-Math.max(rect.width,rect.height)/2+'px'; r.style.top=e.clientY-rect.top-Math.max(rect.width,rect.height)/2+'px'; b.appendChild(r); setTimeout(()=>r.remove(),600); } }); }

    function addEventListeners() {
        document.getElementById('next-module')?.addEventListener('click', ()=>{ if(!currentModuleId)return; const n=parseInt(currentModuleId.replace('module','')); if(n<totalModules) loadModuleContent(`module${n+1}`); });
        document.getElementById('prev-module')?.addEventListener('click', ()=>{ if(!currentModuleId)return; const n=parseInt(currentModuleId.replace('module','')); if(n>1) loadModuleContent(`module${n-1}`); });
        document.body.addEventListener('click', e=>{ const m=e.target.closest('.module-list-item'); if(m) loadModuleContent(m.dataset.module); if(e.target.closest('.accordion-button')){ const b=e.target.closest('.accordion-button'), p=b.nextElementSibling; b.classList.toggle('active'); p.style.maxHeight=b.classList.contains('active')?p.scrollHeight+"px":null; } });
        document.getElementById('mobile-menu-button')?.addEventListener('click', openSidebar);
        document.getElementById('close-sidebar-button')?.addEventListener('click', closeSidebar);
        sidebarOverlay?.addEventListener('click', closeSidebar);
        document.getElementById('dark-mode-toggle-desktop')?.addEventListener('click', toggleTheme);
        document.getElementById('reset-progress')?.addEventListener('click', () => { document.getElementById('reset-modal')?.classList.add('show'); document.getElementById('reset-modal-overlay')?.classList.add('show'); });
        document.getElementById('cancel-reset-button')?.addEventListener('click', () => { document.getElementById('reset-modal')?.classList.remove('show'); document.getElementById('reset-modal-overlay')?.classList.remove('show'); });
        document.getElementById('confirm-reset-button')?.addEventListener('click', () => { localStorage.removeItem('gateBombeiroCompletedModules_v3'); localStorage.removeItem('gateBombeiroNotifiedAchievements_v3'); Object.keys(localStorage).forEach(key => { if (key.startsWith('note-')) localStorage.removeItem(key); }); alert('Progresso local resetado.'); window.location.reload(); });
        document.getElementById('close-congrats')?.addEventListener('click', () => { document.getElementById('congratulations-modal').classList.remove('show'); document.getElementById('modal-overlay').classList.remove('show'); });
        closeAchButton?.addEventListener('click', hideAchievementModal);
        achievementOverlay?.addEventListener('click', hideAchievementModal);
        document.getElementById('admin-panel-btn')?.addEventListener('click', window.openAdminPanel);
        document.getElementById('mobile-admin-btn')?.addEventListener('click', window.openAdminPanel);
        document.getElementById('close-admin-modal')?.addEventListener('click', () => { adminModal.classList.remove('show'); adminOverlay.classList.remove('show'); });
    }

    function updateActiveModuleInList() { document.querySelectorAll('.module-list-item').forEach(i => i.classList.toggle('active', i.dataset.module === currentModuleId)); }
    function showCongratulations() { document.getElementById('congratulations-modal')?.classList.add('show'); document.getElementById('modal-overlay')?.classList.add('show'); if(typeof confetti === 'function') confetti({particleCount:150, spread:90, origin:{y:0.6},zIndex:200}); }
    function showAchievementToast(title) { const toast = document.createElement('div'); toast.className = 'toast'; toast.innerHTML = `<i class="fas fa-trophy"></i><div><p class="font-bold">Módulo Concluído!</p><p class="text-sm">${title}</p></div>`; if (toastContainer) toastContainer.appendChild(toast); setTimeout(() => toast.remove(), 4500); }
    function checkAchievements() {
        let newNotification = false;
        for(const key in moduleCategories) {
            const cat = moduleCategories[key];
            let allComplete = true;
            for(let i = cat.range[0]; i <= cat.range[1]; i++) {
                if (!moduleContent[`module${i}`] || !completedModules.includes(`module${i}`)) { allComplete = false; break; }
            }
            if (allComplete && !notifiedAchievements.includes(key)) {
                showAchievementModal(cat.achievementTitle, cat.icon);
                notifiedAchievements.push(key); newNotification = true;
            }
            document.querySelectorAll(`#ach-cat-${key}`).forEach(el => el.classList.toggle('unlocked', allComplete));
        }
        if (newNotification) localStorage.setItem('gateBombeiroNotifiedAchievements_v3', JSON.stringify(notifiedAchievements));
    }
    function showAchievementModal(title, iconClass) {
        const iconContainer = document.getElementById('ach-modal-icon-container');
        const titleEl = document.getElementById('ach-modal-title');
        if (!achievementModal || !achievementOverlay || !iconContainer || !titleEl) return;
        iconContainer.innerHTML = `<i class="${iconClass}"></i>`;
        titleEl.textContent = `Conquista: ${title}`;
        achievementModal.classList.add('show'); achievementOverlay.classList.add('show');
        if(typeof confetti === 'function') confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, zIndex: 103 });
    }
    function hideAchievementModal() { achievementModal?.classList.remove('show'); achievementOverlay?.classList.remove('show'); }

    function triggerSuccessParticles(clickEvent, element) { if (typeof confetti === 'function') confetti({ particleCount: 28, spread: 70, origin: { x: clickEvent ? clickEvent.clientX/window.innerWidth : 0.5, y: clickEvent ? clickEvent.clientY/window.innerHeight : 0.5 } }); }

    init();
});
