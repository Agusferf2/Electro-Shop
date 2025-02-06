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
                <p class="product-price">$${producto.precio}</p>
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
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
});

// Muestra el carrito
const displayCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = "";
  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <p>${item.nombre}</p>
            <p>Precio: $${item.precio}</p>
            <button class="remove-from-cart-button" data-id="${item.id}">Quitar del carrito</button>
        `;
    cartItemsContainer.appendChild(cartItem);
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