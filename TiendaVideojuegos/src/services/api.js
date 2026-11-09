const API_URL = "http://localhost:3000";

export const obtenerJuegos = async () => {
  const response = await fetch(`${API_URL}/games`);

  if (!response.ok) {
    throw new Error("Error al obtener los videojuegos");
  }

  return await response.json();
};

export const crearJuego = async (juego) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(juego),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error("Error al crear videojuego");
  }

  return datos;
};

export const actualizarJuego = async (id, juego) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/games/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(juego),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error("Error al actualizar el videojuego");
  }

  return datos;
};

export const eliminarJuego = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/games/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const texto = await response.text();

  let datos;

  try {
    datos = JSON.parse(texto);
  } catch {
    datos = texto;
  }

  if (!response.ok) {
    throw new Error(
      datos?.message || datos || "Error al eliminar el videojuego"
    );
  }

  return datos;
};

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Error al obtener las categorías");
  }

  return await response.json();
};

export const obtenerUsuarios = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return datos;
};

export const actualizarRolUsuario = async (id, roleId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roleId: Number(roleId) }),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error("Error al actualizar el rol");
  }

  return datos.user;
}


export const registrarUsuario = async (usuario) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.message || "Error al registrarse");
  }

  return datos;
};

export const iniciarSesion = async (credenciales) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.message || "Error al iniciar sesion");
  }

  return datos;
};

export const crearCompra = async (items) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/purchases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error("Error al realizar la compra");
  }

  return datos.purchase;
};


export const obtenerHistorialCompras = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/purchases`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error("Error al obtener el historial");
  }

  return datos;
};

// CREAR CATEGORÍA
export const crearCategoria = async (name) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.message || "Error al crear la categoría");
  }

  return datos;
};

// ACTUALIZAR CATEGORÍA
export const actualizarCategoria = async (id, name) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.message || "Error al actualizar la categoría");
  }

  return datos;
};

// ELIMINAR CATEGORÍA
export const eliminarCategoria = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const datos = await response.json();

  if (!response.ok) {
    throw new Error(datos.message || "Error al eliminar la categoría");
  }

  return datos;
};
