function gerarCalendario(ano, mes) {
      const tabela = document.getElementById("tabelaCalendario");
      const mesAno = document.getElementById("mesAno");

      const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

      const primeiroDia = new Date(ano, mes, 1).getDay();
      const ultimoDia = new Date(ano, mes + 1, 0).getDate();

      mesAno.textContent = `${nomesMeses[mes]} ${ano}`;

      let html = "<tr>";
      const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      for (let dia of diasSemana) {
        html += `<th>${dia}</th>`;
      }
      html += "</tr><tr>";

      for (let i = 0; i < primeiroDia; i++) {
        html += "<td></td>";
      }

      for (let dia = 1; dia <= ultimoDia; dia++) {
        if ((primeiroDia + dia - 1) % 7 === 0 && dia !== 1) {
          html += "</tr><tr>";
        }
        html += `<td>${dia}</td>`;
      }

      html += "</tr>";
      tabela.innerHTML = html;
    }

    const hoje = new Date();
    gerarCalendario(hoje.getFullYear(), hoje.g
