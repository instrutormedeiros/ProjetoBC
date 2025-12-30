/* === ARQUIVO app_final.js (VERSÃO COMPLETA INTEGRADA - CORREÇÃO BUG GESTOR + CARROSSEL + LOGIN) === */

document.addEventListener('DOMContentLoaded', () => {

    // --- VARIÁVEIS GLOBAIS DO SISTEMA ---
    const contentArea = document.getElementById('content-area');
    
    // Variáveis de Controle de Estado
    let managerUnsubscribe = null; 
    let totalModules = 0; 
    // Recupera dados locais
    let completedModules = JSON.parse(localStorage.getItem('gateBombeiroCompletedModules_v3')) || [];
    let notifiedAchievements = JSON.parse(localStorage.getItem('gateBombeiroNotifiedAchievements_v3')) || [];
    let currentModuleId = null;
    let currentUserData = null; 

    // --- VARIÁVEIS DO SIMULADO E JOGOS ---
    let simuladoTimerInterval = null;
    let simuladoTimeLeft = 0;
    let activeSimuladoQuestions = [];
    let userAnswers = {};
    let currentSimuladoQuestionIndex = 0; 

    let survivalLives = 3;
    let survivalScore = 0;
    let survivalQuestions = [];
    let currentSurvivalIndex = 0;

    // --- SELETORES GLOBAIS ---
    const toastContainer = document.getElementById('toast-container');
    const sidebar = document.getElementById('off-canvas-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const moduleList = document.getElementById('module-list');

    // --- 1. INICIALIZAÇÃO DO APP ---
    async function init() {
        console.log("Inicializando Sistema Bravo Charlie...");

        // Inicializa Carrossel da Capa
        initCarousel(); 

        // Listener de Autenticação do Firebase
        if (window.FirebaseCourse && window.__fbAuth) {
            window.__fbAuth.onAuthStateChanged(user => {
                if (user) {
                    // Usuário detectado, carregar perfil
                    handleUserLogin(user);
                } else {
                    // Sem usuário, forçar tela de login
                    showLoginScreen();
                }
            });
        } else {
            console.error("Firebase não inicializado corretamente.");
        }

        // Renderização Inicial
        updateProgressBar();
        renderModuleList();
        setupEventListeners();
        checkAchievements(); 
    }

    // --- 2. LÓGICA DE LOGIN E SESSÃO (IMPORTANTE) ---
    function handleUserLogin(user) {
        const db = window.__fbDB;
        if(!db) return;

        // Listener em tempo real do usuário (para verificar bloqueio ou sessão duplicada)
        db.collection('users').doc(user.uid).onSnapshot(doc => {
            if (doc.exists) {
                const data = doc.data();
                
                // Validação de Sessão Única (Segurança)
                const localSession = localStorage.getItem('my_session_id');
                // Se a sessão no banco for diferente da local e ambas existirem, derruba
                if (data.current_session_id && localSession && data.current_session_id !== localSession) {
                    alert("Sua conta foi acessada em outro dispositivo. Você será desconectado.");
                    logout(true); // true = forçado
                    return;
                }

                // Salva sessão se não tiver
                if (!localSession && data.current_session_id) {
                    localStorage.setItem('my_session_id', data.current_session_id);
                }

                // Atualiza dados globais
                currentUserData = data;
                currentUserData.uid = user.uid;

                // Sincroniza progresso (Merge Nuvem + Local)
                if (currentUserData.completedModules && Array.isArray(currentUserData.completedModules)) {
                    const cloudModules = currentUserData.completedModules;
                    completedModules = [...new Set([...completedModules, ...cloudModules])];
                    localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules));
                }

                updateUIForUser(currentUserData);
                hideLoginScreen();

            } else {
                console.error("Documento do usuário não encontrado.");
            }
        }, error => {
            console.error("Erro ao escutar usuário:", error);
        });
    }

    function showLoginScreen() {
        const loginModal = document.getElementById('name-prompt-modal'); // Usando ID padrão do seu HTML
        const overlay = document.getElementById('name-modal-overlay');
        if (loginModal) {
            loginModal.classList.remove('hidden');
            loginModal.style.display = 'flex';
        }
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'block';
        }
        currentUserData = null;
    }

    function hideLoginScreen() {
        const loginModal = document.getElementById('name-prompt-modal');
        const overlay = document.getElementById('name-modal-overlay');
        if (loginModal) {
            loginModal.classList.add('hidden');
            loginModal.style.display = 'none';
        }
        if (overlay) {
            // Só esconde o overlay se não houver outros modais abertos
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
    }

    // Atualiza a interface com Nome, Foto e Permissões
    function updateUIForUser(userData) {
        // Saudação
        const welcome = document.getElementById('welcome-greeting');
        if (welcome) welcome.textContent = `Olá, ${userData.name || 'Aluno'}`;

        // Avatar
        const avatar = document.getElementById('user-avatar');
        if (avatar && userData.photoURL) {
            avatar.src = userData.photoURL;
        }

        // Botões Admin/Gestor (CORREÇÃO: Garantir visibilidade correta)
        const adminBtn = document.getElementById('btn-admin-panel');
        const managerBtn = document.getElementById('btn-manager-panel');
        
        if (adminBtn) {
            adminBtn.style.display = (userData.isAdmin) ? 'block' : 'none';
        }
        
        if (managerBtn) {
            // Exibe se for Gestor OU Admin
            managerBtn.style.display = (userData.isManager || userData.isAdmin) ? 'block' : 'none';
        }

        // Re-renderiza módulos pois permissões mudaram
        renderModuleList();
        updateProgressBar();
    }
// --- 3. LÓGICA DO CARROSSEL (INTERFACE INICIAL) ---
    function initCarousel() {
        const carouselTrack = document.getElementById('carousel-track');
        if (!carouselTrack) return;

        // Se houver lógica de slide automático, configuramos aqui
        let scrollAmount = 0;
        const speed = 1; // Velocidade do scroll automático
        let isHovered = false;

        // Pausa no hover
        carouselTrack.addEventListener('mouseenter', () => isHovered = true);
        carouselTrack.addEventListener('mouseleave', () => isHovered = false);

        function autoScroll() {
            if (!isHovered) {
                scrollAmount -= speed;
                // Lógica de loop infinito simples
                if (Math.abs(scrollAmount) >= (carouselTrack.scrollWidth / 2)) {
                    scrollAmount = 0;
                }
                carouselTrack.style.transform = `translateX(${scrollAmount}px)`;
            }
            requestAnimationFrame(autoScroll);
        }
        
        // Inicia apenas se tiver conteúdo suficiente
        if (carouselTrack.children.length > 3) {
            // Duplica itens para efeito infinito se necessário
            const items = Array.from(carouselTrack.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                carouselTrack.appendChild(clone);
            });
            // requestAnimationFrame(autoScroll); // Descomente se quiser auto-scroll
        }
    }

    // --- 4. RENDERIZAÇÃO DE MÓDULOS (A CORREÇÃO PRINCIPAL) ---
    function renderModuleList() {
        const moduleList = document.getElementById('module-list');
        if (!moduleList) return;

        moduleList.innerHTML = ''; // Limpa a lista para evitar duplicatas

        // Definição de Permissões
        const isMaster = currentUserData && (currentUserData.isAdmin || currentUserData.isManager);
        const userType = currentUserData ? (currentUserData.courseType || currentUserData.type) : 'bombeiro';

        // Iteração sobre o conteúdo (data.js)
        const moduleKeys = Object.keys(moduleContent);
        
        moduleKeys.forEach((modId, index) => {
            const mod = moduleContent[modId];
            
            // --- FILTRO DE VISIBILIDADE (CORRIGIDO) ---
            // Antes, o código ocultava módulos SP incorretamente.
            // Agora, mostramos tudo por padrão, a menos que haja uma regra específica de exclusão.
            // Se o seu sistema usa "sp_" no ID, descomente o filtro abaixo. 
            // Caso contrário (ids sequenciais module1..moduleX), mostramos tudo.
            
            let isVisible = true;
            // Exemplo de filtro seguro (se necessário no futuro):
            // if (userType === 'bombeiro' && modId.startsWith('sp_')) isVisible = false;
            
            if (!isVisible && !isMaster) return;

            // --- LÓGICA DE BLOQUEIO (SEQUENCIAL) ---
            const isCompleted = completedModules.includes(modId);
            let isLocked = false;
            let statusText = 'Disponível';
            let statusColor = 'text-blue-600';

            // Se não é o primeiro e o anterior não está feito, bloqueia
            if (index > 0 && !isMaster) {
                const prevModId = moduleKeys[index - 1];
                if (!completedModules.includes(prevModId)) {
                    isLocked = true;
                    statusText = 'Bloqueado (Conclua o anterior)';
                    statusColor = 'text-gray-400';
                }
            }

            // --- MONTAGEM DO CARD HTML ---
            const item = document.createElement('div');
            // ID CRÍTICO para o scroll suave funcionar na Parte 3
            item.id = `module-card-${modId}`; 
            
            // Classes dinâmicas
            let borderClass = isLocked ? 'border-gray-300 opacity-70' : 'border-blue-500 active-card';
            if (isCompleted) borderClass = 'border-green-500 completed-card bg-green-50';
            
            item.className = `module-list-item relative flex flex-col md:flex-row justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md border-l-4 transition-all duration-300 ${borderClass}`;

            // Ícone Dinâmico
            let iconHtml = `<div class="text-3xl mr-4 ${isCompleted ? 'text-green-500' : (isLocked ? 'text-gray-400' : 'text-blue-600')}">
                                <i class="${mod.iconClass || 'fas fa-book'}"></i>
                            </div>`;

            // Botão de Ação (Com a classe blinking-button CORRIGIDA)
            let actionButtonHtml = '';
            
            if (isCompleted) {
                actionButtonHtml = `
                    <button class="flex items-center text-green-700 font-bold px-4 py-2 bg-green-100 rounded-full cursor-default">
                        <i class="fas fa-check-circle mr-2"></i> Concluído
                    </button>
                `;
            } else if (isLocked) {
                actionButtonHtml = `
                    <button class="flex items-center text-gray-500 font-bold px-4 py-2 bg-gray-100 rounded-full cursor-not-allowed" disabled>
                        <i class="fas fa-lock mr-2"></i> Bloqueado
                    </button>
                `;
            } else {
                // MÓDULO ATUAL: Botão Azul que Pisca
                actionButtonHtml = `
                    <button onclick="openModule('${modId}')" class="blinking-button flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition">
                        <i class="fas fa-play mr-2"></i> Iniciar Aula
                    </button>
                `;
            }

            // HTML Interno do Card
            item.innerHTML = `
                <div class="flex items-center w-full md:w-auto mb-3 md:mb-0">
                    ${iconHtml}
                    <div class="text-left">
                        <h4 class="font-bold text-lg text-gray-800 leading-tight">${mod.title}</h4>
                        <p class="text-xs ${statusColor} font-medium mt-1 uppercase tracking-wide">${statusText}</p>
                    </div>
                </div>
                <div class="action-wrapper w-full md:w-auto flex justify-end">
                    ${actionButtonHtml}
                </div>
            `;

            moduleList.appendChild(item);
        });
    }

    // --- 5. SETUP DE EVENTOS (MENU E UI) ---
    function setupEventListeners() {
        // Toggle do Menu Lateral (Sidebar)
        const menuBtn = document.getElementById('menu-btn');
        const closeSidebarBtn = document.getElementById('close-sidebar');
        
        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('open');
                if(sidebarOverlay) sidebarOverlay.classList.toggle('show');
            });
        }

        // Fechar Sidebar ao clicar no Overlay ou Botão X
        const closeMenuActions = () => {
            sidebar.classList.remove('open');
            if(sidebarOverlay) sidebarOverlay.classList.remove('show');
        };

        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMenuActions);
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMenuActions);

        // Botão "Voltar ao Topo" (Opcional, mas útil em listas longas)
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) backToTopBtn.classList.remove('hidden');
                else backToTopBtn.classList.add('hidden');
            });
            backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        // --- LISTENERS DOS BOTÕES DE PAINEL (CORREÇÃO BUG 1) ---
        // Aqui vinculamos o clique dos botões às funções que estarão na Parte 6
        
        const btnManager = document.getElementById('btn-manager-panel');
        if (btnManager) {
            btnManager.onclick = (e) => {
                e.preventDefault();
                if (typeof window.openManagerPanel === 'function') {
                    window.openManagerPanel();
                } else {
                    console.error("Função do Painel Gestor não carregada.");
                    alert("Aguarde o carregamento total do sistema.");
                }
            };
        }

        const btnAdmin = document.getElementById('btn-admin-panel');
        if (btnAdmin) {
            btnAdmin.onclick = (e) => {
                e.preventDefault();
                const adminModal = document.getElementById('admin-modal');
                if(adminModal) {
                    adminModal.classList.remove('hidden');
                    adminModal.style.display = 'flex';
                }
            };
        }
    }
// --- 6. VISUALIZADOR DE CONTEÚDO (ABRIR AULA) ---
    window.openModule = function(moduleId) {
        currentModuleId = moduleId; 
        const mod = moduleContent[moduleId];
        
        const viewer = document.getElementById('content-viewer');
        const titleEl = document.getElementById('viewer-title');
        const bodyEl = document.getElementById('viewer-body');
        
        if (!viewer || !mod) {
            console.error("Erro: Visualizador ou Módulo não encontrado.");
            return;
        }

        // Define Título
        if(titleEl) titleEl.textContent = mod.title;
        
        // Renderiza Conteúdo
        if(bodyEl) {
            bodyEl.innerHTML = ''; // Limpa anterior
            
            // Verifica se é Link do Drive/Vídeo ou Texto
            if (mod.driveLink && mod.driveLink.length > 20) {
                // Modo Iframe (Drive/Youtube)
                const iframeContainer = document.createElement('div');
                iframeContainer.className = "w-full h-96 bg-black rounded-lg shadow-lg overflow-hidden mb-6";
                iframeContainer.innerHTML = `<iframe src="${mod.driveLink}" class="w-full h-full border-0" allow="autoplay; fullscreen"></iframe>`;
                bodyEl.appendChild(iframeContainer);
                
                // Adiciona texto de apoio se houver
                if (mod.content) {
                    const textDiv = document.createElement('div');
                    textDiv.className = "prose lg:prose-xl max-w-none text-gray-700";
                    textDiv.innerHTML = mod.content;
                    bodyEl.appendChild(textDiv);
                }
            } else {
                // Modo Texto Puro / HTML
                bodyEl.innerHTML = mod.content || "<div class='p-8 text-center text-gray-500'>Conteúdo em carregamento...</div>";
            }

            // --- BOTÃO DE CONCLUSÃO DENTRO DO VIEWER ---
            const footerDiv = document.createElement('div');
            footerDiv.className = "mt-10 pt-6 border-t border-gray-200 text-center pb-20"; // pb-20 para mobile
            
            // Botão grande e verde
            footerDiv.innerHTML = `
                <button onclick="markModuleAsCompleted()" class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 hover:bg-green-500 shadow-xl">
                    <span class="absolute top-0 right-0 w-5 h-5 -mt-2 -mr-2 flex">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
                    </span>
                    <i class="fas fa-check-circle mr-3 text-xl"></i> Concluir e Ir para Próximo
                </button>
            `;
            bodyEl.appendChild(footerDiv);
        }

        // Exibe o Modal (Viewer)
        viewer.classList.remove('hidden');
        viewer.classList.add('flex');
        viewer.style.display = 'flex';
        
        // Trava rolagem do fundo
        document.body.style.overflow = 'hidden';
    };

    // --- 7. FECHAR VISUALIZADOR ---
    window.closeModule = function() {
        const viewer = document.getElementById('content-viewer');
        if (viewer) {
            viewer.classList.add('hidden');
            viewer.classList.remove('flex');
            viewer.style.display = 'none';
        }
        
        // Limpa iframe para parar som de vídeos
        const bodyEl = document.getElementById('viewer-body');
        if (bodyEl) bodyEl.innerHTML = '';
        
        currentModuleId = null;
        document.body.style.overflow = 'auto'; // Destrava rolagem
    };

    // --- 8. CONCLUIR MÓDULO (A CORREÇÃO DO PULO) ---
    window.markModuleAsCompleted = function() {
        if (!currentModuleId) return;

        // 8.1. Persistência de Dados
        if (!completedModules.includes(currentModuleId)) {
            completedModules.push(currentModuleId);
            localStorage.setItem('gateBombeiroCompletedModules_v3', JSON.stringify(completedModules));
            
            // Salva na nuvem silenciosamente (sem travar tela)
            if (currentUserData) {
                saveProgressToCloud(true); 
            }
        }

        // 8.2. Atualização Visual DO CARD ATUAL (Sem recarregar a lista)
        const currentCard = document.getElementById(`module-card-${currentModuleId}`);
        if (currentCard) {
            // Remove estilos antigos
            currentCard.classList.remove('active-card', 'border-blue-500', 'bg-white');
            // Adiciona estilos de concluído
            currentCard.classList.add('completed-card', 'border-green-500', 'bg-green-50');

            // Atualiza ícone
            const iconDiv = currentCard.querySelector('.text-3xl');
            if(iconDiv) {
                iconDiv.className = 'text-3xl mr-4 text-green-500';
            }

            // Atualiza botão para "Concluído"
            const btnContainer = currentCard.querySelector('.action-wrapper');
            if(btnContainer) {
                btnContainer.innerHTML = `
                    <button class="flex items-center text-green-700 font-bold px-4 py-2 bg-green-100 rounded-full cursor-default">
                        <i class="fas fa-check-circle mr-2"></i> Concluído
                    </button>`;
            }
        }

        // 8.3. Desbloqueio e Scroll para o PRÓXIMO MÓDULO
        const allIds = Object.keys(moduleContent);
        const currentIndex = allIds.indexOf(currentModuleId);
        const nextId = allIds[currentIndex + 1];

        // Fecha o modal de aula PRIMEIRO
        closeModule();

        if (nextId) {
            const nextCard = document.getElementById(`module-card-${nextId}`);
            if (nextCard) {
                // Remove bloqueio visual
                nextCard.classList.remove('opacity-70', 'border-gray-300');
                nextCard.classList.add('active-card', 'border-blue-500');

                // Atualiza Texto de Status
                const statusText = nextCard.querySelector('p');
                if(statusText) {
                    statusText.textContent = 'Disponível';
                    statusText.className = 'text-xs text-blue-600 font-medium mt-1 uppercase tracking-wide';
                }

                // Injeta Botão que Pisca (Blinking)
                const nextBtnContainer = nextCard.querySelector('.action-wrapper');
                if(nextBtnContainer) {
                    nextBtnContainer.innerHTML = `
                        <button onclick="openModule('${nextId}')" class="blinking-button flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition">
                            <i class="fas fa-play mr-2"></i> Iniciar Aula
                        </button>`;
                }

                // 8.4. SCROLL SUAVE ATÉ O PRÓXIMO (Delay pequeno para a UI estabilizar)
                setTimeout(() => {
                    nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Efeito visual extra para destacar
                    nextCard.classList.add('ring-2', 'ring-blue-400', 'ring-offset-2');
                    setTimeout(() => nextCard.classList.remove('ring-2', 'ring-blue-400', 'ring-offset-2'), 2000);
                }, 300);
            }
        } else {
            // Fim do Curso
            alert("Parabéns! Você concluiu todo o conteúdo programático!");
            // Aqui poderia abrir o gerador de certificado
        }

        updateProgressBar();
        checkAchievements(); 
    };

    // --- 9. SISTEMA DE SALVAMENTO E TOAST (CORREÇÃO BUG 3) ---
    window.saveProgressToCloud = async function(silent = false) {
        if (!currentUserData) {
            if(!silent) showToast("Erro: Você não está logado.", "error");
            return;
        }

        // Feedback Visual no botão de salvar manual
        const saveBtn = document.getElementById('save-progress-btn');
        if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sincronizando...';
        }

        try {
            const db = window.__fbDB || window.fbDB;
            
            // Cria Payload leve
            const payload = {
                completedModules: completedModules,
                last_update: new Date().toISOString(),
                last_module: currentModuleId || 'none'
            };

            await db.collection('users').doc(currentUserData.uid).update(payload);

            if (!silent) showToast('Progresso salvo na nuvem com sucesso!');
        } catch (error) {
            console.error("Erro no Cloud Save:", error);
            if (!silent) showToast('Falha ao salvar. Verifique sua conexão.', 'error');
        } finally {
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-cloud-upload-alt mr-2"></i> Salvar Progresso na Nuvem';
            }
        }
    };

    // Função Toast Robusta (Fecha sozinha corretamente)
    window.showToast = function(message, type = 'success') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        const bgClass = type === 'success' ? 'bg-green-600' : 'bg-red-600';
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        
        toast.className = `${bgClass} text-white px-6 py-4 rounded-lg shadow-2xl mb-3 flex items-center transition-all duration-500 transform translate-y-4 opacity-0`;
        toast.style.minWidth = "300px";
        toast.style.zIndex = "99999"; // Garante que flutue sobre tudo

        toast.innerHTML = `
            <i class="fas ${iconClass} text-2xl mr-4"></i>
            <div>
                <h4 class="font-bold text-sm uppercase tracking-wider">${type === 'success' ? 'Sucesso' : 'Atenção'}</h4>
                <p class="text-sm font-medium">${message}</p>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Entrada
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
        });

        // Saída Automática (3 segundos)
        setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            // Remove do DOM após transição CSS
            setTimeout(() => {
                if (toast.parentElement) toast.remove();
            }, 600);
        }, 3500);
    };
// --- 10. SISTEMA DE CONQUISTAS (MEDALHAS) ---
    window.checkAchievements = function() {
        const medalsContainer = document.getElementById('medals-container');
        if (!medalsContainer) return;

        medalsContainer.innerHTML = ''; // Limpa para renderizar estado atual
        
        // Definição das Regras das Medalhas (Baseado nos Ranges do data.js)
        const achievements = [
            { id: 'start', title: 'Primeiro Passo', desc: 'Concluiu o 1º Módulo', icon: 'fa-shoe-prints', color: 'text-blue-500', condition: () => completedModules.length >= 1 },
            { id: 'bronze', title: 'Dedicação Bronze', desc: 'Concluiu 5 Módulos', icon: 'fa-medal', color: 'text-yellow-700', condition: () => completedModules.length >= 5 },
            { id: 'silver', title: 'Dedicação Prata', desc: 'Concluiu 15 Módulos', icon: 'fa-medal', color: 'text-gray-400', condition: () => completedModules.length >= 15 },
            { id: 'gold', title: 'Dedicação Ouro', desc: 'Concluiu 30 Módulos', icon: 'fa-medal', color: 'text-yellow-400', condition: () => completedModules.length >= 30 },
            
            // Medalhas Específicas por Matéria (Baseado no data.js)
            { id: 'fire_master', title: 'Mestre do Fogo', desc: 'Dominou Combate a Incêndio', icon: 'fa-fire', color: 'text-red-600', condition: () => completedModules.includes('module25') },
            { id: 'aph_master', title: 'Socorrista', desc: 'Dominou APH', icon: 'fa-user-nurse', color: 'text-green-600', condition: () => completedModules.includes('module40') },
            { id: 'height_master', title: 'Mestre do Ar', desc: 'Dominou Altura (NR35)', icon: 'fa-wind', color: 'text-sky-500', condition: () => completedModules.includes('module52') },
            
            // Medalha Suprema
            { id: 'legend', title: 'Lenda da Brigada', desc: 'Concluiu TUDO!', icon: 'fa-crown', color: 'text-purple-600', condition: () => completedModules.length >= Object.keys(moduleContent).length && Object.keys(moduleContent).length > 0 }
        ];

        achievements.forEach(ach => {
            const unlocked = ach.condition();
            
            // Verifica se é uma nova conquista para notificar
            if (unlocked && !notifiedAchievements.includes(ach.id)) {
                showToast(`Nova Conquista: ${ach.title}!`, 'success');
                // Efeito sonoro simples (opcional)
                // const audio = new Audio('assets/sounds/achievement.mp3'); audio.play().catch(()=>{});
                
                notifiedAchievements.push(ach.id);
                localStorage.setItem('gateBombeiroNotifiedAchievements_v3', JSON.stringify(notifiedAchievements));
            }

            // Cria Elemento Visual da Medalha
            const medalDiv = document.createElement('div');
            // Se bloqueada: cinza e transparente. Se desbloqueada: colorida e animada no hover.
            const styleClass = unlocked 
                ? 'opacity-100 transform hover:scale-110 transition-transform cursor-pointer' 
                : 'opacity-30 grayscale filter cursor-not-allowed';
                
            medalDiv.className = `flex flex-col items-center p-2 m-1 ${styleClass}`;
            medalDiv.title = unlocked ? ach.desc : 'Bloqueado'; // Tooltip

            medalDiv.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-md mb-1 border-2 ${unlocked ? 'border-yellow-400' : 'border-gray-300'}">
                    <i class="fas ${ach.icon} text-2xl ${unlocked ? ach.color : 'text-gray-400'}"></i>
                </div>
                <span class="text-[10px] uppercase font-bold text-center leading-tight ${unlocked ? 'text-gray-800' : 'text-gray-400'}">
                    ${ach.title}
                </span>
            `;
            medalsContainer.appendChild(medalDiv);
        });
    };

    // --- 11. MOTOR DE SIMULADOS (QUIZ) ---
    window.openSimulado = function(moduleId) {
        // Verifica se o arquivo quizzes.js carregou
        if (typeof QUIZ_DATA === 'undefined') {
            showToast("Banco de questões carregando...", "error");
            return;
        }

        // Busca questões do módulo
        const questions = QUIZ_DATA[moduleId];
        if (!questions || questions.length === 0) {
            showToast('Simulado indisponível para este módulo.', 'error');
            return;
        }

        // Setup Inicial do Simulado
        activeSimuladoQuestions = [...questions]; // Copia para não alterar original
        // Embaralha as questões para dificultar cola
        activeSimuladoQuestions.sort(() => Math.random() - 0.5);
        
        userAnswers = {}; 
        currentSimuladoQuestionIndex = 0;
        simuladoTimeLeft = 10 * 60; // 10 minutos em segundos
        
        // Abre Viewer em Modo Simulado
        const viewer = document.getElementById('content-viewer');
        const titleEl = document.getElementById('viewer-title');
        const bodyEl = document.getElementById('viewer-body');

        if(titleEl) titleEl.textContent = 'Simulado Prático - Valendo Nota';
        if(viewer) {
            viewer.classList.remove('hidden');
            viewer.style.display = 'flex';
        }

        renderSimuladoInterface(bodyEl);
        startSimuladoTimer();
    };

    function startSimuladoTimer() {
        if (simuladoTimerInterval) clearInterval(simuladoTimerInterval);
        
        simuladoTimerInterval = setInterval(() => {
            simuladoTimeLeft--;
            
            // Atualiza display do timer se existir na tela
            const timerEl = document.getElementById('simulado-timer-display');
            if (timerEl) {
                const m = Math.floor(simuladoTimeLeft / 60).toString().padStart(2, '0');
                const s = (simuladoTimeLeft % 60).toString().padStart(2, '0');
                timerEl.textContent = `${m}:${s}`;
                
                // Alerta visual quando falta 1 minuto
                if(simuladoTimeLeft < 60) {
                    timerEl.classList.add('text-red-600', 'animate-pulse');
                    timerEl.classList.remove('text-gray-700');
                }
            }

            // Tempo Esgotado
            if (simuladoTimeLeft <= 0) {
                clearInterval(simuladoTimerInterval);
                alert("Tempo Esgotado! O simulado será encerrado.");
                finishSimulado();
            }
        }, 1000);
    }

    function renderSimuladoInterface(container) {
        if(!container) return;
        
        const q = activeSimuladoQuestions[currentSimuladoQuestionIndex];
        const total = activeSimuladoQuestions.length;
        const current = currentSimuladoQuestionIndex + 1;
        
        // Renderiza HTML da Questão
        container.innerHTML = `
            <div class="w-full max-w-2xl mx-auto bg-white p-1 rounded">
                <div class="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
                    <div>
                        <span class="text-sm font-bold text-gray-500 uppercase">Questão</span>
                        <span class="text-2xl font-black text-blue-900">${current}/${total}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-stopwatch text-xl mr-2 text-gray-400"></i>
                        <span id="simulado-timer-display" class="font-mono text-xl font-bold text-gray-700">10:00</span>
                    </div>
                </div>

                <div class="mb-8">
                    <p class="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">${q.question}</p>
                </div>

                <div class="space-y-4 mb-8">
                    ${Object.entries(q.options).map(([key, text]) => `
                        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-300 ${userAnswers[currentSimuladoQuestionIndex] === key ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200'}">
                            <input type="radio" name="simulado_opt" value="${key}" 
                                class="mt-1 mr-4 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                ${userAnswers[currentSimuladoQuestionIndex] === key ? 'checked' : ''}>
                            <span class="text-gray-700 text-base select-none">${text}</span>
                        </label>
                    `).join('')}
                </div>

                <div class="flex justify-between pt-4 border-t mt-4">
                    <button onclick="prevSimuladoQuestion()" 
                        class="px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-200 transition ${currentSimuladoQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}" 
                        ${currentSimuladoQuestionIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left mr-2"></i> Anterior
                    </button>
                    
                    ${current === total 
                      ? `<button onclick="finishSimulado()" class="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg transform hover:scale-105 transition flex items-center"><i class="fas fa-check-circle mr-2"></i> Finalizar Prova</button>`
                      : `<button onclick="nextSimuladoQuestion()" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow transition flex items-center">Próxima <i class="fas fa-arrow-right ml-2"></i></button>`
                    }
                </div>
            </div>
        `;
        
        // Listener para salvar resposta instantaneamente
        const inputs = container.querySelectorAll('input[name="simulado_opt"]');
        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                userAnswers[currentSimuladoQuestionIndex] = e.target.value;
                // Atualiza visualmente para marcar a borda azul
                renderSimuladoInterface(container); 
            });
        });
        
        // Scroll para o topo da questão
        container.scrollTop = 0;
    }

    window.prevSimuladoQuestion = function() {
        if (currentSimuladoQuestionIndex > 0) {
            currentSimuladoQuestionIndex--;
            renderSimuladoInterface(document.getElementById('viewer-body'));
        }
    };

    window.nextSimuladoQuestion = function() {
        if (currentSimuladoQuestionIndex < activeSimuladoQuestions.length - 1) {
            currentSimuladoQuestionIndex++;
            renderSimuladoInterface(document.getElementById('viewer-body'));
        }
    };

    window.finishSimulado = function() {
        clearInterval(simuladoTimerInterval);
        
        let score = 0;
        const total = activeSimuladoQuestions.length;
        
        activeSimuladoQuestions.forEach((q, index) => {
            if (userAnswers[index] === q.answer) score++;
        });

        const percentage = Math.round((score / total) * 100);
        const passed = percentage >= 70;
        
        // Tela de Resultados
        const bodyEl = document.getElementById('viewer-body');
        if(bodyEl) {
            bodyEl.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
                    <div class="mb-6">
                        ${passed 
                            ? '<div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto"><i class="fas fa-trophy text-5xl text-green-600"></i></div>'
                            : '<div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto"><i class="fas fa-times text-5xl text-red-600"></i></div>'
                        }
                        <h2 class="text-3xl font-black ${passed ? 'text-green-700' : 'text-red-700'} mb-2">
                            ${passed ? 'APROVADO!' : 'REPROVADO'}
                        </h2>
                        <p class="text-gray-600 text-lg">Você acertou <span class="font-bold text-gray-900">${score}</span> de ${total} questões.</p>
                    </div>

                    <div class="relative w-full max-w-xs h-6 bg-gray-200 rounded-full overflow-hidden mb-8">
                        <div class="absolute top-0 left-0 h-full ${passed ? 'bg-green-500' : 'bg-red-500'} transition-all duration-1000" style="width: ${percentage}%"></div>
                    </div>
                    <span class="text-4xl font-bold mb-8 block">${percentage}%</span>

                    <button onclick="closeModule()" class="bg-gray-800 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-gray-700 transition w-full max-w-xs">
                        Fechar Simulado
                    </button>
                    
                    ${!passed ? `<p class="mt-4 text-sm text-gray-500">Revise o conteúdo e tente novamente.</p>` : ''}
                </div>
            `;
        }
    };

    // --- 12. MODO SOBREVIVÊNCIA (QUIZ INFINITO) ---
    window.openSurvivalMode = function() {
        if (typeof QUIZ_DATA === 'undefined') { showToast("Erro ao carregar perguntas.", "error"); return; }
        
        // Coleta TODAS as perguntas de todos os módulos
        survivalQuestions = [];
        Object.values(QUIZ_DATA).forEach(qs => {
            survivalQuestions = [...survivalQuestions, ...qs];
        });
        
        if (survivalQuestions.length === 0) { showToast("Sem perguntas disponíveis.", "error"); return; }

        // Reseta estado
        survivalQuestions.sort(() => Math.random() - 0.5);
        survivalLives = 3;
        survivalScore = 0;
        currentSurvivalIndex = 0;

        // UI
        const viewer = document.getElementById('content-viewer');
        const titleEl = document.getElementById('viewer-title');
        
        if(titleEl) titleEl.textContent = 'Modo Sobrevivência 💀';
        if(viewer) {
            viewer.classList.remove('hidden');
            viewer.style.display = 'flex';
        }

        renderSurvivalQuestion();
    };

    function renderSurvivalQuestion() {
        const bodyEl = document.getElementById('viewer-body');
        if (!bodyEl) return;

        // Verifica Fim de Jogo
        if (survivalLives <= 0) {
            endSurvivalGame(bodyEl);
            return;
        }

        // Loop Infinito (Recicla perguntas)
        if (currentSurvivalIndex >= survivalQuestions.length) {
            survivalQuestions.sort(() => Math.random() - 0.5);
            currentSurvivalIndex = 0;
        }

        const q = survivalQuestions[currentSurvivalIndex];

        // Gera Corações de Vida
        let heartsHtml = '';
        for(let i=0; i<3; i++) {
            heartsHtml += `<i class="fas fa-heart ${i < survivalLives ? 'text-red-600 animate-pulse' : 'text-gray-300'} text-2xl mx-1"></i>`;
        }

        bodyEl.innerHTML = `
            <div class="max-w-2xl mx-auto">
                <div class="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-lg shadow-inner">
                    <div class="flex flex-col">
                        <span class="text-xs font-bold text-gray-500 uppercase">Pontuação</span>
                        <span class="text-2xl font-black text-blue-600">${survivalScore}</span>
                    </div>
                    <div class="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
                        ${heartsHtml}
                    </div>
                </div>
                
                <div class="animate-slide-in">
                    <p class="text-xl font-bold text-gray-800 mb-6 text-center leading-snug">${q.question}</p>
                    
                    <div class="grid grid-cols-1 gap-4">
                        ${Object.entries(q.options).map(([key, text]) => `
                            <button onclick="checkSurvivalAnswer('${key}', '${q.answer}')" 
                                class="survival-option w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group relative overflow-hidden">
                                <span class="relative z-10 flex items-center">
                                    <span class="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center mr-3 group-hover:bg-purple-200 group-hover:text-purple-700 transition">${key.toUpperCase()}</span>
                                    <span class="font-medium text-gray-700 group-hover:text-gray-900">${text}</span>
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    window.checkSurvivalAnswer = function(selected, correct) {
        if (selected === correct) {
            // Resposta Correta
            survivalScore += 10;
            showToast('+10 Pontos! Continue assim!', 'success');
            currentSurvivalIndex++;
            renderSurvivalQuestion();
        } else {
            // Resposta Errada
            survivalLives--;
            // Vibração (Mobile)
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            
            showToast('Errado! Você perdeu uma vida.', 'error');
            
            if (survivalLives <= 0) {
                renderSurvivalQuestion(); // Trigger Game Over
            } else {
                currentSurvivalIndex++;
                renderSurvivalQuestion();
            }
        }
    };

    function endSurvivalGame(container) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-6 animate-bounce-in">
                <div class="mb-6 relative">
                    <i class="fas fa-skull-crossbones text-6xl text-gray-800 absolute top-0 left-0 w-full h-full opacity-20 animate-ping"></i>
                    <i class="fas fa-skull-crossbones text-7xl text-gray-800 relative z-10"></i>
                </div>
                
                <h2 class="text-4xl font-black text-red-600 mb-2 uppercase tracking-tighter">Game Over</h2>
                <p class="text-gray-500 mb-8">Suas vidas acabaram.</p>
                
                <div class="bg-gray-100 p-6 rounded-xl mb-8 w-full max-w-xs">
                    <span class="text-sm text-gray-500 font-bold uppercase block mb-1">Pontuação Final</span>
                    <span class="text-5xl font-black text-blue-900">${survivalScore}</span>
                </div>
                
                <div class="space-y-3 w-full max-w-xs">
                    <button onclick="openSurvivalMode()" class="w-full bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-500 transition transform hover:-translate-y-1">
                        <i class="fas fa-redo mr-2"></i> Tentar Novamente
                    </button>
                    <button onclick="closeModule()" class="w-full bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition">
                        Sair
                    </button>
                </div>
            </div>
        `;
    }
// --- 13. PAINEL GESTOR (CORREÇÃO DO BUG 1) ---
    // Antes não funcionava porque a função não estava definida globalmente.
    window.openManagerPanel = async function() {
        // 1. Verificação de Segurança
        if (!currentUserData || (!currentUserData.isManager && !currentUserData.isAdmin)) {
            showToast("Acesso Negado: Área restrita a Gestores.", "error");
            return;
        }

        const managerModal = document.getElementById('manager-modal');
        const overlay = document.getElementById('name-modal-overlay') || document.getElementById('manager-overlay');
        const tbody = document.getElementById('manager-table-body');

        if (!managerModal) {
            console.error("Erro: Modal do Gestor não encontrado no HTML.");
            showToast("Erro interno: Interface do gestor indisponível.", "error");
            return;
        }

        // 2. Exibe a Interface
        managerModal.classList.remove('hidden');
        managerModal.classList.add('show'); 
        managerModal.style.display = 'flex';
        managerModal.style.zIndex = '20001'; // Garante topo
        
        if(overlay) {
            overlay.classList.remove('hidden');
            overlay.classList.add('show');
            overlay.style.display = 'block';
            overlay.style.zIndex = '20000';
        }

        // 3. Carregamento de Dados (Firebase)
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="p-8 text-center text-gray-500">
                        <i class="fas fa-circle-notch fa-spin text-3xl mb-3 text-blue-600"></i><br>
                        Carregando dados da sua equipe...
                    </td>
                </tr>
            `;
            
            try {
                const db = window.__fbDB || window.fbDB;
                if (!db) throw new Error("Banco de dados desconectado.");

                // Query: Busca usuários onde 'company' é igual à empresa do gestor
                // Nota: Certifique-se que os usuários têm o campo 'company' preenchido no Firestore
                const companyTarget = currentUserData.company || 'Indefinida';
                
                let query = db.collection('users');
                
                // Se for Admin, vê todos. Se for Gestor, vê apenas da empresa.
                if (!currentUserData.isAdmin) {
                    query = query.where('company', '==', companyTarget);
                } else {
                    // Admin vê os últimos 50 registrados para não travar
                    query = query.orderBy('created_at', 'desc').limit(50);
                }

                const snapshot = await query.get();

                tbody.innerHTML = ''; // Limpa loading

                if (snapshot.empty) {
                    tbody.innerHTML = `
                        <tr>
                            <td colspan="5" class="p-8 text-center text-gray-500 bg-gray-50 rounded-lg">
                                <i class="fas fa-users-slash text-4xl mb-2"></i><br>
                                Nenhum aluno encontrado para a empresa: <b>${companyTarget}</b>
                            </td>
                        </tr>
                    `;
                    return;
                }

                // 4. Renderiza Tabela
                snapshot.forEach(doc => {
                    const u = doc.data();
                    const totalMods = Object.keys(moduleContent).length || 50; // Total estimado
                    const completedCount = u.completedModules ? u.completedModules.length : 0;
                    const progressPercent = Math.round((completedCount / totalMods) * 100);
                    const lastAccess = u.last_access ? new Date(u.last_access).toLocaleDateString('pt-BR') + ' ' + new Date(u.last_access).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : 'Nunca';
                    
                    // Definição de Status (Baseado na validade ou progresso)
                    let statusBadge = '<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Ativo</span>';
                    if (u.acesso_ate && new Date(u.acesso_ate) < new Date()) {
                        statusBadge = '<span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">Expirado</span>';
                    }

                    const row = document.createElement('tr');
                    row.className = "border-b border-gray-100 hover:bg-blue-50 transition duration-150";
                    
                    row.innerHTML = `
                        <td class="p-4">
                            <div class="flex items-center">
                                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 text-xs">
                                    ${u.name ? u.name.charAt(0).toUpperCase() : '?'}
                                </div>
                                <div>
                                    <div class="font-bold text-gray-800 text-sm">${u.name || 'Sem Nome'}</div>
                                    <div class="text-xs text-gray-500">${u.email}</div>
                                </div>
                            </div>
                        </td>
                        <td class="p-4 text-center">
                            <div class="flex flex-col items-center">
                                <span class="text-xs font-bold text-blue-600 mb-1">${progressPercent}%</span>
                                <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden w-16">
                                    <div class="h-full bg-blue-500" style="width: ${progressPercent}%"></div>
                                </div>
                                <span class="text-[10px] text-gray-400 mt-1">${completedCount}/${totalMods} Módulos</span>
                            </div>
                        </td>
                        <td class="p-4 text-center text-xs text-gray-600 font-mono">
                            ${lastAccess}
                        </td>
                        <td class="p-4 text-center">
                            ${statusBadge}
                        </td>
                        <td class="p-4 text-center">
                            <button onclick="alert('Funcionalidade de Detalhes em desenvolvimento')" class="text-gray-400 hover:text-blue-600 transition p-2 rounded-full hover:bg-blue-100" title="Ver Detalhes">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });

            } catch (err) {
                console.error("Erro no painel gestor:", err);
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="p-4 text-center text-red-500 bg-red-50">
                            <i class="fas fa-exclamation-triangle mr-2"></i> Erro ao carregar dados. Tente recarregar a página.
                        </td>
                    </tr>
                `;
            }
        }
    };

    // Função para FECHAR o painel gestor
    window.closeManagerPanel = function() {
        const managerModal = document.getElementById('manager-modal');
        const overlay = document.getElementById('name-modal-overlay') || document.getElementById('manager-overlay');
        
        if(managerModal) {
            managerModal.classList.remove('show');
            managerModal.classList.add('hidden');
            managerModal.style.display = 'none';
        }
        
        // Verifica se o Admin também está aberto para não fechar o overlay indevidamente
        const adminModal = document.getElementById('admin-modal');
        const isAdminOpen = adminModal && adminModal.style.display !== 'none' && !adminModal.classList.contains('hidden');
        
        if(overlay && !isAdminOpen) {
            overlay.classList.remove('show');
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
    };

    // --- 14. PAINEL ADMINISTRATIVO (LÓGICA BÁSICA) ---
    // Apenas controle de exibição, já que o admin tem acesso direto ao Firebase Console geralmente
    window.openAdminPanel = function() {
        const adminModal = document.getElementById('admin-modal');
        const overlay = document.getElementById('name-modal-overlay');
        
        if (adminModal) {
            adminModal.classList.remove('hidden');
            adminModal.classList.add('show');
            adminModal.style.display = 'flex';
        }
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'block';
        }
    };

    window.closeAdminPanel = function() {
        const adminModal = document.getElementById('admin-modal');
        const overlay = document.getElementById('name-modal-overlay');
        
        if (adminModal) {
            adminModal.classList.add('hidden');
            adminModal.style.display = 'none';
        }
        
        // Verifica se Gestor está aberto
        const managerModal = document.getElementById('manager-modal');
        const isManagerOpen = managerModal && managerModal.style.display !== 'none' && !managerModal.classList.contains('hidden');

        if (overlay && !isManagerOpen) {
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
    };
// --- 15. FUNÇÃO DE LOGOUT (SAIR COM SEGURANÇA) ---
    window.logout = function(force = false) {
        if (!force && !confirm("Tem certeza que deseja sair do sistema?")) return;

        // 1. Limpa dados de sessão locais críticos
        localStorage.removeItem('my_session_id'); // Remove ID da sessão única
        // NÃO removemos 'completedModules' para garantir que o progresso offline não se perca 
        // antes de sincronizar na próxima vez, mas limpamos as variáveis de memória.
        
        currentUserData = null;
        
        // 2. Feedback Visual
        const contentArea = document.getElementById('content-area');
        if(contentArea) {
            contentArea.innerHTML = `
                <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                    <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
                    <p>Encerrando sessão segura...</p>
                </div>
            `;
        }

        // 3. Logout do Firebase
        const performSignOut = () => {
            if (window.FirebaseCourse && window.FirebaseCourse.signOutUser) {
                window.FirebaseCourse.signOutUser();
            } else if (window.__fbAuth) {
                window.__fbAuth.signOut().then(() => {
                    window.location.reload();
                }).catch(err => {
                    console.error("Erro ao sair:", err);
                    window.location.reload();
                });
            } else {
                window.location.reload();
            }
        };

        // Pequeno delay para garantir que UX seja fluida
        setTimeout(performSignOut, 500);
    };

    // --- 16. FERRAMENTAS DE DEPURAÇÃO (RESET) ---
    // Útil se o aluno travar ou o cache corromper.
    // Pode ser chamado via console ou botão oculto.
    window.clearLocalData = function() {
        if(!confirm("⚠️ ATENÇÃO: Isso limpará o cache local do seu navegador.\nSeu progresso salvo na nuvem NÃO será perdido, mas você precisará logar novamente.\n\nDeseja continuar?")) return;
        
        // Lista de chaves usadas pelo App
        const keysToRemove = [
            'gateBombeiroCompletedModules_v3',
            'gateBombeiroNotifiedAchievements_v3',
            'my_session_id',
            'last_known_version'
        ];
        
        keysToRemove.forEach(k => localStorage.removeItem(k));
        
        alert("Cache limpo com sucesso. O sistema será reiniciado.");
        window.location.reload();
    };

    // --- 17. PREVENÇÃO DE SCROLL INFINITO (FIX VISUAL) ---
    // Garante que modais não quebrem o layout em mobile
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // --- 18. INICIALIZAÇÃO FINAL ---
    // Chama a função principal definida na Parte 1 para dar a partida no motor.
    init();

}); // <--- FECHAMENTO FINAL DO EVENT LISTENER 'DOMContentLoaded'
