/* login.js - Projeto Bravo Charlie
   Versão com logs de debug e integração mínima com Apps Script
   Deve ser incluído ENTRE data.js e app.js:
   <script src="data.js" defer></script>
   <script src="login.js" defer></script>
   <script src="app.js" defer></script>
*/

(function(){
 const API_URL = "https://script.google.com/macros/s/AKfycbwwuLs6S7Fer-eFntco7OO3EEP2EtlNwGlh4l9Kga8rzajAtytbKoqicv0exn0ZdA6t/exec";

  function debugLog(...args){ 
    try { console.log("[LOGIN.JS]", ...args); } catch(e){} 
  }

  function getLocalUser(){
    try { return JSON.parse(localStorage.getItem("pbc_user")) || null; }
    catch(e){ return null; }
  }
  function saveLocalUser(u){
    try { localStorage.setItem("pbc_user", JSON.stringify(u)); debugLog("saved user to localStorage", u); }
    catch(e){ debugLog("failed saving user:", e); }
  }

  async function registerUser(name, email){
    debugLog("registerUser()", name, email);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action: "register", name, email}),
        headers: { "Content-Type": "application/json" },
        redirect: "follow"
      });
      const json = await res.json();
      debugLog("register response:", json);
      return json;
    } catch(err){
      debugLog("registerUser error:", err);
      return { success: false, message: "Erro na requisição" };
    }
  }

  async function loginUser(email){
    debugLog("loginUser()", email);
    try {
      const res = await fetch(API_URL + "?action=login&email=" + encodeURIComponent(email));
      const json = await res.json();
      debugLog("login response:", json);
      return json;
    } catch(err){
      debugLog("loginUser error:", err);
      return { success: false, message: "Erro na requisição" };
    }
  }

  function hasAccess(user){
    if(!user) return false;
    if(user.premium === true) return true;
    const created = Number(user.createdAt || 0);
    const days = (Date.now() - created) / (1000*60*60*24);
    return days <= 30;
  }

  function hideOverlay(){
    const ov = document.getElementById("access-overlay");
    if(ov){ ov.style.display = "none"; ov.classList.add("hidden"); debugLog("overlay hidden"); }
  }
  function showOverlay(){
    const ov = document.getElementById("access-overlay");
    if(ov){ ov.style.display = "flex"; ov.classList.remove("hidden"); debugLog("overlay shown"); }
  }

  function initializeCourse(){
    if(typeof window.initCourse === "function"){ debugLog("calling initCourse()"); window.initCourse(); }
    else debugLog("initCourse not available yet");
  }

  document.addEventListener("DOMContentLoaded", () => {
    debugLog("DOMContentLoaded - login.js running");
    const btnRegister = document.getElementById("ac-register");
    const btnLogin = document.getElementById("ac-login");
    const btnGuest = document.getElementById("ac-continue-guest");
    const inputName = document.getElementById("ac-name");
    const inputEmail = document.getElementById("ac-email");

    if(!btnRegister || !btnLogin || !inputEmail){
      debugLog("Some login elements missing:", { btnRegister: !!btnRegister, btnLogin: !!btnLogin, inputName: !!inputName, inputEmail: !!inputEmail });
      return;
    }

    // Se já existe usuário com acesso => iniciar curso
    const saved = getLocalUser();
    if(saved && hasAccess(saved)){
      debugLog("saved user has access, skipping overlay");
      hideOverlay();
      initializeCourse();
      return;
    } else {
      debugLog("no saved user or access expired");
      showOverlay();
    }

    btnRegister.addEventListener("click", async (e) => {
      e.preventDefault();
      const name = (inputName && inputName.value || "").trim();
      const email = (inputEmail.value || "").trim().toLowerCase();
      if(!name || !email){ alert("Preencha nome e e-mail."); return; }
      btnRegister.disabled = true;
      const r = await registerUser(name, email);
      btnRegister.disabled = false;
      if(r && r.success){
        saveLocalUser(r.user);
        hideOverlay();
        initializeCourse();
      } else {
        alert(r.message || "Erro ao registrar. Veja o console.");
        debugLog("register failed:", r);
      }
    });

    btnLogin.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = (inputEmail.value || "").trim().toLowerCase();
      if(!email){ alert("Informe um e-mail válido."); return; }
      btnLogin.disabled = true;
      const r = await loginUser(email);
      btnLogin.disabled = false;
      if(r && r.success){
        saveLocalUser(r.user);
        hideOverlay();
        initializeCourse();
      } else {
        alert(r.message || "E-mail não encontrado.");
        debugLog("login failed:", r);
      }
    });

    btnGuest.addEventListener("click", (e) => {
      e.preventDefault();
      debugLog("guest continue");
      hideOverlay();
      initializeCourse();
    });
  });
})();
