import { datos } from "../api.js";

export async function modifyProduct(event) {
    document.querySelector(".title").textContent = "Modificar producto";
    const btnAgregar = document.querySelector(".agregar");
    btnAgregar.textContent = "Modificar"
    btnAgregar.classList.remove("agregar");
    btnAgregar.classList.add("modify");

    const productId = event.target.getAttribute("data-id");
    const inputname = document.querySelector([`input[name="nombre"]`]);
    const inputprecio = document.querySelector([`input[name="precio"]`]);
    const inputimagen = document.querySelector([`input[name="imagen"]`]);
    const inputcategoria = document.querySelector([`select[name="categoria_id"]`]);
    
    const productos = await datos();
    const product = productos.find((producto) => producto.id == productId);

    inputname.value = product.nombre;
    inputprecio.value = product.precio;
    inputimagen.value = product.imagen;
    inputcategoria.value = product.categoria_id;

    const form = document.querySelector(".form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const nombre = formData.get("nombre");
        const precio = formData.get("precio");
        const imagen = formData.get("imagen");
        const categoria_id = formData.get("categoria_id");
        const response = await fetch(`https://api-electroshop.onrender.com/productos/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, precio, imagen, categoria_id }),
        });
        if (response.ok) {
            location.reload();
        }
        const btnAgregar = document.querySelector(".submit");
        btnAgregar.textContent = "Agregar";
        btnAgregar.classList.remove("modify");
        btnAgregar.classList.add("agregar");
    });
}