// Mostrar el formulario de registro
function showRegister() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("register-container").classList.remove("hidden");
}

// Mostrar el formulario de login
function showLogin() {
  document.getElementById("register-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
}
const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // bcryptjs ya está disponible en window

  const userData = {
    username: username,
    password: hashedPassword
  };

  const response = await fetch("https://api-electroshop.onrender.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  if (response.ok) {
    console.log("Usuario registrado con éxito");
  } else {
    console.log("Error al registrar usuario");
  }
};

const registrarbtn = document.getElementById("register-btn");
registrarbtn.addEventListener("click", () => {
  const registerusername = document.getElementById("register-user").value;
  const registerpassword = document.getElementById("register-pass").value;
  registerusername === "" || registerpassword === "" ?
    console.log("Por favor, complete todos los campos") :
    registerUser(registerusername, registerpassword);
});


const loginUser = async (username, password) => {
  const response = await fetch(`https://api-electroshop.onrender.com/users?username=${username}`);
  const users = await response.json();

  if (users.length === 0) {
    console.log("Usuario no encontrado");
    return;
  }

  const user = users[0];
  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    console.log("Inicio de sesión exitoso");
    window.location.href = '/crud.html';
  } else {
    console.log("Contraseña incorrecta");
  }
};

const loginbtn = document.getElementById("login-btn");
loginbtn.addEventListener("click", () => {
  const loginuser = document.getElementById("login-user").value;
  const loginpassword = document.getElementById("login-pass").value;
  loginuser === "" || loginpassword === "" ?
    console.log("Por favor, complete todos los campos") :
    loginUser(loginuser, loginpassword);
});

// const deleteUser = async (username) => {
//   console.log("username", username);
//   const response = await fetch(`http://localhost:3000/users/${username}`, {
//     method: "DELETE"
//   });

//   if (response.ok) {
//     console.log("Usuario eliminado con éxito");
//   } else {
//     console.log("Error al eliminar usuario");
//   }
// };
