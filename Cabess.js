// Função para validar o formulário de cadastro
function validarCadastro() {
  // Obter os valores dos campos do formulário
  var nome = document.getElementById("name").value;
  var senha = document.getElementById("password").value;
  var senhaconf = document.getElementById("confirm-password").value;
  var cpf = document.getElementById("cpf").value;
  var email = document.getElementById("email").value;
  var dataNascimento = document.getElementById("data-aniversario").value;

  // Validar o nome (deve ter no mínimo 3 caracteres)
  if (nome.length < 3) {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    sucessoCadastro.innerHTML = "O nome deve ter no minimo 3 caracteres.";
    return false;
  }

  // Validar a senha (deve ter entre 6 e 10 caracteres)
  if (senha.length < 6 || senha.length > 10) {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    sucessoCadastro.innerHTML = "A senha deve ter entre 6 e 10 caracteres.";
    return false;
  }

  if (senha != senhaconf) {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    sucessoCadastro.innerHTML = "Senhas nao Batem!";
    return false;
  }

  // Validar o CPF (deve ter exatamente 11 dígitos)
  if (cpf.length !== 11) {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    sucessoCadastro.innerHTML = "O CPF deve ter exatamente 11 digitos.";
    return false;
  }

  // Validar o formato do email (usando uma expressão regular)
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    sucessoCadastro.innerHTML = "O e-mail deve ter um formato valido.";
    return false;
  }

  if (dataNascimento == "") {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    sucessoCadastro.innerHTML = "Coloque sua data de nascimento!!!";
    return false;
  }

  // Tratar letras maiúsculas e minúsculas para o e-mail
  email = email.toLowerCase();

  // Automatizar a criação da data de cadastro
  var dataCadastro = new Date();

  // Verificar se o indivíduo já foi cadastrado previamente
  var cadastrados = JSON.parse(localStorage.getItem("cadastrados")) || [];

  for (var i = 0; i < cadastrados.length; i++) {
    if (cadastrados[i].cpf === cpf || cadastrados[i].email === email) {
      var sucessoCadastro = document.getElementById("sucesso-cadastro");
      sucessoCadastro.innerHTML = "Esse Usuario ja existe!!";
      return false;
    }
  }

  // Armazenar os dados do usuário em localStorage
  cadastrados.push({
    nome: nome,
    senha: senha,
    cpf: cpf,
    email: email,
    dataNascimento: dataNascimento,
    dataCadastro: dataCadastro.toISOString(),
  });
  localStorage.setItem("cadastrados", JSON.stringify(cadastrados));

  // Mostrar aviso de sucesso de cadastro
  var sucessoCadastro = document.getElementById("sucesso-cadastro");
  sucessoCadastro.innerHTML = "Cadastro realizado com sucesso!";

  // Redirecionar para a página de login após 2 segundos
  setTimeout(function validarCadastro () {
  }, 3000);
  window.location.href = "Login.html";
}

function validarLogin() {
  // Obter os valores dos campos de e-mail e senha
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;

  // Obter os registros de usuários cadastrados no localStorage
  var cadastrados = JSON.parse(localStorage.getItem("cadastrados")) || [];

  // Verificar se existe um registro com o e-mail e a senha informados
  var usuarioEncontrado = false;
  for (var i = 0; i < cadastrados.length; i++) {
    if (cadastrados[i].email === email && cadastrados[i].senha === senha) {
      usuarioEncontrado = true;
      break;
    }
  }

  // Exibir mensagem de erro se o usuário não foi encontrado
  if (!usuarioEncontrado) {
    var sucessoCadastro = document.getElementById("sucesso-cadastro");
    alert("E-mail e ou senha invalidos.");
    sucessoCadastro.innerHTML = "E-mail e ou senha invalidos.";
    return false;
  }

  // Redirecionar para a página inicial se o login foi bem sucedido
  setTimeout(function validarLogin () {
  }, 3000);
  window.location.href = "Catalogo.html";
}
