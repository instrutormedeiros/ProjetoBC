/* === ARQUIVO app_final.js (VERSÃO RESTAURADA - CORREÇÃO FUNCIONAL APENAS) === */

document.addEventListener('DOMContentLoaded', () => {

    // --- VARIÁVEIS GLOBAIS ---
    const contentArea = document.getElementById('content-area');
    let managerUnsubscribe = null; 
    let totalModules = 0; 
    let completedModules = JSON.parse(localStorage.getItem('gateBombeiroCompletedModules_v3')) || [];
    let notifiedAchievements = JSON.parse(localStorage.getItem('gateBombeiroNotifiedAchievements_v3')) || [];
    let currentModuleId = null;
    let cachedQuestionBanks = {}; 
    let currentUserData = null; 

    // --- VARIÁVEIS SIMULADO E JOGOS ---
    let simuladoTimerInterval = null;
    let simuladoTimeLeft = 0;
    let activeSimuladoQuestions = [];
    let userAnswers = {};
    let currentSimuladoQuestionIndex = 0; 
    let survivalLives = 3;
    let survivalScore = 0;
    let survivalQuestions = [];
    let currentSurvivalIndex = 0;

    // --- SELETORES ---
    const toastContainer = document.getElementById('toast-container');
    const sidebar = document.getElementById('off-canvas-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const achievementModal = document.getElementById('achievement-modal');
    const achievementOverlay = document.getElementById('achievement-modal-overlay');
    const closeAchButton = document.getElementById('close-ach-modal');
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Referências Admin
    const adminModal = document.getElementById('admin-modal');
    const adminOverlay = document.getElementById('admin-modal-overlay');
    const closeAdminBtn = document.getElementById('close-admin-modal');

    // --- ACESSIBILIDADE ---
    const fab = document.getElementById('accessibility-fab');
    const menu = document.getElementById('accessibility-menu');
    let fontSizeScale = 1;

    fab?.addEventListener('click', () => menu.classList.toggle('show'));
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

    // --- AUDIOBOOK ---
    window.speakContent = function() {
        if (!currentModuleId || !moduleContent[currentModuleId]) return;
        
        const speedSelect = document.getElementById('audio-speed');
        const rate = speedSelect ? parseFloat(speedSelect.value) : 1.0;
        const btnIcon = document.getElementById('audio-btn-icon');
        const btnText = document.getElementById('audio-btn-text');
        const mainBtn = document.getElementById('audio-main-btn');
        const synth = window.speechSynthesis;

        if (synth.speaking && !synth.paused) {
            synth.pause();
            if(btnIcon) btnIcon.className = 'fas fa-play'; 
            if(btnText) btnText.textContent = 'Continuar';
            return;
        }
        if (synth.paused) {
            synth.resume();
            if(btnIcon) btnIcon.className = 'fas fa-pause'; 
            if(btnText) btnText.textContent = 'Pausar';
            return;
        }
        if(synth.speaking) synth.cancel(); 

        const div = document.createElement('div');
        div.innerHTML = moduleContent[currentModuleId].content;
        const cleanText = div.textContent || div.innerText || "";

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'pt-BR';
        utterance.rate = rate;

        utterance.onstart = () => {
            if(btnIcon) btnIcon.className = 'fas fa-pause';
            if(btnText) btnText.textContent = 'Pausar';
            if(mainBtn) mainBtn.classList.add('playing');
            
            if (!document.getElementById('audio-stop-btn')) {
                const stopBtn = document.createElement('button');
                stopBtn.id = 'audio-stop-btn';
                stopBtn.className = 'audio-icon-btn bg-red-600 hover:bg-red-500 text-white ml-2';
                stopBtn.innerHTML = '<i class="fas fa-stop"></i>';
                stopBtn.onclick = (e) => {
                    e.stopPropagation();
                    synth.cancel();
                    stopBtn.remove();
                    if(btnIcon) btnIcon.className = 'fas fa-headphones';
                    if(btnText) btnText.textContent = 'Ouvir Aula';
                    if(mainBtn) mainBtn.classList.remove('playing');
                };
                const playerContainer = document.querySelector('.modern-audio-player');
                if(playerContainer) playerContainer.appendChild(stopBtn);
            }
        };

        utterance.onend = () => {
            if(btnIcon) btnIcon.className = 'fas fa-headphones';
            if(btnText) btnText.textContent = 'Ouvir Aula';
            if(mainBtn) mainBtn.classList.remove('playing');
            const stopBtn = document.getElementById('audio-stop-btn');
            if(stopBtn) stopBtn.remove();
        };

        synth.speak(utterance);
    };

    // --- INSTALL PWA ---
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
                    iosModal.classList.remove('show');
                    iosOverlay.classList.remove('show');
                });
                iosOverlay.addEventListener('click', () => {
                    iosModal.classList.remove('show');
                    iosOverlay.classList.remove('show');
                });
            } else {
                alert("Para instalar no iPhone:\nToque em Compartilhar.\nToque em 'Adicionar à Tela de Início'.");
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
            alert("Para instalar:\nProcure o ícone de instalação na barra de endereço.");
        }
    }

    if(installBtn) installBtn.addEventListener('click', triggerInstall);
    if(installBtnMobile) installBtnMobile.addEventListener('click', triggerInstall);

    if (typeof moduleContent === 'undefined' || typeof moduleCategories === 'undefined') {
        console.warn("⚠️ Conteúdo do curso ainda não carregado.");
        document.getElementById('main-header')?.classList.add('hidden');
        document.querySelector('footer')?.classList.add('hidden');
    }

    // --- FUNÇÃO INIT ORIGINAL ---
    function init() {
        if (typeof firebase === 'undefined') {
            console.warn("⚠️ Firebase não carregado. Aguardando...");
            setTimeout(init, 500);
            return;
        }
        
        console.log("✅ Iniciando sistema...");
        
        // ESTA CLASSE É FUNDAMENTAL PARA A CAPA APARECER
        document.body.classList.add('landing-active');
        
        // Inicia ScrollReveal (Notebook e Animações)
        if(typeof initScrollReveal === 'function') setTimeout(initScrollReveal, 100);
        
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
            window.fbDB = window.__fbDB || null;
            window.fbAuth = window.__fbAuth || null;

            setTimeout(() => { if (window.fbDB) console.log("✅ Firebase pronto."); }, 2000);

            setupAuthEventListeners(); 
            
            const handleLogout = async () => {
                window.clearLocalUserData(); 
                await FirebaseCourse.signOutUser();
                window.location.reload(); 
            };

            document.getElementById('logout-button')?.addEventListener('click', handleLogout);
            document.getElementById('logout-expired-button')?.addEventListener('click', handleLogout);
            document.getElementById('logout-button-header')?.addEventListener('click', handleLogout);

            // NÃO ESCONDER NADA AQUI MANUALMENTE. DEIXAR O CSS AGIR.
            const loginModal = document.getElementById('name-prompt-modal');
            const loginOverlay = document.getElementById('name-modal-overlay');
            if(loginModal) loginModal.classList.remove('show');
            if(loginOverlay) loginOverlay.classList.remove('show');

            const isLogged = localStorage.getItem('my_session_id');
            if (isLogged) {
                // Se já estiver logado, aí sim chama o sucesso
                FirebaseCourse.checkAuth((user, userData) => {
                    onLoginSuccess(user, userData);
                });
            } 
        }
        
        setupHeaderScroll();
        setupRippleEffects();
    }

    // === FUNÇÃO onLoginSuccess (CORREÇÃO DE BOTÕES APENAS) ===
    function onLoginSuccess(user, userData) {
        console.log("🚀 LOGIN CONFIRMADO.");

        // Esconde a capa e carrossel
        const elementsToHide = ['name-prompt-modal', 'name-modal-overlay', 'expired-modal', 'landing-hero', 'intro-carousel-wrapper'];
        elementsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('show');
                el.classList.add('hidden');
                el.style.display = 'none'; // Força bruta para garantir que some
            }
        });

        // Revela o site
        const mainWrapper = document.getElementById('main-wrapper');
        if (mainWrapper) {
            mainWrapper.classList.remove('hidden');
            mainWrapper.style.display = 'block'; 
            setTimeout(() => mainWrapper.style.opacity = '1', 50);
        }

        document.body.classList.remove('landing-active');
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';

        if (userData && user) currentUserData = { ...userData, uid: user.uid };
        else currentUserData = userData;

        const greetingEl = document.getElementById('welcome-greeting');
        if(greetingEl && userData.name) greetingEl.textContent = `Olá, ${userData.name.split(' ')[0]}!`;
        
        const printWatermark = document.getElementById('print-watermark');
        if (printWatermark) printWatermark.textContent = `Licenciado para ${userData.name} (CPF: ${userData.cpf || '...'}) - Proibida a Cópia`;

        // ===============================================================
        // CORREÇÃO DOS BOTÕES ADMIN/GESTOR (FIX 1)
        // ===============================================================
        
        // A) Botão ASSINAR
        const openPay = () => {
            const m = document.getElementById('expired-modal');
            const o = document.getElementById('name-modal-overlay');
            if(m) { m.classList.remove('hidden'); m.classList.add('show'); m.style.display = 'flex'; }
            if(o) { o.classList.remove('hidden'); o.classList.add('show'); o.style.display = 'block'; o.style.zIndex = '20000'; }
        };
        document.querySelectorAll('#header-subscribe-btn, #mobile-subscribe-btn').forEach(btn => {
            btn.onclick = openPay;
            btn.style.pointerEvents = 'auto';
        });

        // B) Botão GESTOR (Reconstrução do Listener)
        const mgrFab = document.getElementById('manager-fab');
        if (userData.isManager === true || userData.isManager === "true" || userData.isAdmin === true) {
            if (mgrFab) {
                mgrFab.classList.remove("hidden");
                mgrFab.style.display = 'flex'; 
                mgrFab.style.zIndex = '999999';
                
                const fabBtn = mgrFab.querySelector('button');
                if(fabBtn) {
                    const newFab = fabBtn.cloneNode(true); // Remove listeners antigos
                    fabBtn.parentNode.replaceChild(newFab, fabBtn);
                    
                    newFab.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("🔘 Abrindo Gestor...");
                        if(typeof window.openManagerPanel === 'function') window.openManagerPanel();
                        else alert("Painel carregando...");
                    });
                }
            }
        }

        // C) Botão ADMIN (Reconstrução do Listener)
        if (userData.isAdmin === true) {
            const adminBtn = document.getElementById('admin-panel-btn');
            const mobileAdminBtn = document.getElementById('mobile-admin-btn');
            
            const attachAdminEvent = (btn) => {
                if(!btn) return;
                btn.classList.remove('hidden');
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

                newBtn.addEventListener('click', (e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    console.log("🛡️ Abrindo Admin...");
                    if(typeof window.openAdminPanel === 'function') window.openAdminPanel(); 
                });
            };
            attachAdminEvent(adminBtn);
            attachAdminEvent(mobileAdminBtn);
        }

        // D) Botão RESETAR
        const resetBtn = document.getElementById('reset-progress');
        if (resetBtn) {
            resetBtn.onclick = function(e) {
                e.preventDefault();
                const m = document.getElementById('reset-modal');
                const o = document.getElementById('reset-modal-overlay');
                if(m) { m.classList.remove('hidden'); m.classList.add('show'); m.style.display = 'block'; m.style.zIndex = '30000'; }
                if(o) { o.classList.remove('hidden'); o.classList.add('show'); o.style.display = 'block'; o.style.zIndex = '29999'; }
            };
        }

        checkTrialStatus(userData.acesso_ate);

        if (userData.completedModules && Array.isArray(userData.completedModules)) {
            completedModules = userData.completedModules;
            localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules));
        } else if (completedModules.length > 0 && localStorage.getItem('my_session_id') === userData.current_session_id) {
            saveProgressToCloud();
        } else {
            completedModules = [];
        }

        // CONTAGEM DE MÓDULOS (FILTRO SP/BC)
        let count = 0;
        const userCourse = userData.courseType || 'BC';
        const isAdm = userData.isAdmin || userData.courseType === 'GESTOR';

        Object.keys(window.moduleContent || {}).forEach(modId => {
            const isSp = modId.startsWith('sp_');
            if (isAdm) {
                count++;
            } else {
                if (userCourse === 'BC' && !isSp) count++;
                else if (userCourse === 'SP' && isSp) count++;
            }
        });
        
        totalModules = count;

        const totalEl = document.getElementById('total-modules');
        const courseCountEl = document.getElementById('course-modules-count');
        if(totalEl) totalEl.textContent = totalModules;
        if(courseCountEl) courseCountEl.textContent = totalModules;
        
        populateModuleLists();
        updateProgress();
        addEventListeners(); 
        handleInitialLoad();
        startOnboardingTour(false);

        if (localStorage.getItem("open_manager_after_login") === "true") {
            localStorage.removeItem("open_manager_after_login");
            setTimeout(() => {
                if (window.fbDB && typeof window.openManagerPanel === "function") window.openManagerPanel();
            }, 1500);
        }

        document.body.setAttribute('data-app-ready', 'true');
    }
// --- FUNÇÕES ADMIN (MANUTENÇÃO DE USUÁRIOS) ---
    window.openAdminPanel = async function() {
        if (!currentUserData || !currentUserData.isAdmin) return;

        const adminModal = document.getElementById('admin-modal');
        const adminOverlay = document.getElementById('admin-modal-overlay');
        
        adminModal.classList.add('show');
        adminOverlay.classList.add('show');

        const tbody = document.getElementById('admin-table-body');
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center">Carregando usuários...</td></tr>';

        const db = window.__fbDB || window.fbDB;
        if (!db) {
            tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-red-500">Banco de dados não carregado.</td></tr>';
            return;
        }

        try {
            const snapshot = await db.collection('users').get();
            tbody.innerHTML = '';

            let users = [];
            snapshot.forEach(doc => {
                const u = doc.data();
                const uid = doc.id;
                users.push({ uid, data: u });
            });

            // Ordena alfabeticamente
            users.sort((a, b) => {
                const na = (a.data.name || '').toLocaleLowerCase('pt-BR');
                const nb = (b.data.name || '').toLocaleLowerCase('pt-BR');
                return na.localeCompare(nb, 'pt-BR');
            });

            let stats = { total: 0, premium: 0, trial: 0 };

            users.forEach(({ uid, data: u }) => {
                stats.total++;
                if (u.status === 'premium') stats.premium++;
                else stats.trial++;

                // Lógica de Status
                let statusDisplay = u.status || 'trial';
                let statusColor = 'bg-gray-100 text-gray-800';
                const validade = u.acesso_ate ? new Date(u.acesso_ate) : null;
                const isExpired = validade && new Date() > validade;
                const validadeStr = validade ? validade.toLocaleDateString('pt-BR') : '-';

                if (u.status === 'premium') {
                    if (isExpired) {
                        statusDisplay = 'EXPIRADO';
                        statusColor = 'bg-red-100 text-red-800';
                    } else {
                        statusColor = 'bg-green-100 text-green-800';
                    }
                } else {
                    statusColor = 'bg-yellow-100 text-yellow-800';
                }

                const cpf = u.cpf || 'Sem CPF';
                const planoTipo = u.planType || (u.status === 'premium' ? 'Indefinido' : 'Trial');
                const deviceInfo = u.last_device || 'Desconhecido';
                const noteIconColor = u.adminNote ? 'text-yellow-500' : 'text-gray-400';

                // CURSO (BC vs SP)
                const cursoCodigo = u.courseType || 'BC'; 
                const cursoLabel = cursoCodigo === 'SP' ? 'SEG. PATRIMONIAL' : 'BOMBEIRO CIVIL';
                const cursoBadgeColor = cursoCodigo === 'SP' 
                    ? 'bg-blue-100 text-blue-800 border-blue-200' 
                    : 'bg-red-100 text-red-800 border-red-200';

                const row = `
                    <tr class="border-b hover:bg-gray-50 transition-colors">
                        <td class="p-3 font-bold text-gray-800">
                            ${u.name}
                            <div class="mt-1">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${cursoBadgeColor}">${cursoLabel}</span>
                            </div>
                        </td>
                        <td class="p-3 text-gray-600 text-sm">${u.email}<br><span class="text-xs text-gray-500">CPF: ${cpf}</span></td>
                        <td class="p-3 text-xs text-gray-500 max-w-[150px] truncate" title="${deviceInfo}">${deviceInfo}</td>
                        <td class="p-3">
                            <div class="flex flex-col items-start">
                                <span class="px-2 py-1 rounded text-xs font-bold uppercase ${statusColor}">${statusDisplay}</span>
                                <span class="text-xs text-gray-500 mt-1">${planoTipo}</span>
                            </div>
                        </td>
                        <td class="p-3 text-sm font-medium">${validadeStr}</td>
                        <td class="p-3 flex flex-wrap gap-2">
                            <button onclick="editUserData('${uid}', '${u.name}', '${cpf}')" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Editar Dados"><i class="fas fa-pen"></i></button>
                            <button onclick="changeUserCourse('${uid}', '${cursoCodigo}')" class="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1.5 rounded text-xs shadow" title="Alterar Curso"><i class="fas fa-graduation-cap"></i></button>
                            <button onclick="editUserNote('${uid}', '${(u.adminNote || '').replace(/'/g, "\\'")}')" class="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1.5 rounded text-xs shadow" title="Nota Admin"><i class="fas fa-sticky-note ${noteIconColor}"></i></button>
                            <button onclick="manageUserAccess('${uid}')" class="bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Gerenciar Plano"><i class="fas fa-calendar-alt"></i></button>
                            <button onclick="sendResetEmail('${u.email}')" class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Resetar Senha"><i class="fas fa-key"></i></button>
                            <button onclick="deleteUser('${uid}', '${u.name}', '${cpf}')" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded text-xs shadow" title="Excluir"><i class="fas fa-trash"></i></button>
                            <button onclick="toggleManagerRole('${uid}', ${u.isManager})" class="${u.isManager ? 'bg-purple-600' : 'bg-gray-400'} hover:bg-purple-500 text-white px-2 py-1.5 rounded text-xs shadow" title="Alternar Gestor"><i class="fas fa-briefcase"></i></button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
            updateAdminStats(stats);
        } catch (err) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-red-500">Erro ao carregar: ${err.message}</td></tr>`;
        }
    };
    
    function updateAdminStats(stats) {
        const totalEl = document.getElementById('admin-total-users');
        const premEl  = document.getElementById('admin-total-premium');
        const trialEl = document.getElementById('admin-total-trial');
        if (totalEl) totalEl.textContent = stats.total || 0;
        if (premEl)  premEl.textContent  = stats.premium || 0;
        if (trialEl) trialEl.textContent = stats.trial || 0;
    }

    window.manageUserAccess = async function(uid) {
        const op = prompt("Selecione o Plano:\n1 - MENSAL (30 dias)\n2 - SEMESTRAL (180 dias)\n3 - ANUAL (365 dias)\n4 - VITALÍCIO (10 anos)\n5 - REMOVER PREMIUM\n6 - PERSONALIZADO (Dias)");
        if (!op) return;

        let diasParaAdicionar = 0;
        let nomePlano = '';
        let novoStatus = 'premium';

        if (op === '1') { diasParaAdicionar = 30; nomePlano = 'Mensal'; }
        else if (op === '2') { diasParaAdicionar = 180; nomePlano = 'Semestral'; }
        else if (op === '3') { diasParaAdicionar = 365; nomePlano = 'Anual'; }
        else if (op === '4') { diasParaAdicionar = 3650; nomePlano = 'Vitalício'; }
        else if (op === '5') {
            try {
                const ontem = new Date();
                ontem.setDate(ontem.getDate() - 1);
                await window.__fbDB.collection('users').doc(uid).update({
                    status: 'trial',
                    acesso_ate: ontem.toISOString(),
                    planType: 'Cancelado'
                });
                alert("Acesso Premium removido.");
                openAdminPanel();
                return;
            } catch (e) { alert(e.message); return; }
        }
        else if (op === '6') {
            const i = prompt("Digite a quantidade de dias:");
            if (!i) return;
            diasParaAdicionar = parseInt(i);
            nomePlano = 'Personalizado';
        } else { return; }

        const agora = new Date();
        const novaData = new Date(agora);
        novaData.setDate(novaData.getDate() + diasParaAdicionar);

        try {
            await window.__fbDB.collection('users').doc(uid).update({
                status: novoStatus,
                acesso_ate: novaData.toISOString(),
                planType: nomePlano
            });
            alert(`Sucesso! Plano ${nomePlano} ativado até ${novaData.toLocaleDateString()}`);
            openAdminPanel();
        } catch (e) {
            alert("Erro ao atualizar: " + e.message);
        }
    };
    
    window.deleteUser = async function(uid, name, cpf) {
        if (!confirm(`TEM CERTEZA que deseja excluir ${name}?`)) return;
        if (!confirm("ATENÇÃO: Esta ação apaga o progresso e o cadastro do banco.")) return;

        try {
            await window.__fbDB.collection('users').doc(uid).delete();
            if (cpf && cpf !== 'undefined' && cpf !== 'Sem CPF') {
                await window.__fbDB.collection('cpfs').doc(cpf).delete();
            }
            alert("Usuário excluído.");
            openAdminPanel();
        } catch (e) { alert("Erro ao excluir: " + e.message); }
    };
    
    function checkTrialStatus(expiryDateString) {
        const expiryDate = new Date(expiryDateString);
        const today = new Date();
        const diffTime = expiryDate - today; 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const trialToast = document.getElementById('trial-floating-notify');

        if (trialToast && diffDays <= 30 && diffDays >= 0) {
            trialToast.classList.remove('hidden');
            if(document.getElementById('trial-days-left')) document.getElementById('trial-days-left').textContent = diffDays;
            document.getElementById('trial-subscribe-btn')?.addEventListener('click', () => {
                document.getElementById('expired-modal').classList.add('show');
                document.getElementById('name-modal-overlay').classList.add('show');
            });
            document.getElementById('close-trial-notify')?.addEventListener('click', () => { trialToast.classList.add('hidden'); });
        }
    }

    // --- SETUP DE AUTHENTICATION ---
    function setupAuthEventListeners() {
        const nameField = document.getElementById('name-field-container');
        const cpfField = document.getElementById('cpf-field-container'); 
        const phoneField = document.getElementById('phone-field-container'); 
        const phoneInput = document.getElementById('phone-input'); 
        const companyField = document.getElementById('company-field-container'); 
        const companyInput = document.getElementById('company-input'); 
        const courseField = document.getElementById('course-field-container'); 
        const courseSelect = document.getElementById('course-input');

        const nameInput = document.getElementById('name-input');
        const cpfInput = document.getElementById('cpf-input'); 
        const emailInput = document.getElementById('email-input');
        const passwordInput = document.getElementById('password-input');
        const feedback = document.getElementById('auth-feedback');
        const loginGroup = document.getElementById('login-button-group');
        const signupGroup = document.getElementById('signup-button-group');
        const authTitle = document.getElementById('auth-title');
        const authMsg = document.getElementById('auth-message');
        const btnShowLogin = document.getElementById('show-login-button');
        const btnShowSignup = document.getElementById('show-signup-button');
        const btnLogin = document.getElementById('login-button');
        const btnSignup = document.getElementById('signup-button');
        const expiredModal = document.getElementById('expired-modal');
        const loginModalOverlay = document.getElementById('name-modal-overlay');
        const loginModal = document.getElementById('name-prompt-modal');

        if (loginGroup && !loginGroup.classList.contains('hidden')) {
            if (courseField) courseField.classList.add('hidden');
            if (nameField) nameField.classList.add('hidden');
            if (cpfField) cpfField.classList.add('hidden');
            if (phoneField) phoneField.classList.add('hidden');
            if (companyField) companyField.classList.add('hidden');
        }

        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                if (!loginGroup.classList.contains('hidden')) btnLogin.click();
                else btnSignup.click();
            }
        });

        btnShowSignup?.addEventListener('click', () => {
            loginGroup.classList.add('hidden');
            signupGroup.classList.remove('hidden');
            nameField.classList.remove('hidden');
            cpfField.classList.remove('hidden'); 
            phoneField.classList.remove('hidden'); 
            companyField.classList.remove('hidden');
            if(courseField) courseField.classList.remove('hidden');
            authTitle.textContent = "Criar Nova Conta";
            authMsg.textContent = "Cadastre-se para o Período de Experiência.";
            feedback.textContent = "";
        });

        btnShowLogin?.addEventListener('click', () => {
            loginGroup.classList.remove('hidden');
            signupGroup.classList.add('hidden');
            nameField.classList.add('hidden');
            cpfField.classList.add('hidden'); 
            phoneField.classList.add('hidden'); 
            companyField.classList.add('hidden');
            if(courseField) courseField.classList.add('hidden');
            authTitle.textContent = "Acesso ao Sistema";
            authMsg.textContent = "Acesso Restrito";
            feedback.textContent = "";
        });

        btnLogin?.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;
            if (!email || !password) {
                feedback.textContent = "Preencha e-mail e senha.";
                feedback.className = "text-center text-sm mt-4 font-semibold text-red-500";
                return;
            }
            feedback.textContent = "Entrando...";
            feedback.className = "text-center text-sm mt-4 text-blue-400 font-semibold";
            try {
                localStorage.removeItem('my_session_id'); 
                await FirebaseCourse.signInWithEmail(email, password);
                feedback.textContent = "Verificando...";
                FirebaseCourse.checkAuth((user, userData) => {
                    onLoginSuccess(user, userData);
                });
            } catch (error) {
                feedback.className = "text-center text-sm mt-4 text-red-400 font-semibold";
                feedback.textContent = "Erro ao entrar. Verifique seus dados.";
            }
        });

        btnSignup?.addEventListener('click', async () => {
            const phone = phoneInput.value; 
            const company = companyInput.value; 
            const courseType = courseSelect ? courseSelect.value : 'BC'; 
            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const cpf = cpfInput.value;

            if (!name || !email || !password || !cpf || !phone) {
                feedback.textContent = "Todos os campos obrigatórios devem ser preenchidos.";
                feedback.className = "text-center text-sm mt-4 font-semibold text-red-500";
                return;
            }
            feedback.textContent = "Criando conta...";
            feedback.className = "text-center text-sm mt-4 text-blue-400 font-semibold";
            try {
                await FirebaseCourse.signUpWithEmail(name, email, password, cpf, company, phone, courseType);
                feedback.textContent = "Sucesso! Iniciando...";
                FirebaseCourse.checkAuth((user, userData) => {
                    onLoginSuccess(user, userData);
                });
            } catch (error) {
                feedback.className = "text-center text-sm mt-4 text-red-400 font-semibold";
                feedback.textContent = error.message || "Erro ao criar conta.";
            }
        });
    }

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

    async function generateSimuladoQuestions(config) {
        const finalExamQuestions = [];
        const globalSeenSignatures = new Set(); 
        const map = {
            'rh': [1, 2, 3, 4, 5],
            'legislacao': [6, 7, 8, 9, 10],
            'salvamento': [11, 12, 13, 14, 15],
            'pci': [16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            'aph_novo': [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
        };
        for (const [catKey, qtyNeeded] of Object.entries(config.distribution)) {
            let pool = [];
            const targetModules = map[catKey] || [];
            targetModules.forEach(num => {
                const modId = `module${num}`;
                if (window.QUIZ_DATA && window.QUIZ_DATA[modId]) {
                    pool.push(...window.QUIZ_DATA[modId]);
                }
            });
            pool = shuffleArray(pool); 
            pool = shuffleArray(pool); 
            let addedCount = 0;
            for (const q of pool) {
                if (addedCount >= qtyNeeded) break;
                const signature = (q.question + (q.options['a'] || '')).replace(/\s+/g, '').toLowerCase();
                if (!globalSeenSignatures.has(signature)) {
                    finalExamQuestions.push(q);
                    globalSeenSignatures.add(signature);
                    addedCount++;
                }
            }
        }
        return shuffleArray(finalExamQuestions);
    }
      
    // === FIX 2: CARREGAMENTO DE MÓDULOS COM SUPORTE A PREFIXO "SP_" ===
    async function loadModuleContent(id) {
        if (!id || !moduleContent[id]) return;
        const d = moduleContent[id];
        
        // CORREÇÃO CRÍTICA DO BUG #2
        const isSpModule = id.startsWith('sp_module');
        let num = 0;
        
        if (isSpModule) {
             num = parseInt(id.replace('sp_module', ''));
        } else {
             num = parseInt(id.replace('module', ''));
        }

        let moduleCategory = null;
        for (const key in moduleCategories) {
            const cat = moduleCategories[key];
            const catIsSp = cat.isSP === true; 
            // Verifica se o tipo bate (SP com SP, BC com BC) e o número está no range
            if (catIsSp === isSpModule && num >= cat.range[0] && num <= cat.range[1]) { 
                moduleCategory = cat; 
                break; 
            }
        }

        const isPremiumContent = moduleCategory && moduleCategory.isPremium;
        const userIsNotPremium = !currentUserData || currentUserData.status !== 'premium';

        if (isPremiumContent && userIsNotPremium) { renderPremiumLockScreen(moduleContent[id].title); return; }

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

            // RENDERIZAÇÃO
            if (d.isSimulado) {
                contentArea.innerHTML = `
                    <h3 class="text-3xl mb-4 pb-4 border-b text-orange-600 dark:text-orange-500 flex items-center"><i class="${d.iconClass} mr-3"></i> ${d.title}</h3>
                    <div>${d.content}</div>
                    <div class="text-center mt-8"><button id="start-simulado-btn" class="action-button pulse-button text-xl px-8 py-4"><i class="fas fa-play mr-2"></i> INICIAR SIMULADO</button></div>
                `;
                document.getElementById('start-simulado-btn').addEventListener('click', () => startSimuladoMode(d));
            } 
            else if (id === 'module59') { 
                contentArea.innerHTML = `<h3 class="text-3xl mb-4 pb-4 border-b text-blue-600 dark:text-blue-400 flex items-center"><i class="fas fa-tools mr-3"></i> Ferramentas Operacionais</h3><div id="tools-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>`;
                const grid = document.getElementById('tools-grid');
                if (typeof ToolsApp !== 'undefined') {
                    ToolsApp.renderPonto(grid); ToolsApp.renderEscala(grid); ToolsApp.renderPlanner(grid); ToolsApp.renderWater(grid); ToolsApp.renderNotes(grid); ToolsApp.renderHealth(grid);
                } else { grid.innerHTML = '<p class="text-red-500">Erro: Script de Ferramentas não carregado.</p>'; }
            }
            else if (d.isSurvival) {
                contentArea.innerHTML = d.content;
                const survivalScoreEl = document.getElementById('survival-last-score');
                const lastScore = localStorage.getItem('lastSurvivalScore');
                if(survivalScoreEl && lastScore) survivalScoreEl.innerText = `Seu recorde anterior: ${lastScore} pontos`;
                document.getElementById('start-survival-btn').addEventListener('click', initSurvivalGame);
            }
            else if (d.isRPG) {
                contentArea.innerHTML = `<h3 class="text-2xl font-bold mb-6 flex items-center text-orange-500"><i class="fas fa-headset mr-3"></i> Central de Operações</h3><p class="mb-4 text-gray-400">Equipe de prontidão. Temos 3 chamados pendentes. Qual ocorrência você assume?</p><div class="space-y-4"><button id="rpg-opt-1" class="rpg-card-btn group"><h4 class="font-bold text-lg group-hover:text-orange-500 transition-colors"><i class="fas fa-fire mr-2"></i> Incêndio em Galpão Industrial</h4><p class="text-sm text-gray-400 mt-1">Risco de Backdraft. Vítimas possíveis.</p></button><button id="rpg-opt-2" class="rpg-card-btn group"><h4 class="font-bold text-lg group-hover:text-blue-500 transition-colors"><i class="fas fa-car-crash mr-2"></i> Acidente Veicular</h4><p class="text-sm text-gray-400 mt-1">Vítima presa às ferragens. Trauma grave.</p></button><button id="rpg-opt-3" class="rpg-card-btn group"><h4 class="font-bold text-lg group-hover:text-yellow-500 transition-colors"><i class="fas fa-dungeon mr-2"></i> Espaço Confinado (Silo)</h4><p class="text-sm text-gray-400 mt-1">Trabalhador inconsciente. Atmosfera desconhecida.</p></button></div>`;
                document.getElementById('rpg-opt-1').addEventListener('click', () => initRPGGame(d.rpgData)); 
                document.getElementById('rpg-opt-2').addEventListener('click', () => alert("Cenário de Acidente Veicular em desenvolvimento!"));
                document.getElementById('rpg-opt-3').addEventListener('click', () => alert("Cenário de Espaço Confinado em desenvolvimento!"));
            }
            else if (d.isIDCard) {
                contentArea.innerHTML = d.content;
                renderDigitalID();
            }
            else {
                let audioHtml = `<div class="modern-audio-player"><button id="audio-main-btn" class="audio-main-btn" onclick="window.speakContent()"><i id="audio-btn-icon" class="fas fa-headphones"></i> <span id="audio-btn-text">Ouvir Aula</span></button><div class="h-6 w-px bg-gray-600 mx-2"></div><select id="audio-speed" class="audio-speed-select"><option value="0.8">0.8x</option><option value="1.0" selected>1.0x</option><option value="1.2">1.2x</option><option value="1.5">1.5x</option><option value="2.0">2.0x</option></select></div>`;
                let html = `<h3 class="flex items-center text-3xl mb-6 pb-4 border-b"><i class="${d.iconClass} mr-4 ${getCategoryColor(id)} fa-fw"></i>${d.title}</h3>${audioHtml}<div>${d.content}</div>`;

                if (d.driveLink && d.driveLink !== "" && d.driveLink !== "EM_BREVE") {
                    if (userIsNotPremium) {
                        html += `<div class="mt-10 mb-8"><button onclick="document.getElementById('expired-modal').classList.add('show'); document.getElementById('name-modal-overlay').classList.add('show');" class="drive-button opacity-75 hover:opacity-100 relative overflow-hidden"><div class="absolute inset-0 bg-black/30 flex items-center justify-center z-10"><i class="fas fa-lock text-2xl mr-2"></i></div><span class="blur-[2px] flex items-center"><i class="fab fa-google-drive mr-3"></i> VER FOTOS E VÍDEOS (PREMIUM)</span></button></div>`;
                    } else {
                        html += `<div class="mt-10 mb-8"><a href="${d.driveLink}" target="_blank" class="drive-button"><i class="fab fa-google-drive"></i> VER FOTOS E VÍDEOS</a></div>`;
                    }
                } else {
                    html += `<div class="mt-10 mb-8"><button onclick="alert('🚧 Em breve!')" class="drive-button opacity-70 cursor-wait"><i class="fab fa-google-drive"></i> VER FOTOS E VÍDEOS (EM BREVE)</button></div>`;
                }

                const savedNote = localStorage.getItem('note-' + id) || '';
                let allQuestions = null;
                try { allQuestions = await loadQuestionBank(id); } catch(error) { console.error(error); }

                if (allQuestions && allQuestions.length > 0) {
                    const count = Math.min(allQuestions.length, 4); 
                    const shuffledQuestions = shuffleArray([...allQuestions]); 
                    const selectedQuestions = shuffledQuestions.slice(0, count);
                    let quizHtml = `<div class="mt-12 text-center"><span class="bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm py-1 px-3 rounded-full border border-gray-300 dark:border-gray-700"><i class="fas fa-pencil-alt mr-2"></i> Pratique aqui</span></div><div class="quiz-section-separator mt-4"></div><h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Exercícios</h3>`;
                    
                    selectedQuestions.forEach((q, index) => {
                        quizHtml += `<div class="quiz-block" data-question-id="${q.id}"><p class="font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-200">${index + 1}. ${q.question}</p><div class="quiz-options-group space-y-2 mb-4">`;
                        for (const key in q.options) {
                            quizHtml += `<div class="quiz-option" data-module="${id}" data-question-id="${q.id}" data-answer="${key}"><span class="option-key">${key.toUpperCase()})</span> ${q.options[key]}<span class="ripple"></span></div>`;
                        }
                        quizHtml += `</div><div id="feedback-${q.id}" class="feedback-area hidden"></div></div>`;
                    });
                    html += quizHtml;
                } else {
                    if (!d.id.startsWith('module9')) html += `<div class="warning-box mt-8"><p><strong>Exercícios não encontrados.</strong></p></div>`;
                }

                html += `<div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-right"><button class="action-button conclude-button" data-module="${id}">Concluir Módulo</button></div><div class="mt-10 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-700"><h4 class="text-xl font-bold mb-3 text-secondary dark:text-gray-200"><i class="fas fa-pencil-alt mr-2"></i>Anotações</h4><textarea id="notes-module-${id}" class="notes-textarea" placeholder="Suas notas...">${savedNote}</textarea></div>`;

                contentArea.innerHTML = html;
                setupQuizListeners();
                setupConcludeButtonListener();
                setupNotesListener(id);
            }

            contentArea.style.opacity = '1';
            contentArea.style.transition = 'opacity 0.3s ease';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveModuleInList();
            updateNavigationButtons();
            updateBreadcrumbs(d.title);
            document.getElementById('module-nav').classList.remove('hidden');
            closeSidebar();
            document.getElementById('next-module')?.classList.remove('blinking-button');
        }, 300);
    }
// === LÓGICA: MODO SOBREVIVÊNCIA ===
    async function initSurvivalGame() {
        survivalLives = 3;
        survivalScore = 0;
        currentSurvivalIndex = 0;
        survivalQuestions = [];

        const allQs = [];
        for(let i=1; i<=60; i++) { // Varre todos os módulos possíveis
            const modId = `module${i}`;
            if(window.QUIZ_DATA && window.QUIZ_DATA[modId]) allQs.push(...window.QUIZ_DATA[modId]);
        }
        survivalQuestions = shuffleArray(allQs);
        renderSurvivalScreen();
    }

    function renderSurvivalScreen() {
        if(survivalLives <= 0) {
            localStorage.setItem('lastSurvivalScore', survivalScore);
            contentArea.innerHTML = `
                <div class="text-center animate-slide-in p-8">
                    <h2 class="text-4xl font-bold text-red-600 mb-4">GAME OVER</h2>
                    <div class="text-6xl mb-6">💀</div>
                    <p class="text-2xl text-gray-800 dark:text-white mb-2">Sua Pontuação Final</p>
                    <div class="text-5xl font-extrabold text-orange-500 mb-8">${survivalScore}</div>
                    <button id="retry-survival" class="action-button pulse-button">Tentar Novamente</button>
                </div>
            `;
            document.getElementById('retry-survival').addEventListener('click', initSurvivalGame);
            return;
        }

        const q = survivalQuestions[currentSurvivalIndex];
        if(!q) {
            contentArea.innerHTML = `<h2 class="text-center text-2xl">Você zerou o banco de questões! Incrível!</h2>`;
            return;
        }

        let hearts = '';
        for(let i=0; i<survivalLives; i++) hearts += '<i class="fas fa-heart text-red-600 text-2xl mx-1 survival-life-heart"></i>';

        contentArea.innerHTML = `
            <div class="flex justify-between items-center mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                <div class="flex items-center">${hearts}</div>
                <div class="text-xl font-bold text-blue-600 dark:text-blue-400">Pontos: ${survivalScore}</div>
            </div>
            <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in">
                <p class="font-bold text-lg mb-6 text-gray-800 dark:text-white">Questão ${currentSurvivalIndex + 1}: ${q.question}</p>
                <div class="space-y-3">
                    ${Object.keys(q.options).map(key => `
                        <button class="w-full text-left p-4 rounded border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors survival-option" data-key="${key}">
                            <span class="font-bold text-orange-500 mr-2">${key.toUpperCase()})</span> ${q.options[key]}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.querySelectorAll('.survival-option').forEach(btn => {
            btn.addEventListener('click', (e) => handleSurvivalAnswer(e, q));
        });
    }

    function handleSurvivalAnswer(e, q) {
        const selected = e.currentTarget.dataset.key;
        const isCorrect = selected === q.answer;
        const btns = document.querySelectorAll('.survival-option');
        
        btns.forEach(b => {
            b.disabled = true;
            if(b.dataset.key === q.answer) b.classList.add('bg-green-200', 'dark:bg-green-900', 'border-green-500');
            else if(b.dataset.key === selected && !isCorrect) b.classList.add('bg-red-200', 'dark:bg-red-900', 'border-red-500');
        });

        if(isCorrect) {
            survivalScore += 10;
            if(typeof confetti === 'function') confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
        } else {
            survivalLives--;
            if(navigator.vibrate) navigator.vibrate(200);
        }

        setTimeout(() => {
            currentSurvivalIndex++;
            renderSurvivalScreen();
        }, 1500);
    }

    // === LÓGICA: RPG (SIMULADOR) ===
    async function initRPGGame(rpgData) {
        renderRPGScene(rpgData.start, rpgData);
    }

    function renderRPGScene(sceneId, rpgData) {
        const scene = rpgData.scenes[sceneId];
        if(!scene) return; 

        let html = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    ${scene.image ? `<img src="${scene.image}" class="w-full h-48 object-cover">` : ''}
                    <div class="p-6">
                        <p class="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">${scene.text}</p>
                        <div class="space-y-3">
        `;

        scene.options.forEach(opt => {
            html += `
                <button class="rpg-choice-btn w-full text-left p-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all rounded shadow-sm mb-2" data-next="${opt.next}">
                    <i class="fas fa-chevron-right text-blue-500 mr-2"></i> ${opt.text}
                </button>
            `;
        });

        html += `</div></div></div></div>`;
        contentArea.innerHTML = html;

        if(scene.type === 'death') {
            contentArea.querySelector('.bg-white').classList.add('border-red-500', 'border-2');
        } else if(scene.type === 'win') {
            contentArea.querySelector('.bg-white').classList.add('border-green-500', 'border-2');
            if(typeof confetti === 'function') confetti();
        }

        document.querySelectorAll('.rpg-choice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const next = btn.dataset.next;
                if(next === 'exit') loadModuleContent('module61'); 
                else renderRPGScene(next, rpgData);
            });
        });
    }

    // === LÓGICA: CARTEIRINHA DIGITAL ===
    function renderDigitalID() {
        if (!currentUserData) return;
        const container = document.getElementById('id-card-container');
        if (!container) return;

        const savedPhoto = localStorage.getItem('user_profile_pic');
        const defaultPhoto = "https://raw.githubusercontent.com/instrutormedeiros/ProjetoBravoCharlie/refs/heads/main/assets/img/LOGO_QUADRADA.png"; 
        const currentPhoto = savedPhoto || defaultPhoto;
        const validUntil = new Date(currentUserData.acesso_ate).toLocaleDateString('pt-BR');
        const statusColor = currentUserData.status === 'premium' ? 'text-yellow-400' : 'text-gray-400';
        
        container.innerHTML = `
            <div class="relative w-full max-w-md bg-gradient-card rounded-xl overflow-hidden shadow-2xl text-white font-sans transform transition hover:scale-[1.01] duration-300">
                <div class="card-shine"></div>
                <div class="bg-red-700 p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="bg-white p-1 rounded-full"><img src="https://raw.githubusercontent.com/instrutormedeiros/ProjetoBravoCharlie/refs/heads/main/assets/img/LOGO_QUADRADA.png" class="w-10 h-10 object-cover"></div>
                        <div><h3 class="font-bold text-sm uppercase tracking-wider">Bombeiro Civil</h3><p class="text-[10px] text-red-200">Identificação de Aluno</p></div>
                    </div>
                    <i class="fas fa-wifi text-white/50 rotate-90"></i>
                </div>
                <div class="p-6 relative z-10">
                    <div class="flex justify-between items-start mb-6">
                        <div class="flex items-center gap-4">
                            <div class="relative group cursor-pointer" onclick="document.getElementById('profile-pic-input').click()">
                                <div class="w-20 h-20 rounded-lg border-2 border-white/30 overflow-hidden bg-gray-800"><img id="id-card-photo" src="${currentPhoto}" class="w-full h-full object-cover"></div>
                                <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><i class="fas fa-camera text-white"></i></div>
                                <input type="file" id="profile-pic-input" class="hidden" accept="image/*" onchange="window.updateProfilePic(this)">
                            </div>
                            <div><p class="text-xs text-gray-400 uppercase mb-1">Nome do Aluno</p><h2 class="text-lg font-bold text-white tracking-wide leading-tight max-w-[150px] break-words">${currentUserData.name}</h2></div>
                        </div>
                        <div class="bg-white p-1 rounded"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentUserData.email}" class="w-14 h-14"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div><p class="text-[10px] text-gray-400 uppercase">CPF</p><p class="font-mono text-sm">${currentUserData.cpf || '...'}</p></div>
                        <div><p class="text-[10px] text-gray-400 uppercase">Matrícula</p><p class="font-mono text-sm">BC-${Math.floor(Math.random()*10000)}</p></div>
                        <div><p class="text-[10px] text-gray-400 uppercase">Válido Até</p><p class="font-bold text-green-400 text-sm">${validUntil}</p></div>
                        <div><p class="text-[10px] text-gray-400 uppercase">Status</p><p class="font-bold text-sm uppercase flex items-center gap-1 ${statusColor}"><i class="fas fa-star text-xs"></i> ${currentUserData.status || 'Trial'}</p></div>
                    </div>
                </div>
                <div class="bg-black/30 p-3 text-center border-t border-white/10"><p class="text-[9px] text-gray-500">Uso pessoal e intransferível.</p></div>
            </div>
            <div class="text-center mt-6"><button onclick="window.print()" class="text-sm text-blue-500 hover:underline"><i class="fas fa-print"></i> Imprimir Carteirinha</button></div>
        `;
    }

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

    // === FUNÇÕES SIMULADO (NORMAL) ===
    async function startSimuladoMode(moduleData) {
        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

        loadingSpinner.classList.remove('hidden');
        contentArea.classList.add('hidden');

        activeSimuladoQuestions = await generateSimuladoQuestions(moduleData.simuladoConfig);
        userAnswers = {};
        simuladoTimeLeft = moduleData.simuladoConfig.timeLimit * 60; 
        currentSimuladoQuestionIndex = 0;

        contentArea.innerHTML = `
            <div class="pt-4 pb-12 relative">
                <div id="simulado-timer-bar" class="simulado-floating-timer">
                    <i class="fas fa-clock text-orange-500"></i>
                    <span id="timer-display" class="timer-text mx-2">--:--</span>
                    <div class="h-4 w-px bg-gray-600 mx-2"></div>
                    <span class="text-xs text-gray-300">Questão <span id="q-current">1</span>/${activeSimuladoQuestions.length}</span>
                </div>
                <div class="mt-4 mb-8 text-center px-4">
                     <h3 class="text-2xl md:text-3xl font-bold text-blue-900 dark:text-white border-b-2 border-orange-500 inline-block pb-2">${moduleData.title}</h3>
                      <p class="text-sm text-gray-500 mt-3"><i class="fas fa-info-circle"></i> Modo Prova: O resultado sai ao final.</p>
                </div>
                <div id="question-display-area" class="simulado-question-container"></div>
                <div class="mt-8 flex justify-between items-center px-2">
                    <button id="sim-prev-btn" class="action-button bg-gray-600" style="visibility: hidden;"><i class="fas fa-arrow-left mr-2"></i> Anterior</button>
                    <button id="sim-next-btn" class="action-button">Próxima <i class="fas fa-arrow-right ml-2"></i></button>
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
        const savedAnswer = userAnswers[index] || null; 
        
        let html = `
            <div class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 animate-slide-in">
                <div class="flex items-start mb-6">
                    <div class="w-1 h-8 bg-orange-500 mr-3 mt-1 rounded"></div>
                    <p class="font-bold text-lg text-gray-800 dark:text-white leading-relaxed">${q.question}</p>
                </div>
                <div class="space-y-3">
        `;
        
        for (const key in q.options) {
            const isSelected = savedAnswer === key ? 'selected' : '';
            html += `
                <div class="quiz-card-option ${isSelected}" onclick="selectSimuladoOption(${index}, '${key}', this)">
                    <div class="quiz-letter-box">${key.toUpperCase()}</div>
                    <div class="font-medium flex-1">${q.options[key]}</div>
                </div>
            `;
        }
        html += `</div></div>`;
        container.innerHTML = html;

        document.getElementById('q-current').innerText = index + 1;
        const prevBtn = document.getElementById('sim-prev-btn');
        const nextBtn = document.getElementById('sim-next-btn');
        
        prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
        if (index === activeSimuladoQuestions.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check-double mr-2"></i> ENTREGAR';
            nextBtn.className = "sim-nav-btn bg-green-600 text-white hover:bg-green-500 shadow-lg transform hover:scale-105 transition-transform px-6 py-2 rounded font-bold";
        } else {
            nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right ml-2"></i>';
            nextBtn.className = "sim-nav-btn bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 rounded font-bold";
        }
    }

    window.selectSimuladoOption = function(index, key, element) {
        const parent = element.parentElement;
        parent.querySelectorAll('.quiz-card-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        userAnswers[index] = key; 
    };

    function navigateSimulado(direction, moduleId) {
        const newIndex = currentSimuladoQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < activeSimuladoQuestions.length) {
            currentSimuladoQuestionIndex = newIndex;
            showSimuladoQuestion(newIndex);
            window.scrollTo({ top: 100, behavior: 'smooth' });
        } else if (newIndex >= activeSimuladoQuestions.length) {
            if(confirm("Tem certeza que deseja entregar o simulado?")) finishSimulado(moduleId);
        }
    }

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

    function finishSimulado(moduleId) {
        clearInterval(simuladoTimerInterval);
        let correctCount = 0;
        const total = activeSimuladoQuestions.length;
        let feedbackHtml = '<div class="space-y-6 mt-8">';

        activeSimuladoQuestions.forEach((q, i) => {
            const selected = userAnswers[i]; 
            const isCorrect = selected === q.answer;
            if(isCorrect) correctCount++;
            
            const boxClass = isCorrect ? 'feedback-correct' : 'feedback-wrong';
            const icon = isCorrect ? 'fa-check-circle' : 'fa-times-circle';
            const explanation = q.explanation || "Sem explicação disponível.";

            let optionsHtml = '';
            for (const key in q.options) {
                let rowClass = 'bg-gray-50 dark:bg-gray-800 text-gray-500'; 
                let iconStatus = '';
                if (key === q.answer) {
                    rowClass = 'answer-row correct-ref'; 
                    iconStatus = '<i class="fas fa-check text-green-500 float-right"></i>';
                } else if (key === selected && !isCorrect) {
                    rowClass = 'answer-row user-wrong'; 
                    iconStatus = '<i class="fas fa-times text-red-500 float-right"></i>';
                }
                optionsHtml += `<div class="${rowClass}"><strong class="mr-2 uppercase">${key})</strong> ${q.options[key]} ${iconStatus}</div>`;
            }

            feedbackHtml += `
                <div class="feedback-box ${boxClass}">
                    <div class="feedback-header"><span>${i+1}. ${q.question}</span><i class="fas ${icon} text-xl"></i></div>
                    <div class="feedback-body bg-white dark:bg-gray-900">
                        <div class="mb-3 text-xs font-bold text-gray-400 uppercase">SUA RESPOSTA: <span class="${isCorrect ? 'text-green-500' : 'text-red-500'}">${selected ? selected.toUpperCase() : 'NENHUMA'}</span></div>
                        ${optionsHtml}
                        <div class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-xs font-bold text-blue-500 mb-1"><i class="fas fa-info-circle"></i> EXPLICAÇÃO:</p><p class="explanation-text">${explanation}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        feedbackHtml += '</div>';

        const score = (correctCount / total) * 10;
        const percentage = (correctCount / total) * 100;

        contentArea.innerHTML = `
            <div class="text-center animate-slide-in">
                <h2 class="text-3xl font-serif font-bold mb-6 text-blue-900 dark:text-white">Resultado Final</h2>
                <div class="circle-chart" style="--percentage: ${percentage}" data-score="${score.toFixed(1)}"></div>
                <p class="text-gray-600 dark:text-gray-300 mb-2">Você acertou <strong>${correctCount}</strong> de <strong>${total}</strong> questões (${percentage.toFixed(0)}%).</p>
                <div class="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8 overflow-hidden"><div class="bg-blue-600 h-2 rounded-full" style="width: ${percentage}%"></div></div>
                <div class="flex justify-center mb-8"><button onclick="location.reload()" class="action-button"><i class="fas fa-undo mr-2"></i> Voltar ao Início</button></div>
                <div class="text-left"><h3 class="text-xl font-bold text-blue-500 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2"><i class="fas fa-clipboard-check mr-2"></i> Gabarito Detalhado</h3>${feedbackHtml}</div>
            </div>
        `;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (!completedModules.includes(moduleId)) {
            completedModules.push(moduleId);
            localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules));
            if(typeof saveProgressToCloud === 'function') saveProgressToCloud();
            updateProgress();
        }
    }
function setupConcludeButtonListener() {
        if (!currentModuleId) return;
        const b = document.querySelector(`.conclude-button[data-module="${currentModuleId}"]`);
        if(b) {
            if (concludeButtonClickListener) b.removeEventListener('click', concludeButtonClickListener);
            if(completedModules.includes(currentModuleId)){
                b.disabled=true;
                b.innerHTML='<i class="fas fa-check-circle mr-2"></i> Concluído';
            } else {
                b.disabled = false;
                b.innerHTML = 'Concluir Módulo';
                concludeButtonClickListener = () => handleConcludeButtonClick(b);
                b.addEventListener('click', concludeButtonClickListener);
            }
        }
    }

    let concludeButtonClickListener = null;

    // --- CORREÇÃO BUG #4: SCROLL E BOTÃO PISCANDO ---
    function handleConcludeButtonClick(b) {
        const id = b.dataset.module;
        if (id && !completedModules.includes(id)) {
            completedModules.push(id);
            localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules));
            
            // Salva nuvem
            if(typeof saveProgressToCloud === 'function') saveProgressToCloud();

            updateProgress();
            b.disabled = true;
            b.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Concluído';
            showAchievementToast(moduleContent[id].title);
            if(typeof confetti === 'function') confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, zIndex: 2000 });
            
            // --- FIX SCROLL SUAVE E REINÍCIO DA ANIMAÇÃO ---
            setTimeout(() => {
                const navContainer = document.getElementById('module-nav');
                const nextButton = document.getElementById('next-module');
                
                if (navContainer) {
                    navContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    if (nextButton && !nextButton.disabled) {
                        nextButton.classList.remove('blinking-button');
                        void nextButton.offsetWidth; // Força Reflow (reinicia animação)
                        nextButton.classList.add('blinking-button');
                    }
                }
            }, 600); 
        }
    }

    function updateActiveModuleInList() {
        document.querySelectorAll('.module-list-item').forEach(i => i.classList.toggle('active', i.dataset.module === currentModuleId));
    }
    
    function updateNavigationButtons() {
        const prevModule = document.getElementById('prev-module');
        const nextModule = document.getElementById('next-module');
        
        if (!prevModule || !nextModule) return;
        
        if (!currentModuleId) {
             prevModule.disabled = true;
             nextModule.disabled = true;
             return;
        }
        
        // Detecção de SP/BC para navegação
        let n = 0;
        if (currentModuleId.startsWith('sp_module')) {
            n = parseInt(currentModuleId.replace('sp_module', ''));
        } else {
            n = parseInt(currentModuleId.replace('module', ''));
        }

        prevModule.disabled = (n <= 1);
        nextModule.disabled = (n >= totalModules); 
    }

    function setupQuizListeners() {
        document.querySelectorAll('.quiz-option').forEach(o => o.addEventListener('click', handleQuizOptionClick));
    }

    function triggerSuccessParticles(clickEvent, element) {
        if (typeof confetti === 'function') confetti({ particleCount: 28, spread: 70, origin: { x: clickEvent ? clickEvent.clientX/window.innerWidth : 0.5, y: clickEvent ? clickEvent.clientY/window.innerHeight : 0.5 } });
    }

    function setupHeaderScroll() {
        const header = document.getElementById('main-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            });
        }
    }

    function setupRippleEffects() {
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('.action-button') || e.target.closest('.quiz-option');
            if (btn) {
                const oldRipple = btn.querySelector('.ripple');
                if (oldRipple) oldRipple.remove();
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }

    // --- FUNÇÃO ATUALIZADA: LISTA DE MÓDULOS (FILTRO SP/BC) ---
    function getModuleListHTML() {
        let html = `<h2 class="text-2xl font-semibold mb-5 flex items-center text-blue-900 dark:text-white"><i class="fas fa-list-ul mr-3 text-orange-500"></i> Conteúdo do Curso</h2><div class="mb-4 relative"><input type="text" class="module-search w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700" placeholder="Buscar módulo..."><i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i></div><div class="module-accordion-container space-y-2">`;
        
        for (const k in moduleCategories) {
            const cat = moduleCategories[k];
            const isLocked = cat.isPremium && (!currentUserData || currentUserData.status !== 'premium');
            const lockIcon = isLocked ? '<i class="fas fa-lock text-xs ml-2 text-yellow-500"></i>' : '';
            
            let catTotal = 0;
            let catCompleted = 0;
            
            const userType = currentUserData ? (currentUserData.courseType || 'BC') : 'BC';
            const isManager = currentUserData ? (currentUserData.isAdmin || currentUserData.courseType === 'GESTOR') : false;

            const prefix = cat.isSP ? 'sp_module' : 'module';

            for(let i = cat.range[0]; i <= cat.range[1]; i++) {
                const mid = `${prefix}${i}`; 
                if(moduleContent[mid]) {
                    const isSpContent = mid.startsWith('sp_');
                    let showIt = true;
                    if (!isManager) {
                        if (userType === 'BC' && isSpContent) showIt = false; 
                        if (userType === 'SP' && !isSpContent) showIt = false; 
                    }
                    if (showIt) {
                        catTotal++;
                        if(completedModules.includes(mid)) catCompleted++;
                    }
                }
            }

            if (catTotal === 0 && !isManager) continue; 

            html += `<div><button class="accordion-button"><span><i class="${cat.icon} w-6 mr-2 text-gray-500"></i>${cat.title} ${lockIcon}</span> <span class="module-count">${catCompleted}/${catTotal}</span> <i class="fas fa-chevron-down"></i></button><div class="accordion-panel">`;
            
            for (let i = cat.range[0]; i <= cat.range[1]; i++) {
                const mid = `${prefix}${i}`;
                const m = moduleContent[mid];
                if (m) {
                    const isSpContent = m.id.startsWith('sp_');
                    let showIt = true;
                    if (!isManager) {
                        if (userType === 'BC' && isSpContent) showIt = false;
                        if (userType === 'SP' && !isSpContent) showIt = false;
                    }
                    
                    if (showIt) {
                        const isDone = Array.isArray(completedModules) && completedModules.includes(m.id);
                        const itemLock = isLocked ? '<i class="fas fa-lock text-xs text-gray-400 ml-2"></i>' : '';
                        html += `<div class="module-list-item${isDone ? ' completed' : ''}" data-module="${m.id}"><i class="${m.iconClass} module-icon"></i><span style="flex:1">${m.title} ${itemLock}</span>${isDone ? '<i class="fas fa-check-circle completion-icon" aria-hidden="true"></i>' : ''}</div>`;
                    }
                }
            }
            html += `</div></div>`;
        }
        
        html += `</div>`;
        html += `<div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"><h3 class="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center"><i class="fas fa-medal mr-2 text-yellow-500"></i> Conquistas por Área</h3><div id="achievements-grid" class="grid grid-cols-2 gap-4">`;
        
        for (const key in moduleCategories) {
            const cat = moduleCategories[key];
            let showAchievement = true;
            if (currentUserData && !currentUserData.isAdmin && currentUserData.courseType !== 'GESTOR') {
                const type = currentUserData.courseType || 'BC';
                if (type === 'BC' && cat.isSP) showAchievement = false;
                if (type === 'SP' && !cat.isSP) showAchievement = false;
            }
            if (showAchievement) {
                html += `<div id="ach-cat-${key}" class="achievement-card" title="Conclua a área para ganhar: ${cat.achievementTitle}"><div class="achievement-icon"><i class="${cat.icon}"></i></div><p class="achievement-title">${cat.achievementTitle}</p></div>`;
            }
        }
        html += `</div></div>`;
        return html;
    }

    function updateProgress() {
        if (totalModules === 0) return;
        const p = (completedModules.length / totalModules) * 100;
        document.getElementById('progress-text').textContent = `${p.toFixed(0)}%`;
        document.getElementById('completed-modules-count').textContent = completedModules.length;
        if (document.getElementById('progress-bar-minimal')) document.getElementById('progress-bar-minimal').style.width = `${p}%`;
        updateModuleListStyles();
        checkAchievements();
        populateModuleLists(); 
        if (totalModules > 0 && completedModules.length === totalModules) showCongratulations();
    }

    function showCongratulations() {
        document.getElementById('congratulations-modal')?.classList.add('show');
        document.getElementById('modal-overlay')?.classList.add('show');
        if(typeof confetti === 'function') confetti({particleCount:150, spread:90, origin:{y:0.6},zIndex:200});
    }
    function showAchievementToast(title) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-trophy"></i><div><p class="font-bold">Módulo Concluído!</p><p class="text-sm">${title}</p></div>`;
        if (toastContainer) toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 4500);
    }
    function updateModuleListStyles() {
        document.querySelectorAll('.module-list-item').forEach(i => i.classList.toggle('completed', completedModules.includes(i.dataset.module)));
    }
    
    function checkAchievements() {
        let newNotification = false;
        const userType = currentUserData ? (currentUserData.courseType || 'BC') : 'BC';
        const isManager = currentUserData ? (currentUserData.isAdmin || currentUserData.courseType === 'GESTOR') : false;

        for(const key in moduleCategories) {
            const cat = moduleCategories[key];
            if (!isManager) {
                if (userType === 'BC' && cat.isSP) continue; 
                if (userType === 'SP' && !cat.isSP) continue;
            }
            let allComplete = true;
            const prefix = cat.isSP ? 'sp_module' : 'module';
            for(let i = cat.range[0]; i <= cat.range[1]; i++) {
                const mid = `${prefix}${i}`;
                if (!moduleContent[mid] || !completedModules.includes(mid)) {
                    allComplete = false; 
                    break;
                }
            }
            if (allComplete && !notifiedAchievements.includes(key)) {
                showAchievementModal(cat.achievementTitle, cat.icon);
                notifiedAchievements.push(key);
                newNotification = true;
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
        achievementModal.classList.add('show');
        achievementOverlay.classList.add('show');
        if(typeof confetti === 'function') confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, zIndex: 103 });
    }
    function hideAchievementModal() {
        achievementModal?.classList.remove('show');
        achievementOverlay?.classList.remove('show');
    }

    function toggleFocusMode() {
        const isEnteringFocusMode = !document.body.classList.contains('focus-mode');
        document.body.classList.toggle('focus-mode');
        if (!isEnteringFocusMode) closeSidebar();
    }

    function addEventListeners() {
        const nextButton = document.getElementById('next-module');
        const prevButton = document.getElementById('prev-module');

        prevButton?.addEventListener('click', () => {
            if (!currentModuleId) return;
            let prefix = currentModuleId.startsWith('sp_module') ? 'sp_module' : 'module';
            let n = parseInt(currentModuleId.replace(prefix, ''));
            if(n > 1) loadModuleContent(`${prefix}${n-1}`);
            nextButton?.classList.remove('blinking-button');
        });

        nextButton?.addEventListener('click', () => {
            if (!currentModuleId) return;
            let prefix = currentModuleId.startsWith('sp_module') ? 'sp_module' : 'module';
            let n = parseInt(currentModuleId.replace(prefix, ''));
            if(n < totalModules) loadModuleContent(`${prefix}${n+1}`);
            nextButton?.classList.remove('blinking-button');
        });

        // --- CORREÇÃO BUG #3: BOTÃO MANUAL DE SALVAR (TRY/FINALLY) ---
        document.getElementById('manual-sync-btn')?.addEventListener('click', async () => {
            const btn = document.getElementById('manual-sync-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Salvando...';
            btn.disabled = true;
            try {
                await window.saveProgressToCloud(); 
                alert("✅ Sucesso!\nSeu progresso foi salvo na nuvem.");
            } catch (error) {
                alert("❌ Erro ao salvar: " + error.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
        
        const tourBtn = document.getElementById('restart-tour-btn');
        if (tourBtn) {
            const newTourBtn = tourBtn.cloneNode(true);
            tourBtn.parentNode.replaceChild(newTourBtn, tourBtn);
            newTourBtn.addEventListener('click', (e) => {
                e.preventDefault();
                startOnboardingTour(true);
            });
        }
        
        document.body.addEventListener('input', e => {
            if(e.target.matches('.module-search')) {
                const s = e.target.value.toLowerCase();
                const container = e.target.closest('div.relative');
                if (container) {
                    const accordionContainer = container.nextElementSibling;
                    if (accordionContainer) {
                            accordionContainer.querySelectorAll('.module-list-item').forEach(i => {
                            const text = i.textContent.toLowerCase();
                            const match = text.includes(s);
                            i.style.display = match ? 'flex' : 'none';
                            if(match && s.length > 0) {
                                const panel = i.closest('.accordion-panel');
                                const btn = panel.previousElementSibling;
                                if(!btn.classList.contains('active')) {
                                    btn.classList.add('active');
                                    panel.style.maxHeight = panel.scrollHeight + "px";
                                }
                            }
                        });
                        if(s.length === 0) {
                            accordionContainer.querySelectorAll('.accordion-button').forEach(btn => {
                                btn.classList.remove('active');
                                btn.nextElementSibling.style.maxHeight = null;
                            });
                        }
                    }
                }
            }
        });

        const adminBtn = document.getElementById('admin-panel-btn');
        const mobileAdminBtn = document.getElementById('mobile-admin-btn');
        adminBtn?.addEventListener('click', window.openAdminPanel);
        mobileAdminBtn?.addEventListener('click', window.openAdminPanel);

        document.getElementById('close-admin-modal')?.addEventListener('click', () => {
            document.getElementById('admin-modal').classList.remove('show');
            document.getElementById('admin-modal-overlay').classList.remove('show');
        });
        document.getElementById('admin-modal-overlay')?.addEventListener('click', () => {
            document.getElementById('admin-modal').classList.remove('show');
            document.getElementById('admin-modal-overlay').classList.remove('show');
        });

        document.getElementById('reset-progress')?.addEventListener('click', () => { 
            document.getElementById('reset-modal')?.classList.add('show'); 
            document.getElementById('reset-modal-overlay')?.classList.add('show'); 
        });
        document.getElementById('cancel-reset-button')?.addEventListener('click', () => { 
            document.getElementById('reset-modal')?.classList.remove('show'); 
            document.getElementById('reset-modal-overlay')?.classList.remove('show'); 
        });
        document.getElementById('confirm-reset-button')?.addEventListener('click', async () => {
            const btn = document.getElementById('confirm-reset-button');
            btn.innerHTML = 'Resetando...';
            btn.disabled = true;
            try {
                if (currentUserData && currentUserData.uid) {
                    const db = window.__fbDB || window.fbDB;
                    await db.collection('users').doc(currentUserData.uid).update({ completedModules: [] });
                }
                window.clearLocalUserData();
                alert('Progresso resetado com sucesso!');
                window.location.reload();
            } catch (error) {
                alert("Erro ao resetar na nuvem, mas o local foi limpo.");
                window.clearLocalUserData();
                window.location.reload();
            }
        });
        
        document.getElementById('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        window.addEventListener('scroll', () => {
            const btn = document.getElementById('back-to-top');
            if(btn) {
                if (window.scrollY > 300) { btn.style.display = 'flex'; setTimeout(() => { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; }, 10); } 
                else { btn.style.opacity = '0'; btn.style.transform = 'translateY(20px)'; setTimeout(() => btn.style.display = 'none', 300); }
            }
        });

        document.body.addEventListener('click', e => {
            const moduleItem = e.target.closest('.module-list-item');
            if (moduleItem) {
                loadModuleContent(moduleItem.dataset.module);
                const nextButton = document.getElementById('next-module');
                if(nextButton) nextButton.classList.remove('blinking-button');
            }
            if (e.target.closest('.accordion-button')) {
                const b = e.target.closest('.accordion-button');
                const p = b.nextElementSibling;
                if (!p) return;
                const isActive = b.classList.contains('active');
                const allPanels = b.closest('.module-accordion-container, .sidebar, #mobile-module-container').querySelectorAll('.accordion-panel');
                allPanels.forEach(op => {
                    if (op !== p && op.previousElementSibling) {
                            op.style.maxHeight = null;
                            op.previousElementSibling.classList.remove('active');
                    }
                });
                if (!isActive) { b.classList.add('active'); p.style.maxHeight = p.scrollHeight + "px"; } 
                else { b.classList.remove('active'); p.style.maxHeight = null; }
            }
        });

        document.getElementById('mobile-menu-button')?.addEventListener('click', openSidebar);
        document.getElementById('close-sidebar-button')?.addEventListener('click', closeSidebar);
        document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);
        document.getElementById('home-button-desktop')?.addEventListener('click', goToHomePage);
        document.getElementById('bottom-nav-home')?.addEventListener('click', goToHomePage);
        document.getElementById('bottom-nav-modules')?.addEventListener('click', openSidebar);
        document.getElementById('bottom-nav-theme')?.addEventListener('click', toggleTheme);
        document.getElementById('dark-mode-toggle-desktop')?.addEventListener('click', toggleTheme);
        document.getElementById('focus-mode-toggle')?.addEventListener('click', toggleFocusMode);
        document.getElementById('bottom-nav-focus')?.addEventListener('click', toggleFocusMode);
        document.getElementById('focus-menu-modules')?.addEventListener('click', openSidebar);
        document.getElementById('focus-menu-exit')?.addEventListener('click', toggleFocusMode);
        document.getElementById('focus-nav-modules')?.addEventListener('click', openSidebar);
        document.getElementById('focus-nav-exit')?.addEventListener('click', toggleFocusMode);
        document.getElementById('close-congrats')?.addEventListener('click', () => { document.getElementById('congratulations-modal').classList.remove('show'); document.getElementById('modal-overlay').classList.remove('show'); });
        document.getElementById('close-ach-modal')?.addEventListener('click', hideAchievementModal);
        document.getElementById('achievement-modal-overlay')?.addEventListener('click', hideAchievementModal);
    }

    // --- CORREÇÃO BUG #1: PAINEL DO GESTOR IMPLEMENTADO ---
    let managerCachedUsers = [];

    window.openManagerPanel = function() {
        console.log("🔓 Abrindo Painel do Gestor...");
        const db = window.__fbDB || window.fbDB; 
        if (!db) { alert("⏳ Sistema carregando. Tente novamente."); return; }
        if (!currentUserData) { alert("❌ Erro: Usuário não identificado."); return; }

        const modal = document.getElementById("manager-modal");
        const overlay = document.getElementById("admin-modal-overlay");
        const tbody = document.getElementById("manager-table-body");
        const filterSelect = document.getElementById('mgr-filter-turma');

        if (!modal || !overlay) return;
        modal.classList.add("show");
        overlay.classList.add("show");

        const closeBtn = document.getElementById("close-manager-modal");
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.classList.remove("show");
                if (typeof managerUnsubscribe === 'function') {
                    managerUnsubscribe();
                    managerUnsubscribe = null;
                }
                if (!document.getElementById("admin-modal")?.classList.contains("show")) {
                    overlay.classList.remove("show");
                }
            };
        }

        if (tbody) tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-gray-500"><i class="fas fa-spinner fa-spin mr-2"></i> Conectando...</td></tr>`;

        if (managerUnsubscribe) managerUnsubscribe();

        try {
            managerUnsubscribe = db.collection("users").onSnapshot((snapshot) => {
                let users = [];
                let turmasEncontradas = new Set();
                snapshot.forEach(doc => {
                    const u = doc.data();
                    u.uid = doc.id;
                    u.company = (u.company || "Particular").trim()
                    if (!u.completedModules) u.completedModules = [];
                    users.push(u);
                    turmasEncontradas.add(u.company);
                });
                users.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
                window.managerCachedUsers = users;

                if (filterSelect) {
                    const valorAtual = filterSelect.value || 'TODOS';
                    filterSelect.innerHTML = '<option value="TODOS">Todas as Turmas</option>';
                    Array.from(turmasEncontradas).sort().forEach(turma => {
                        filterSelect.innerHTML += `<option value="${turma}">${turma}</option>`;
                    });
                    const exists = Array.from(filterSelect.options).some(opt => opt.value === valorAtual);
                    filterSelect.value = exists ? valorAtual : 'TODOS';
                }
                window.filterManagerTable();
            }, (error) => {
                if (tbody) tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-red-500">Erro: ${error.message}</td></tr>`;
            });
        } catch (err) { console.error(err); }
    };

    window.filterManagerTable = function() {
        const select = document.getElementById('mgr-filter-turma');
        const selectedTurma = select ? select.value : 'TODOS';
        if (!window.managerCachedUsers) return;
        let filteredList = window.managerCachedUsers;
        if (selectedTurma !== 'TODOS') filteredList = window.managerCachedUsers.filter(u => u.company === selectedTurma);
        renderManagerTable(filteredList);
    };

    window.renderManagerTable = function(usersList) {
        const tbody = document.getElementById('manager-table-body');
        if (!tbody) return;
        const totalCourseModules = (window.moduleContent && Object.keys(window.moduleContent).length > 0) ? Object.keys(window.moduleContent).length : 62;
        let html = '';
        let stats = { total: 0, completed: 0, progress: 0, pending: 0 };

        if (!usersList || usersList.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="p-8 text-center text-gray-500 italic">Nenhum aluno encontrado.</td></tr>';
            return;
        }

        usersList.forEach(u => {
            const completedArr = Array.isArray(u.completedModules) ? u.completedModules : [];
            const modulesDone = completedArr.length;
            const total = totalCourseModules;
            let percent = total > 0 ? Math.round((modulesDone / total) * 100) : 0;
            if (percent > 100) percent = 100;

            let progressColor = 'bg-gray-300';
            if (percent > 0) progressColor = 'bg-red-500';
            if (percent > 30) progressColor = 'bg-yellow-500';
            if (percent > 80) progressColor = 'bg-green-500';
            if (percent === 100) progressColor = 'bg-blue-600';

            stats.total++;
            if (percent >= 100) stats.completed++;
            else if (percent > 0) stats.progress++;
            else stats.pending++;

            const phone = u.phone || 'Não informado';
            const turma = u.company || 'Particular';
            let statusBadge = u.status === 'premium' ? '<span class="px-2 py-1 bg-green-100 text-green-800 text-[10px] rounded font-bold uppercase">PREMIUM</span>' : '<span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-[10px] rounded font-bold uppercase">TRIAL</span>';
            let validadeStr = u.acesso_ate ? new Date(u.acesso_ate).toLocaleDateString('pt-BR') : '-';

            html += `
                <tr class="hover:bg-gray-50 border-b border-gray-100 group transition-colors">
                    <td class="px-4 py-3"><div class="font-bold text-gray-800 text-sm">${u.name || 'Sem Nome'}</div><div class="text-xs text-gray-500">${u.email}</div></td>
                    <td class="px-4 py-3 text-xs text-gray-600"><div class="flex items-center gap-2">${phone !== 'Não informado' ? '<i class="fab fa-whatsapp text-green-500"></i>' : ''} ${phone} <button onclick="editUserPhone('${u.uid}', '${phone}')" class="text-gray-300 hover:text-blue-500 opacity-0 group-hover:opacity-100"><i class="fas fa-pencil-alt"></i></button></div></td>
                    <td class="px-4 py-3"><div class="flex items-center gap-2"><span class="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] rounded font-bold border border-blue-100 uppercase">${turma}</span> <button onclick="editUserClass('${u.uid}', '${turma}')" class="text-gray-300 hover:text-blue-500 opacity-0 group-hover:opacity-100"><i class="fas fa-pencil-alt"></i></button></div></td>
                    <td class="px-4 py-3" title="${modulesDone}/${totalCourseModules}"><div class="flex items-center w-full max-w-[140px]"><div class="flex-1 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden"><div class="${progressColor} h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div></div><span class="text-xs font-bold text-gray-700 w-8 text-right">${percent}%</span></div></td>
                    <td class="px-4 py-3">${statusBadge}</td>
                    <td class="px-4 py-3 text-xs font-mono text-gray-600">${validadeStr}</td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
        if(document.getElementById('mgr-total-users')) document.getElementById('mgr-total-users').innerText = stats.total;
        if(document.getElementById('mgr-completed')) document.getElementById('mgr-completed').innerText = stats.completed;
        if(document.getElementById('mgr-progress')) document.getElementById('mgr-progress').innerText = stats.progress;
        if(document.getElementById('mgr-pending')) document.getElementById('mgr-pending').innerText = stats.pending;
    };

    window.editUserClass = async function(uid, oldClass) {
        const newClass = prompt("Digite o novo nome da Turma/Empresa:", oldClass);
        if (newClass && newClass !== oldClass) {
            try { await window.__fbDB.collection('users').doc(uid).update({ company: newClass.toUpperCase() }); alert("Turma atualizada!"); openManagerPanel(); } catch (e) { alert("Erro: " + e.message); }
        }
    };
    window.editUserPhone = async function(uid, oldPhone) {
        const cleanPhone = oldPhone === 'Não informado' ? '' : oldPhone;
        const newPhone = prompt("Digite o novo WhatsApp/Telefone:", cleanPhone);
        if (newPhone !== null && newPhone !== cleanPhone) {
            try { await window.__fbDB.collection('users').doc(uid).update({ phone: newPhone }); alert("Telefone atualizado!"); openManagerPanel(); } catch (e) { alert("Erro: " + e.message); }
        }
    };
    window.toggleManagerRole = async function(uid, currentStatus) {
        const novoStatus = !currentStatus;
        if(confirm(`Deseja ${novoStatus ? "PROMOVER" : "REMOVER"} este usuário como Gestor?`)) {
            try { await window.__fbDB.collection('users').doc(uid).update({ isManager: novoStatus }); alert("Sucesso!"); openAdminPanel(); } catch(e) { alert("Erro: " + e.message); }
        }
    };

    function initVoiceflowLimit() {
        if (!window.voiceflow || !window.voiceflow.chat || typeof window.voiceflow.chat.on !== 'function') {
            let attempts = 0;
            const retry = setInterval(() => {
                attempts++;
                if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.on === 'function') { setupVoiceflowListener(); clearInterval(retry); }
                if (attempts > 5) clearInterval(retry);
            }, 3000);
            return;
        }
        setupVoiceflowListener();
    }
    function setupVoiceflowListener() {
        window.voiceflow.chat.on('user:message', () => {
            const today = new Date().toLocaleDateString();
            const key = `ai_usage_${today}`;
            let count = parseInt(localStorage.getItem(key) || '0') + 1;
            localStorage.setItem(key, count);
            const isPremium = currentUserData && currentUserData.status === 'premium';
            const limit = isPremium ? 50 : 5; 
            if (count > limit) { alert(`⚠️ Limite diário de IA atingido (${limit} perguntas).`); document.getElementById('voiceflow-chat').style.display = 'none'; }
        });
    }
    setTimeout(initVoiceflowLimit, 5000);

    function startOnboardingTour(isManual = false) {
        if (!isManual && localStorage.getItem('bravo_tour_completed') === 'true') return;
        setTimeout(() => {
            if (!window.driver || !window.driver.js || !window.driver.js.driver) return;
            const driver = window.driver.js.driver;
            const isMobile = window.innerWidth < 768; 
            const installBtnDesktop = document.getElementById('install-app-btn');
            const installBtnMobile = document.getElementById('install-app-btn-mobile');
            const steps = [
                { element: '#accessibility-fab', popover: { title: '1. Acessibilidade', description: 'Ajuste o tamanho e fonte.', side: "left", align: 'end' } },
                { element: '#voiceflow-chat', popover: { title: '2. BravoGPT (IA)', description: 'Tire dúvidas com nossa IA.', side: isMobile ? "top" : "right", align: isMobile ? "center" : "end" } }
            ];
            if (installBtnDesktop && !installBtnDesktop.classList.contains('hidden')) { steps.push({ element: '#install-app-btn', popover: { title: '3. Instale', description: 'Instale no Computador.', side: "bottom", align: 'center'} }); } 
            else if (installBtnMobile && !installBtnMobile.classList.contains('hidden')) { steps.push({ element: '#mobile-menu-button', popover: { title: '3. Instale o App', description: 'Abra o menu para instalar.', side: "bottom", align: 'end' } }); }
            const driverObj = driver({ showProgress: true, animate: true, stagePadding: 5, popoverClass: 'driverjs-theme', steps: steps, onDestroyed: () => { if (!isManual) localStorage.setItem('bravo_tour_completed', 'true'); }, nextBtnText: 'Próximo', prevBtnText: 'Voltar', doneBtnText: 'Concluir' });
            driverObj.drive();
        }, 1500);
    }
    
    window.saveProgressToCloud = function(targetUid = null) {
        return new Promise((resolve, reject) => {
            try {
                if (!currentUserData || !currentUserData.uid) { resolve(); return; }
                let finalTargetUid = targetUid || currentUserData.uid;
                let modulesToSave = completedModules || [];
                if (!modulesToSave || modulesToSave.length === 0) {
                    const localData = localStorage.getItem('gateBombeiroCompletedModules_v3');
                    if (localData) { modulesToSave = JSON.parse(localData); completedModules = modulesToSave; }
                }
                modulesToSave = Array.from(new Set(modulesToSave));
                const db = window.__fbDB || window.fbDB;
                if (!db) { resolve(); return; }
                db.collection('users').doc(finalTargetUid).update({
                    completedModules: modulesToSave,
                    last_progress_update: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => { if (currentUserData) currentUserData.completedModules = modulesToSave; resolve(); })
                .catch(err => { console.error("Erro salvar:", err); reject(err); });
            } catch (err) { reject(err); }
        });
    };

    window.clearLocalUserData = function() {
        completedModules = [];
        notifiedAchievements = [];
        currentUserData = null;
        totalModules = 0;
        localStorage.removeItem('gateBombeiroCompletedModules_v3');
        localStorage.removeItem('gateBombeiroNotifiedAchievements_v3');
        localStorage.removeItem('gateBombeiroLastModule');
        localStorage.removeItem('my_session_id');
        localStorage.removeItem('user_profile_pic');
        Object.keys(localStorage).forEach(key => { if (key.startsWith('note-')) localStorage.removeItem(key); });
        const totalEl = document.getElementById('total-modules');
        const completedEl = document.getElementById('completed-modules-count');
        const progressText = document.getElementById('progress-text');
        const progressBar = document.getElementById('progress-bar-minimal');
        const welcome = document.getElementById('welcome-greeting');
        if (totalEl) totalEl.textContent = '0';
        if (completedEl) completedEl.textContent = '0';
        if (progressText) progressText.textContent = '0%';
        if (progressBar) progressBar.style.width = '0%';
        if (welcome) welcome.textContent = 'Bem-vindo,';
        document.querySelectorAll('.module-list-item').forEach(item => { item.classList.remove('completed', 'active'); const icon = item.querySelector('.completion-icon'); if(icon) icon.remove(); });
    };
    
    // Inicia o app (agora seguro, sem quebrar capa)
    init(); 
});
