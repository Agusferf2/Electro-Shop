const loginUser = async (username, password) => {
  const response = await fetch("https://api-electroshop.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem("token", data.token); 
    window.location.href = "/crud.html"; 
  } else {
    console.log("Error:", data.error);
  }
};

const loginbtn = document.getElementById("login-btn");
loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const loginuser = document.getElementById("login-user").value;
  const loginpassword = document.getElementById("login-pass").value;
  loginuser === "" || loginpassword === ""?
  alert("Por favor, complete todos los campos"):
  loginUser(loginuser, loginpassword);
});