import { datos } from "./api.js";
// Agrega una card de producto al contenedor
export function agregarCard(producto, productosContainer) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <div class="card-image-container">
        <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="product-info">
        <h2 class="product-name">${producto.nombre}</h2>
        <p class="product-price">$${producto.precio ? (producto.precio).toLocaleString('es-ES'): 0}</p>
        <button class="add-to-cart-button" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `;
    productosContainer.appendChild(productCard);
  }
  
  // Muestra los productos en la página
  export async function mostrarProductos() {
    const productos = await datos();
    const productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = "";
    productos.forEach((producto) => agregarCard(producto, productosContainer));
  }

  //Menu hamburguesa
  const hamburguesa = document.querySelector(".hamburguesa");
  hamburguesa.addEventListener("click", () => {
    const nav = document.querySelector(".categoriesList");
    nav.classList.toggle("active");
  });

  document.querySelectorAll(".categoriesList li").forEach((li) => {
    li.addEventListener("click", () => {
      hamburguesa.checked = false;
      const nav = document.querySelector(".categoriesList");
      nav.classList.remove("active");
    });
  });