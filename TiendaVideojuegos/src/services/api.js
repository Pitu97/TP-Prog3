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

  if(!response.ok) {
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