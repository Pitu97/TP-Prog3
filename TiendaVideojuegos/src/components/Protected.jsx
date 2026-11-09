import { Navigate, Outlet } from "react-router-dom";

function Protected({ rolesPermitidos }) {
  let usuarioActivo = null;

  try {
    usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
  } catch {
    localStorage.removeItem("usuarioActivo");
  }

  const token = localStorage.getItem("token");

  if (!token || !usuarioActivo || !usuarioActivo.roleId) {
    return <Navigate to="/login" replace />;
  }

  const rolUsuario = Number(usuarioActivo.roleId);

  if (rolesPermitidos && !rolesPermitidos.includes(rolUsuario)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Protected;
