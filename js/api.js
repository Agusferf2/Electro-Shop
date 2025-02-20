const link = "https://api-electroshop.onrender.com/productos";

export async function datos() {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
