import { datos } from "./api.js";
import { agregarCard } from "./ui.js";
import { mostrarProductos } from "./ui.js";

export async function filterProducts(category) {
  const productos = await datos();
  const filteredProducts = productos.filter(producto => producto.categoria_id == category);
  const productosContainer = document.getElementById("productos-container");

  productosContainer.innerHTML = "";
  filteredProducts.forEach(producto => agregarCard(producto, productosContainer));
}

// Dependiendo del boton se muestra o no los productos de la categoria
document.querySelectorAll(".categoriesButton").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    category === "all" ? mostrarProductos() : filterProducts(category);
  });
});

