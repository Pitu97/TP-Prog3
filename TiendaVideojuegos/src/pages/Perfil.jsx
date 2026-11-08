import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { obtenerUsuarios } from "../services/api";

function Perfil() {
  const navigate = useNavigate();
  const { colores } = useTheme();

  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null",
  );

  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [errorUsuarios, setErrorUsuarios] = useState("");

  useEffect(() => {
    if (usuarioActivo?.roleId !== 1) {
      setCargandoUsuarios(false);
      return;
    }

    const cargarUsuarios = async () => {
      try {
        const datos = await obtenerUsuarios();
        setUsuarios(datos);
      } catch (error) {
        console.error(error);
        setErrorUsuarios(error.message);
      } finally {
        setCargandoUsuarios(false);
      }
    };

    cargarUsuarios();
  }, [usuarioActivo?.roleId]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  /*const [listaUsuarios, setListaUsuarios] = useState(
    JSON.parse(localStorage.getItem("usuarios") || "[]"),
  );*/

  const cambiarRolUsuario = (emailUsuario, nuevoRol) => {
    const usuariosActualizados = listaUsuarios.map((u) =>
      u.email === emailUsuario ? { ...u, role: nuevoRol } : u,
    );

    setListaUsuarios(usuariosActualizados);
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

    if (usuarioActivo.email === emailUsuario) {
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify({ ...usuarioActivo, role: nuevoRol }),
      );
    }
  };

  if (!usuarioActivo) {
    return (
      <div className="container mt-4">
        <h2>Tenés que iniciar sesión para ver tu perfil.</h2>

        <button onClick={() => navigate("/login")}>Ir al login</button>
      </div>
    );
  }

  const historialCompras = JSON.parse(
    localStorage.getItem("historialCompras") || "{}",
  );

  const compras = historialCompras[usuarioActivo.email] || [];

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-around align-items-center mb-5">
        <div
          style={{
            backgroundColor: "darkblue",
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          Foto
        </div>

        <div>
          <h2>{usuarioActivo.name}</h2>
          <p>{usuarioActivo.email}</p>
        </div>

        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <h2>Historial de compras</h2>

      {compras.length === 0 ? (
        <p>Todavía no realizaste ninguna compra.</p>
      ) : (
        compras.map((compra) => (
          <div key={compra.id} className="border rounded p-3 mb-3">
            <h5>
              Compra del {new Date(compra.date).toLocaleDateString("es-AR")}
            </h5>

            {compra.details.map((detalle, index) => (
              <p key={`${compra.id}-${detalle.gameId}-${index}`}>
                {detalle.game.name} — Cantidad: {detalle.quantity} — $
                {(detalle.unitPrice * detalle.quantity).toFixed(2)}
              </p>
            ))}

            <h5>Total: ${compra.total.toFixed(2)}</h5>
          </div>
        ))
      )}

      {/* panel del superadm */}
      {usuarioActivo.roleId === 1 && (
        <div
          className="mt-5 p-4 rounded"
          style={{
            backgroundColor: colores.card,
            border: `1px solid ${colores.primary}`,
          }}
        >
          <h3 style={{ color: colores.primary, marginBottom: "20px" }}>
            Gestion de Usuarios
          </h3>

          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol Actual</th>
                <th>Cambiar Rol</th>
              </tr>
            </thead>
            <tbody>
              {cargandoUsuarios
                ? (<tr>
                  <td>"Cargando usuarios..."</td>
                </tr>)
                : errorUsuarios ? (
                  <tr>
                    <td colSpan={4}>{errorUsuarios}</td>
                  </tr>
                ) : usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No hay usuarios registrados</td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.email}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td
                        style={{ color: colores.secondary, fontWeight: "bold" }}
                      >
                        {u.roleId || 3}
                      </td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={u.roleId || 3}
                          onChange={(e) =>
                            cambiarRolUsuario(u.email, e.target.value)
                          }
                          disabled={u.email === usuarioActivo.email}
                          style={{
                            backgroundColor: colores.background,
                            color: colores.textMain,
                            border: `1px solid ${colores.secondary}`,
                          }}
                        >
                          <option value="3">user</option>
                          <option value="2">admin</option>
                          <option value="1">superadmin</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))
                )
              } 
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Perfil;
