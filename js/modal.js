import { displayCartItems } from "./cart.js";
export function abrirModal() {
    const modal = document.getElementById("myModal");
    displayCartItems();
    modal.style.display = "flex";
  }
  
  export function cerrarModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  }