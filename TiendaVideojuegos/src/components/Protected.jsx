import { Navigate, Outlet } from "react-router-dom";

function Protected({ rolesPermitidos }) {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    return <Navigate to="/login" replace />;
  }

  const rolUsuario = usuarioActivo.roleId || 3;
  if (rolesPermitidos && !rolesPermitidos.includes(rolUsuario)) {
    alert("No tenés permisos de administrador para acceder a esta sección.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Protected;
