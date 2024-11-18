function validatePassword() {
  const passwordInput = document.getElementById("password").value;
  const messageDiv = document.getElementById("message");
  const scoreDiv = document.getElementById("score");

  if (passwordInput.length < 8) {
    messageDiv.textContent = "A senha deve ter no mínimo 8 caracteres.";
    messageDiv.className = "message error";
    scoreDiv.textContent = "";
    return;
  }

  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(passwordInput)) {
    messageDiv.textContent =
      "A senha deve conter pelo menos um caractere especial.";
    messageDiv.className = "message error";
    scoreDiv.textContent = "";
    return;
  }

  const result = zxcvbn(passwordInput);

  const strengthLevels = [
    "Muito Fraca",
    "Fraca",
    "Razoável",
    "Forte",
    "Muito Forte",
  ];

  if (result.score < 3) {
    messageDiv.textContent =
      "A senha não atende aos critérios mínimos de segurança.";
    messageDiv.className = "message error";
  } else {
    messageDiv.textContent = "Senha válida!";
    messageDiv.className = "message success";
  }

  scoreDiv.textContent = `Força da senha: ${strengthLevels[result.score]}`;
}

function clearScreen() {
  document.getElementById("password").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("score").textContent = "";
}
