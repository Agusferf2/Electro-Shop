import { mostrarProductos } from "./get.js";
import { agregarProducto } from "./add.js";
import { deleteProduct } from "./delete.js";
import { modifyProduct } from "./modify.js";

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      window.location.href = "index.html"; 
      return;
    }
  
    try {
      const response = await fetch("https://api-electroshop.onrender.com/verificar-token", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Token inválido o expirado");
      }
  
      console.log("Token válido, acceso permitido");
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem("token"); 
      window.location.href = "index.html"; 
    }
  });
  
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

const btnHome = document.getElementById("btnHome");
btnHome.addEventListener("click", function () {
    window.location.href = "index.html";
});