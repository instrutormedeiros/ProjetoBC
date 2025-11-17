/* ============================================================
   APP.JS — Projeto Bravo Charlie
   Versão corrigida — SEM proteções, compatível com LOGIN.JS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       1. VERIFICAÇÃO DE DATA.JS
       ============================ */
    if (
        typeof moduleContent === "undefined" ||
        typeof moduleCategories === "undefined" ||
        typeof questionSources === "undefined"
    ) {
        const contentArea = document.getElementById("content-area");
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="text-center py-10 px-6">
                    <div class="inline-block p-5 bg-red-100 dark:bg-red-900/50 rounded-full mb-6 floating">
                        <i class="fas fa-exclamation-triangle text-6xl text-red-600"></i>
                    </div>
                    <h2 class="text-3xl font-bold mb-4 text-red-700 dark:text-red-300">
                        Erro ao carregar data.js
                    </h2>
                    <p class="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8">
                        O arquivo data.js está ausente ou corrompido.
                    </p>
                </div>
            `;
        }
        console.error("data.js ausente.");
        return;
    }

    /* ============================
       2. VARIÁVEIS GLOBAIS
       ============================ */
    const totalModules = Object.keys(moduleContent).length;
    let completedModules = JSON.parse(localStorage.getItem("pbc_completed")) || [];
    let notifiedAchievements = JSON.parse(localStorage.getItem("pbc_notified")) || [];
    let currentModuleId = null;
    let cachedQuestionBanks = {};

    /* ============================
       3. SELETORES
       ============================ */
    const contentArea = document.getElementById("content-area");
    const loadingSpinner = document.getElementById("loading-spinner");
    const breadcrumbContainer = document.getElementById("breadcrumb-container");

    /* ============================
       4. FUNÇÃO PRINCIPAL
       ============================ */
    function init() {
        loadTheme();
        updateProgressBar();
        setupModuleLists();
        setupEvents();
        loadInitialPage();
    }

    window.initCourse = init;

    /* ============================
       5. TELA INICIAL
       ============================ */
    function loadInitialPage() {
        const lastModule = localStorage.getItem("pbc_lastModule");

        if (lastModule) {
            loadModule(lastModule);
        } else {
            goHome();
        }
    }

    function goHome() {
        contentArea.innerHTML = `
            <div class="text-center py-8">
                <div class="floating inline-block p-5 bg-red-100 dark:bg-red-900/50 rounded-full mb-6">
                    <i class="fas fa-fire-extinguisher text-6xl text-red-600"></i>
                </div>
                <h2 class="text-4xl font-bold mb-4 text-blue-900 dark:text-white">
                    Formação Profissional de Elite
                </h2>
                <button id="start-course" class="action-button pulse text-lg">
                    <i class="fas fa-play-circle mr-2"></i> Iniciar Curso
                </button>
            </div>
        `;

        document.getElementById("start-course").onclick = () => loadModule("module1");

        updateBreadcrumbs(null);
    }

    /* ============================
       6. CARREGAR MÓDULO
       ============================ */
    async function loadModule(id) {
        if (!moduleContent[id]) return;

        currentModuleId = id;
        localStorage.setItem("pbc_lastModule", id);

        const moduleData = moduleContent[id];

        loadingSpinner.classList.remove("hidden");
        contentArea.classList.add("hidden");

        let questions = await loadQuestions(id);

        setTimeout(() => {
            renderModulePage(id, moduleData, questions);
        }, 300);
    }

    function renderModulePage(id, moduleData, questions) {
        loadingSpinner.classList.add("hidden");
        contentArea.classList.remove("hidden");

        let html = `
            <h3 class="text-3xl mb-6 pb-4 border-b flex items-center">
                <i class="${moduleData.iconClass} mr-4 text-orange-500"></i>
                ${moduleData.title}
            </h3>
            <div>${moduleData.content}</div>
        `;

        if (questions && questions.length) {
            const shown = shuffle(questions).slice(0, 4);

            html += `<hr><h3 class="text-xl font-bold mt-8 mb-4">Exercícios</h3>`;

            shown.forEach((q, i) => {
                html += `
                    <div class="quiz-block">
                        <p class="font-semibold mb-2">${i + 1}. ${q.question}</p>
                        <div class="quiz-options-group">
                `;
                for (const key in q.options) {
                    html += `
                        <div class="quiz-option" data-module="${id}" data-question="${q.id}" data-answer="${key}">
                            <strong>${key.toUpperCase()})</strong> ${q.options[key]}
                        </div>
                    `;
                }
                html += `
                        </div>
                        <div id="feedback-${q.id}" class="hidden mt-2"></div>
                    </div>
                `;
            });
        }

        html += `
            <div class="mt-10 pt-6 border-t">
                <button class="action-button conclude-button" data-module="${id}">
                    Concluir módulo
                </button>
            </div>
        `;

        contentArea.innerHTML = html;

        setupQuizListeners();
        setupConcludeListener();
        updateBreadcrumbs(moduleData.title);
    }

    /* ============================
       7. QUIZ
       ============================ */
    async function loadQuestions(moduleId) {
        if (cachedQuestionBanks[moduleId]) return cachedQuestionBanks[moduleId];

        const file = questionSources[moduleId];
        if (!file) return null;

        return new Promise(resolve => {
            const script = document.createElement("script");
            script.src = file;

            script.onload = () => {
                if (window.questionBank && window.questionBank[moduleId]) {
                    cachedQuestionBanks[moduleId] = window.questionBank[moduleId];
                    delete window.questionBank;
                    resolve(cachedQuestionBanks[moduleId]);
                } else resolve(null);
            };

            script.onerror = () => resolve(null);

            document.body.appendChild(script);
        });
    }

    function setupQuizListeners() {
        document.querySelectorAll(".quiz-option").forEach(opt => {
            opt.addEventListener("click", e => {
                const o = e.currentTarget;
                const moduleId = o.dataset.module;
                const qid = o.dataset.question;
                const answer = o.dataset.answer;

                const question = cachedQuestionBanks[moduleId].find(q => q.id === qid);
                const correct = question.answer;

                const feedback = document.getElementById(`feedback-${qid}`);
                const group = o.closest(".quiz-options-group");

                group.querySelectorAll(".quiz-option").forEach(x => {
                    x.classList.remove("correct", "incorrect");
                    x.classList.add("disabled");
                });

                if (answer === correct) {
                    o.classList.add("correct");
                    feedback.classList.remove("hidden");
                    feedback.innerHTML = `<span class="text-green-600 font-bold">Correto!</span> ${question.explanation}`;
                } else {
                    o.classList.add("incorrect");
                    group.querySelector(`.quiz-option[data-answer="${correct}"]`).classList.add("correct");
                    feedback.classList.remove("hidden");
                    feedback.innerHTML = `<span class="text-red-600 font-bold">Incorreto.</span> ${question.explanation}`;
                }
            });
        });
    }

    /* ============================
       8. CONCLUIR MÓDULO
       ============================ */
    function setupConcludeListener() {
        document.querySelector(".conclude-button").onclick = e => {
            const id = e.target.dataset.module;

            if (!completedModules.includes(id)) {
                completedModules.push(id);
                localStorage.setItem("pbc_completed", JSON.stringify(completedModules));
            }

            e.target.disabled = true;
            e.target.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Concluído`;

            updateProgressBar();
        };
    }

    /* ============================
       9. BREADCRUMBS
       ============================ */
    function updateBreadcrumbs(title) {
        if (!title) {
            breadcrumbContainer.innerHTML = `<i class="fas fa-home"></i> Início`;
            return;
        }
        breadcrumbContainer.innerHTML = `
            <i class="fas fa-home"></i> Início
            <span class="mx-2">/</span>
            <span class="text-orange-500">${title}</span>
        `;
    }

    /* ============================
       10. LISTAGEM DE MÓDULOS
       ============================ */
    function setupModuleLists() {
        const containers = [
            document.getElementById("desktop-module-container"),
            document.getElementById("mobile-module-container")
        ];

        containers.forEach(c => {
            if (!c) return;
            c.innerHTML = "";

            for (const k in moduleCategories) {
                const cat = moduleCategories[k];
                const div = document.createElement("div");

                let html = `
                    <button class="accordion-button">
                        <span><i class="${cat.icon} w-6 mr-2"></i>${cat.title}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="accordion-panel">
                `;

                for (let i = cat.range[0]; i <= cat.range[1]; i++) {
                    const id = `module${i}`;
                    if (!moduleContent[id]) continue;

                    html += `
                        <div class="module-list-item ${completedModules.includes(id) ? "completed" : ""}"
                             data-module="${id}">
                            <i class="${moduleContent[id].iconClass}"></i>
                            <span>${moduleContent[id].title}</span>
                        </div>
                    `;
                }

                html += `</div>`;
                div.innerHTML = html;
                c.appendChild(div);
            }
        });
    }

    /* ============================
       11. EVENTOS GERAIS
       ============================ */
    function setupEvents() {

        document.body.addEventListener("click", e => {
            const item = e.target.closest(".module-list-item");
            if (item) {
                loadModule(item.dataset.module);
            }

            const acc = e.target.closest(".accordion-button");
            if (acc) {
                const panel = acc.nextElementSibling;
                const open = acc.classList.contains("active");

                document.querySelectorAll(".accordion-button").forEach(b => {
                    b.classList.remove("active");
                    b.nextElementSibling.style.maxHeight = null;
                });

                if (!open) {
                    acc.classList.add("active");
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        });
    }

    /* ============================
       12. PROGRESSO
       ============================ */
    function updateProgressBar() {
        const pct = (completedModules.length / totalModules) * 100;
        document.getElementById("progress-text").textContent = `${pct.toFixed(0)}%`;
        document.getElementById("completed-modules-count").textContent = completedModules.length;
        document.getElementById("progress-bar-minimal").style.width = `${pct}%`;
    }

    /* ============================
       13. UTILIDADES
       ============================ */
    function shuffle(arr) {
        return arr.map(v => [Math.random(), v]).sort().map(x => x[1]);
    }

    function loadTheme() {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark");
        }
    }

    /* ============================
       14. INICIAR
       ============================ */
    init();
});
