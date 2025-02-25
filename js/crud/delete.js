export async function deleteProduct(event) {
    const productId = event.target.getAttribute("data-id");
    const response = await fetch(`https://api-electroshop.onrender.com/productos/${productId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        location.reload();
    }
}