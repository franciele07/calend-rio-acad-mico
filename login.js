function showRegister() {
  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("register-screen").classList.add("active");
}

function showLogin() {
  document.getElementById("register-screen").classList.remove("active");
  document.getElementById("login-screen").classList.add("active");
}

function register() {
  alert("Cadastro realizado com sucesso! (exemplo)");
  showLogin();
}

function login() {
  alert("Login efetuado! (exemplo)");
}
