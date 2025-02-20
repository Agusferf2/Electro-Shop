import { datos } from "./api.js";
import { cerrarModal } from "./modal.js";

export async function agregarAlCarrito(event) {
  console.log("event", event);
    const productId = event.target.getAttribute("data-id");
    const productos = await datos();
    const product = productos.find((producto) => producto.id == productId);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find(item => item.id == productId);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      cartItems.push(product);
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  
  // Muestra los productos en el carrito
  export function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("myModal");
    cartItemsContainer.innerHTML = `
    <div class="modal-content">
    <span class="close">&times;</span>
    <h1>Mi carrito</h1>
    </div>`;
    cartItems.forEach((item) => {
      const cartItem = document.createElement("table");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
              <tr>
                  <td><img height="100px" src="${item.imagen}" alt="${item.nombre}"></td>
                  <td>${item.nombre}</td>
                  <td>$${item.precio.toLocaleString('es-ES')}</td>
                  <td>
                  <input type="number" min="1" value="${item.quantity}" class="cart-quantity" data-id="${item.id}">
                  </td>
                  <td><button class="remove-from-cart-button" data-id="${item.id}">Eliminar</button></td>
                  </tr>
                  `;
                  cartItemsContainer.lastChild.appendChild(cartItem);
                });
                
                const totalCarrito = document.createElement("div");
                totalCarrito.classList.add("totalCarrito");
                
    cartItemsContainer.lastChild.appendChild(totalCarrito);
    
    const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  
    totalCarrito.innerHTML = `<p class="total">Total: $${total.toLocaleString('es-ES')} </p>
    <button class="checkout-button">Finalizar compra</button>`;
    
    const checkoutButton = totalCarrito.querySelector(".checkout-button");
    checkoutButton.addEventListener("click", () => {
      localStorage.removeItem("cartItems");
      cerrarModal();
    });
    
    // Agregar cantidad
    document.querySelectorAll(".cart-quantity").forEach(input => {
      input.addEventListener("change", (event) => {
        const newQuantity = parseInt(event.target.value);
        const productId = event.target.getAttribute("data-id");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const product = cartItems.find(item => item.id == productId);
        if (product) {
          product.quantity = newQuantity;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          displayCartItems();
        }
      });
    });
    // Quitar del carrito
    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("remove-from-cart-button")) {
        const productId = event.target.getAttribute("data-id");
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const newCartItems = cartItems.filter((item) => item.id != productId);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        displayCartItems();
      }
    });
  }



  