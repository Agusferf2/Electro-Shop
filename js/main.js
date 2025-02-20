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