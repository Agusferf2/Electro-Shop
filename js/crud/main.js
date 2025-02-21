import { mostrarProductos } from "./get.js";
import { agregarProducto } from "./add.js";

mostrarProductos();

const btnAgregar = document.querySelector(".submit");
btnAgregar.addEventListener("click", agregarProducto);