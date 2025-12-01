document.addEventListener('DOMContentLoaded', function () {
  let calendarEl = document.getElementById('calendar');
  let modal = document.getElementById('eventModal');
  let eventTitleInput = document.getElementById('eventTitle');
  let saveBtn = document.getElementById('saveEvent');
  let deleteBtn = document.getElementById('deleteEvent');
  let closeBtn = document.getElementById('closeModal');
  let currentEvent = null;

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
      // Bloquear datas anteriores a hoje (permitir hoje e futuras)
      const clicked = new Date(info.date.getFullYear(), info.date.getMonth(), info.date.getDate());
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
  };

  calendar.render();
});
