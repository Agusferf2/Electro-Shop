import { mostrarProductos } from "./get.js";
export async function agregarProducto() {
  document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = document.querySelector(".form");
    let formData = new FormData(form);
    fetch("https://api-electroshop.onrender.com/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then(response => {
        response.json()
        location.reload();
        mostrarProductos();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
    form.reset();
  });
}