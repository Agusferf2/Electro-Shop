import { datos } from "../api.js";

export async function mostrarProductos() {
  const productos = await datos();
  const productosContainer = document.querySelector(".productos-container");
  productos.forEach((producto) => {
    const productCard = document.createElement("table");
    productCard.classList.add("cart-item");
    productCard.innerHTML = `
          <tr>
          <td><img width="100px" src="${producto.imagen}" alt="${producto.nombre}"></td>
          <td>${producto.nombre}</td>
          <td>$${producto.precio ? (producto.precio).toLocaleString('es-ES'): 0}</td>
          <td>
          <button class="modify-button" data-id="${producto.id}">Modificar</button>
          <button class="remove-button" data-id="${producto.id}">Eliminar</button>
          </td>
          </tr>
        `;
    productosContainer.appendChild(productCard);
  });
}
