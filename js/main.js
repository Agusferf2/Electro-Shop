import { mostrarProductos } from "./ui.js";
import { filterProducts } from "./filters.js";
import { buscarProducto } from "./search.js";
import { agregarAlCarrito, displayCartItems } from "./cart.js";
import { abrirModal } from "./modal.js";


// Cargar productos al inicio
mostrarProductos();

// Filtrado de productos por categoría
document.querySelectorAll(".categoriesButton").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    category === "all" ? mostrarProductos() : filterProducts(category);
  });
});

// Buscador
document.getElementById("botonBuscador").addEventListener("click", buscarProducto);

// Mostrar carrito
document.querySelector(".icon-shopping-cart").addEventListener("click", displayCartItems);

// Agregar carrito
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("add-to-cart-button")) {
    await agregarAlCarrito(event);
  }
});


// Modal
document.getElementById("openModal").addEventListener("click", abrirModal);

window.addEventListener("click", (e) => {
  const modal = document.getElementById("myModal")
  if (e.target === modal || e.target === document.querySelector(".close")) {
    modal.style.display = "none";
  }
});
const btnLogin = document.querySelector("#loginButton");
const btnLogout = document.querySelector("#logoutButton");

document.addEventListener("DOMContentLoaded", async () => {
const token = localStorage.getItem("token");
try {
  const response = await fetch("https://api-electroshop.onrender.com/verificar-token", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Token inválido o expirado");
  }
  btnLogin.style.display = "none"; 
  btnLogout.style.display = "block";
} catch (error) {
  btnLogin.style.display = "block"; 
  btnLogout.style.display = "none";
}
});

btnLogin.addEventListener("click", () => {
    window.location.href = "./login/index.html";
});

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
});