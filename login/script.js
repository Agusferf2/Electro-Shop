function showRegister() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("register-container").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("register-container").classList.add("hidden");
}

const registermsg = document.getElementById("register-msg");
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
    registermsg.style.color = "green";
    registermsg.textContent = "Usuario registrado con éxito";
    setTimeout(() => {
      showLogin();
    }, 2000);
  } else {
    registermsg.textContent = ("Error al registrar usuario");
  }
};

const registrarbtn = document.getElementById("register-btn");
registrarbtn.addEventListener("click", () => {
  const registerusername = document.getElementById("register-user").value;
  const registerpassword = document.getElementById("register-pass").value;
  registerusername === "" || registerpassword === "" ?
    registermsg.textContent = ("Por favor, complete todos los campos") :
    registerUser(registerusername, registerpassword);
});

const loginmsg = document.getElementById("login-msg");
const loginUser = async (username, password) => {
  const response = await fetch("https://api-electroshop.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem("token", data.token); 
    loginmsg.style.color = "green";
    loginmsg.textContent = ("Bienvenido " + username);
    console.log("object")
    setTimeout(() => {
      window.location.href = "/crud.html"; 
    },2000)
  } else {
    loginmsg.textContent = data.error;
  }
};

const loginbtn = document.getElementById("login-btn");
loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const loginuser = document.getElementById("login-user").value;
  const loginpassword = document.getElementById("login-pass").value;
  loginuser === "" || loginpassword === ""?
  loginmsg.textContent = ("Por favor, complete todos los campos"):
  loginUser(loginuser, loginpassword);
});