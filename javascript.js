const eventosPorData = {
      "2025-10-14": ["Reunião com a equipe", "Entrega de relatório"],
      "2025-10-15": ["Apresentação de projeto", "Chamada com cliente"],
      "2025-10-20": ["Revisão de código", "Planejamento semanal"]
    };

    const calendario = document.getElementById("calendario");
    const listaEventos = document.getElementById("lista-eventos");
    const tituloMes = document.getElementById("mesAno");

    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    let celulaSelecionada = null;

    function gerarCalendario(mes, ano) {
      calendario.innerHTML = "";

      const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const primeiroDia = new Date(ano, mes, 1).getDay();
      const ultimoDia = new Date(ano, mes + 1, 0).getDate();

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      diasSemana.forEach(dia => {
        const th = document.createElement("th");
        th.textContent = dia;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      calendario.appendChild(thead);

      const tbody = document.createElement("tbody");
      let tr = document.createElement("tr");

      // Preenche dias vazios antes do primeiro dia do mês
      for (let i = 0; i < primeiroDia; i++) {
        tr.appendChild(document.createElement("td"));
      }

      for (let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(ano, mes, dia);
        const td = document.createElement("td");
        td.textContent = dia;

        const dataFormatada = data.toISOString().split("T")[0];

        // Marcar o dia de hoje
        if (
          dia === hoje.getDate() &&
          mes === hoje.getMonth() &&
          ano === hoje.getFullYear()
        ) {
          td.classList.add("today");
        }

        // Clique no dia
        td.addEventListener("click", () => {
          if (celulaSelecionada) {
            celulaSelecionada.classList.remove("selected");
            if (celulaSelecionada.classList.contains("today")) {
              celulaSelecionada.classList.add("today");
            }
          }
          td.classList.add("selected");
          celulaSelecionada = td;

          mostrarEventos(dataFormatada);
        });

        tr.appendChild(td);

        if (data.getDay() === 6) {
          tbody.appendChild(tr);
          tr = document.createElement("tr");
        }
      }

      // Preencher a última linha
      if (tr.children.length > 0) {
        while (tr.children.length < 7) {
          tr.appendChild(document.createElement("td"));
        }
        tbody.appendChild(tr);
      }

      calendario.appendChild(tbody);

      const nomeMes = data.toLocaleString('pt-BR', { month: 'long' });
      tituloMes.textContent = `${nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} ${ano}`;
    }

    function mostrarEventos(dataFormatada) {
      listaEventos.innerHTML = "";

      if (eventosPorData[dataFormatada]) {
        eventosPorData[dataFormatada].forEach(evento => {
          const li = document.createElement("li");
          li.textContent = evento;
          listaEventos.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "Nenhum evento para este dia.";
        listaEventos.appendChild(li);
      }
    }

    gerarCalendario(mesAtual, anoAtual);
