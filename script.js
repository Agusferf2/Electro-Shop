const link = "http://localhost:3000/productos";

// LLamar a la API
async function datos() {
  const response = await fetch(link);
  const data = await response.json();
  return data;
}
// Funcion para agregar las cards
function agregarCard(producto, productosContainer) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
            <div class="card-image-container">
            <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <h2 class="product-name">${producto.nombre}</h2>
                <p class="product-price">$${producto.precio.toLocaleString('es-ES')}</p>
                <button class="add-to-cart-button" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
  productosContainer.appendChild(productCard);
}

// Mostrar los productos
async function mostrarProductos() {
  const productos = await datos();
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";
  productos.forEach((producto) => {
    agregarCard(producto, productosContainer);
  });
}

mostrarProductos();

// Filtrar los productos
const filterProducts = async (category) => {
  const productos = await datos();
  const filteredProducts = productos.filter(
    (producto) => producto.categoria_id == category
  );
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";
  filteredProducts.forEach((producto) => {
    agregarCard(producto, productosContainer);
  });
};

// Dependiendo del boton se muestra o no los productos de la categoria
document.querySelectorAll(".categoriesButton").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    category === "all" ? mostrarProductos() : filterProducts(category);
  });
});

// Buscador
document.getElementById("botonBuscador").addEventListener("click", async () => {
  const busqueda = document.getElementById("buscador").value;
  const productos = await datos();
  const productosBusqueda = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";
  productosBusqueda.length === 0
    ? (productosContainer.innerHTML = "<h1 class='no-results'>Lo sentimos, no se encontró ningun producto.</h1>")
    : productosBusqueda.forEach((producto) => {
    agregarCard(producto, productosContainer);
  });
});

// Carrito (Guarda en localStorage)
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("add-to-cart-button")) {
    const productId = event.target.getAttribute("data-id");
    const productos = await datos();
    const product = productos.find((producto) => producto.id == productId);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id == productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      cartItems.push(product);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
});

// Muestra el carrito
const displayCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("myModal");
  cartItemsContainer.innerHTML = `
  <div class="modal-content">
            <span onclick="closerModal()" class="close">&times;</span>
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
    closerModal();
  });

  // Update quantity in cart
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
};

document
  .querySelector(".icon-shopping-cart")
  .addEventListener("click", displayCartItems);

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

// Seleccionamos los elementos
const modal = document.getElementById("myModal");
const openModal = document.getElementById("openModal");
const closeModal = document.querySelector(".close");

// Mostrar modal cuando se haga clic en el botón
function abrirModal() {
    displayCartItems();
    modal.style.display = "flex";
}

openModal.addEventListener("click", () => {
    abrirModal();  
});

// Ocultar modal cuando se haga clic en la "X"
function closerModal() { 
    modal.style.display = "none";
}

// Ocultar modal si el usuario hace clic fuera de él
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

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

