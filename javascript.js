const tipoUsuario = document.getElementById("tipoUsuario");
    const emailContainer = document.getElementById("emailContainer");
    const matriculaContainer = document.getElementById("matriculaContainer");

    tipoUsuario.addEventListener("change", function () {
      const tipo = this.value;

      if (tipo === "professor") {
        emailContainer.classList.remove("hidden");
        matriculaContainer.classList.add("hidden");
      } else if (tipo === "estudante") {
        matriculaContainer.classList.remove("hidden");
        emailContainer.classList.add("hidden");
      } else {
        emailContainer.classList.add("hidden");
        matriculaContainer.classList.add("hidden");
      }
    });

    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const tipo = tipoUsuario.value;
      const email = document.getElementById("email").value.trim();
      const matricula = document.getElementById("matricula").value.trim();

      if (tipo === "professor") {
        if (!email) {
          alert("Por favor, insira o e-mail do professor.");
          return;
        }
        // Abrir nova aba para professor
        window.open("pagina_professor.html?email=" + encodeURIComponent(email), "_blank");
      } else if (tipo === "estudante") {
        if (!matricula) {
          alert("Por favor, insira a matrícula do estudante.");
          return;
        }
        // Abrir nova aba para estudante
        window.open("pagina_estudante.html?matricula=" + encodeURIComponent(matricula), "_blank");
      } else {
        alert("Selecione se você é professor ou estudante.");
      }
    });
