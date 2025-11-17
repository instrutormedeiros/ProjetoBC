const API_URL = "https://script.google.com/macros/s/AKfycbwwuLs6S7Fer-eFntco7OO3EEP2EtlNwGlh4l9Kga8rzajAtytbKoqicv0exn0ZdA6t/exec";

// FUNÇÃO JSONP UNIVERSAL
function jsonp(url) {
    return new Promise(resolve => {
        const callbackName = "cb_" + Math.random().toString(36).substr(2);
        window[callbackName] = data => {
            resolve(data);
            delete window[callbackName];
        };
        const script = document.createElement("script");
        script.src = url + `&callback=${callbackName}`;
        document.body.appendChild(script);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("access-overlay");

    // BOTÃO REGISTRO
    document.getElementById("ac-register").addEventListener("click", async () => {
        const name = document.getElementById("ac-name").value.trim();
        const email = document.getElementById("ac-email").value.trim();

        if (!name || !email) {
            alert("Preencha nome e e-mail.");
            return;
        }

        const url = `${API_URL}?action=register&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

        const res = await jsonp(url);

        if (res.success) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userName", name);
            overlay.style.display = "none";
        } else {
            alert(res.message || "Erro no registro.");
        }
    });

    // BOTÃO LOGIN
    document.getElementById("ac-login").addEventListener("click", async () => {
        const email = document.getElementById("ac-email").value.trim();

        if (!email) {
            alert("Digite seu e-mail.");
            return;
        }

        const url = `${API_URL}?action=login&email=${encodeURIComponent(email)}`;

        const res = await jsonp(url);

        if (res.success) {
            localStorage.setItem("userEmail", res.user.email);
            localStorage.setItem("userName", res.user.name);
            overlay.style.display = "none";
        } else {
            alert(res.message || "Erro no login.");
        }
    });

    // FECHAR SEM LOGIN
    document.getElementById("ac-continue-guest").addEventListener("click", () => {
        overlay.style.display = "none";
    });
});
