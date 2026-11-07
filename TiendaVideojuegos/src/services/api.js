const API_URL = "http://localhost:3000";

export const obtenerJuegos = async () => {
  const response = await fetch(`${API_URL}/games`);

  if (!response.ok) {
    throw new Error("Error al obtener los videojuegos");
  }

  return await response.json();
};

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Error al obtener las categorías");
  }

  return await response.json();
};