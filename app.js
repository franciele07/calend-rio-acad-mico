// app.js - concatenado de javascript.js + login.js

// ----- conteúdo de javascript.js -----
document.addEventListener('DOMContentLoaded', function () {
  let calendarEl = document.getElementById('calendar');
  let modal = document.getElementById('eventModal');
  let eventTitleInput = document.getElementById('eventTitle');
  let saveBtn = document.getElementById('saveEvent');
  let deleteBtn = document.getElementById('deleteEvent');
  let closeBtn = document.getElementById('closeModal');
  let currentEvent = null;
  
  // elementos do modal de autenticação
  let authModal = document.getElementById('authModal');
  let authEmail = document.getElementById('authEmail');
  let authPassword = document.getElementById('authPassword');
  let authSubmit = document.getElementById('authSubmit');
  let authCancel = document.getElementById('authCancel');

  // Variáveis para detecção de duplo clique
  let lastClickTime = 0;
  let lastClickDateStr = '';
  let singleClickTimer = null;
  const DOUBLE_THRESHOLD = 350; // milliseconds
  let pendingDate = null;
  window.isAuthenticated = (localStorage.getItem('isAuthenticated') === '1') || false; // session flag (global)

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    editable: true,
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    dateClick: function (info) {
          // detecção de duplo clique: agenda ação de clique simples; se houver segundo clique dentro do limite, trata como duplo clique
      const clicked = new Date(info.date.getFullYear(), info.date.getMonth(), info.date.getDate());
      const clickedStr = clicked.toISOString().split('T')[0];
      const now = Date.now();

      if (lastClickDateStr === clickedStr && (now - lastClickTime) < DOUBLE_THRESHOLD) {
        // double click detected
        lastClickTime = 0;
        lastClickDateStr = '';
        if (singleClickTimer) { clearTimeout(singleClickTimer); singleClickTimer = null; }
        // store the clicked date and show authentication modal (or reuse session)
        pendingDate = info.date;
        if (!window.isAuthenticated) {
          authModal.style.display = 'block';
          authEmail.focus();
        } else {
          // already authenticated in this session; directly create event
          createEventForDate(pendingDate);
        }
        return;
      }

      // agenda ação de clique simples após o limite para permitir que o segundo clique (se houver) cancele
      lastClickTime = now;
      lastClickDateStr = clickedStr;
      if (singleClickTimer) clearTimeout(singleClickTimer);
      singleClickTimer = setTimeout(() => {
        singleClickTimer = null;
        // Bloquear datas anteriores a hoje (permitir hoje e futuras)
        const today = new Date();
        today.setHours(0,0,0,0);
        if (clicked < today) {
          alert('Não é permitido criar eventos em datas passadas. Escolha hoje ou uma data futura.');
          return;
        }

        let title = prompt('Digite o nome do evento:');
        if (title) {
          calendar.addEvent({
            title: title,
            start: info.date,
            allDay: true
          });
        }
      }, DOUBLE_THRESHOLD);
      
      // comportamento de clique simples agora executado pelo timer agendado (veja acima)
    },
    eventClick: function (info) {
      currentEvent = info.event;
      eventTitleInput.value = currentEvent.title;
      modal.style.display = 'block';
    }
  });

  // Salvar alterações no evento
  saveBtn.onclick = function () {
    if (currentEvent) {
      currentEvent.setProp('title', eventTitleInput.value);
      modal.style.display = 'none';
    }
  };

  // Excluir evento
  deleteBtn.onclick = function () {
    if (currentEvent && confirm('Tem certeza que deseja excluir este evento?')) {
      currentEvent.remove();
      modal.style.display = 'none';
    }
  };

  // Fechar modal
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target === modal) modal.style.display = 'none';
    // fecha o modal de autenticação ao clicar fora
    if (event.target === authModal) authModal.style.display = 'none';
  };
  
  // manipuladores de autenticação
  authCancel && (authCancel.onclick = function () {
    authModal.style.display = 'none';
    pendingDate = null;
  });
  authSubmit && (authSubmit.onclick = function () {
    const emailVal = authEmail.value.trim();
    const passVal = authPassword.value.trim();
    // autenticação simplificada - aceita qualquer credencial não vazia; substitua pela sua lógica de autenticação
    if (!emailVal || !passVal) {
      alert('Preencha email e senha.');
      return;
    }
    window.isAuthenticated = true; // mark session as authenticated
    localStorage.setItem('isAuthenticated','1');
    authModal.style.display = 'none';
    // after successful auth, create event for pending date
    if (pendingDate) createEventForDate(pendingDate);
    pendingDate = null;
    authEmail.value = '';
    authPassword.value = '';
  });

  // função auxiliar para criar eventos para uma data
  function createEventForDate(dateObj) {
    const clicked = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    const today = new Date(); today.setHours(0,0,0,0);
    if (clicked < today) {
      alert('Não é permitido criar eventos em datas passadas. Escolha hoje ou uma data futura.');
      return;
    }
    let title = prompt('Digite o nome do evento:');
    if (title) {
      calendar.addEvent({ title: title, start: dateObj, allDay: true});
    }
  }

  calendar.render();
});

// ----- login.js content -----
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
  // Attempt login from the standalone login page (login.html)
  const emailEl = document.getElementById('login-email');
  const passEl = document.getElementById('login-password');
  const emailVal = emailEl ? emailEl.value.trim() : '';
  const passVal = passEl ? passEl.value.trim() : '';
  if (!emailVal || !passVal) {
    alert('Preencha email e senha.');
    return;
  }
  window.isAuthenticated = true;
  alert('Login efetuado! (exemplo)');
  localStorage.setItem('isAuthenticated','1');
  // After login, redirect to index if needed
  if (window.location.pathname.endsWith('login.html')) {
    window.location.href = '/';
  }
}
