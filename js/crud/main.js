import { mostrarProductos } from "./get.js";
import { agregarProducto } from "./add.js";
import { deleteProduct } from "./delete.js";
import { modifyProduct } from "./modify.js";

mostrarProductos();

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("agregar")) {
            agregarProducto();
        }
    }
)

const productosContainer = document.querySelector(".productos-container");
productosContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-button")) {
        deleteProduct(event);
    }
    if (event.target.classList.contains("modify-button")) {
        modifyProduct(event);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
});