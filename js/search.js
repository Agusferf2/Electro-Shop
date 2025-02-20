import { datos } from "./api.js";
import { agregarCard } from "./ui.js";

export async function buscarProducto() {
  const busqueda = document.getElementById("buscador").value.toLowerCase();
  const productos = await datos();
  const productosBusqueda = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda)
  );

  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";
  productosBusqueda.length === 0
  ? (productosContainer.innerHTML = "<h1 class='no-results'>Lo sentimos, no se encontró ningun producto.</h1>")
  : productosBusqueda.forEach((producto) => {
    agregarCard(producto, productosContainer);
  });
}
