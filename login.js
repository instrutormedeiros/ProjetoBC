/* ============================
   LOGIN.JS – Projeto Bravo Charlie
   Acesso por Nome + Email + 30 dias grátis
   Integração com Google Apps Script
   ============================ */

const API_URL = "https://script.google.com/macros/s/AKfycbzbnB7HLTEzClwotviGMsFtZI02D30kqptFFENz1kJ1MsIm4Gq6juhN9xvMWGuapQb4kA/exec";

/* Carrega dados salvos localmente */
function getLocalUser() {
    try {
        return JSON.parse(localStorage.getItem("pbc_user")) || null;
    } catch {
        return null;
    }
}

/* Salva dados localmente */
function saveLocalUser(user) {
    localStorage.setItem("pbc_user", JSON.stringify(user));
}

/* Esconde overlay */
function hideOverlay() {
    const ov = document.getElementById("access-overlay");
    if (ov) {
        ov.style.display = "none";
        ov.classList.add("hidden");
    }
}

/* Mostra overlay */
function showOverlay() {
    const ov = document.getElementById("access-overlay");
    if (ov) {
        ov.style.display = "flex";
        ov.classList.remove("hidden");
    }
}

/* ============================
   1) REGISTRAR NOVO ALUNO
   ============================ */
async function registerUser(name, email) {
    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "register",
            name,
            email
        }),
        redirect: "follow"
    });

    const data = await res.json();
    return data;
}

/* ============================
   2) LOGIN
   ============================ */
async function loginUser(email) {
    const res = await fetch(API_URL + "?action=login&email=" + encodeURIComponent(email));
    const data = await res.json();
    return data;
}

/* ============================
   3) VALIDAR ACESSO
   ============================ */
function hasAccess(user) {
    if (!user) return false;

    if (user.premium === true) return true;

    // Trial de 30 dias
    const now = Date.now();
    const since = Number(user.createdAt || 0);
    const diff = now - since;

    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 30;
}

/* ============================
   4) INITIALIZAÇÃO DO SISTEMA
   ============================ */
function initializeCourse() {
    if (typeof window.initCourse === "function") {
        console.log("📘 Iniciando curso...");
        window.initCourse();
    } else {
        console.warn("⚠ initCourse ainda não está disponível.");
    }
}

/* ============================
   5) BOOT DO LOGIN
   ============================ */
document.addEventListener("DOMContentLoaded", () => {
    const btnRegister = document.getElementById("ac-register");
    const btnLogin = document.getElementById("ac-login");
    const btnGuest = document.getElementById("ac-continue-guest");

    const inputName = document.getElementById("ac-name");
    const inputEmail = document.getElementById("ac-email");

    const overlay = document.getElementById("access-overlay");

    /* Caso já tenha usuário salvo */
    const savedUser = getLocalUser();

    if (savedUser && hasAccess(savedUser)) {
        hideOverlay();
        initializeCourse();
        return;
    }

    /* Criar conta */
    btnRegister.onclick = async () => {
        const name = inputName.value.trim();
        const email = inputEmail.value.trim().toLowerCase();

        if (!name || !email) {
            alert("Preencha nome e e-mail");
            return;
        }

        const result = await registerUser(name, email);

        if (result.success) {
            saveLocalUser(result.user);
            hideOverlay();
            initializeCourse();
        } else {
            alert(result.message || "Erro ao registrar.");
        }
    };

    /* Login */
    btnLogin.onclick = async () => {
        const email = inputEmail.value.trim().toLowerCase();
        if (!email) {
            alert("Informe um e-mail válido.");
            return;
        }

        const result = await loginUser(email);

        if (result.success) {
            saveLocalUser(result.user);
            hideOverlay();
            initializeCourse();
        } else {
            alert(result.message || "E-mail não encontrado.");
        }
    };

    /* Acesso somente leitura */
    btnGuest.onclick = () => {
        hideOverlay();
        initializeCourse();
    };
});
