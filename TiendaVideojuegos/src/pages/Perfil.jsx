import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import {
  obtenerUsuarios,
  actualizarRolUsuario,
  obtenerHistorialCompras,
  obtenerTodasCompras,
  actualizarEstadoCompra,
  eliminarUsuario,
  crearAdmin,
} from "../services/api";

function Perfil() {
  const navigate = useNavigate();
  const { colores } = useTheme();

  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null",
  );

  const [nuevoAdmin, setNuevoAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nombreAdminRef = useRef(null);
  const emailAdminRef = useRef(null);
  const passwordAdminRef = useRef(null);

  const [erroresAdmin, setErroresAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [creandoAdmin, setCreandoAdmin] = useState(false);

  const [actualizandoRol, setActualizandoRol] = useState(null);

  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [errorUsuarios, setErrorUsuarios] = useState("");
  const [eliminandoUsuario, setEliminandoUsuario] = useState(null);

  const [compras, setCompras] = useState([]);
  const [cargandoCompras, setCargandoCompras] = useState(true);
  const [errorCompras, setErrorCompras] = useState("");

  const [todasLasCompras, setTodasLasCompras] = useState([]);
  const [cargandoTodasLasCompras, setCargandoTodasLasCompras] = useState(true);
  const [errorTodasLasCompras, setErrorTodasLasCompras] = useState("");
  const [actualizandoCompra, setActualizandoCompra] = useState(null);

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

  useEffect(() => {
    if (usuarioActivo?.roleId !== 3) {
      setCargandoCompras(false);
      return;
    }

    const cargarCompras = async () => {
      try {
        const datos = await obtenerHistorialCompras();
        setCompras(datos);
      } catch (error) {
        console.error(error);
        setErrorCompras(error.message);
      } finally {
        setCargandoCompras(false);
      }
    };

    cargarCompras();
  }, [usuarioActivo?.roleId]);

  useEffect(() => {
    if (![1, 2].includes(usuarioActivo?.roleId)) {
      setCargandoTodasLasCompras(false);
      return;
    }

    const cargarTodasLasCompras = async () => {
      try {
        const datos = await obtenerTodasCompras();
        setTodasLasCompras(
          Array.isArray(datos) ? datos : datos.purchases || [],
        );
      } catch (error) {
        console.error(error);
        setErrorTodasLasCompras(error.message);
      } finally {
        setCargandoTodasLasCompras(false);
      }
    };

    cargarTodasLasCompras();
  }, [usuarioActivo?.roleId]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioActivo");
    navigate("/login", { replace: true });
  };

  const validarAdmin = () => {
    const nuevosErrores = {
      name: "",
      email: "",
      password: "",
    };

    const nombre = nuevoAdmin.name.trim();
    const email = nuevoAdmin.email.trim();
    const password = nuevoAdmin.password;

    if (!nombre) {
      nuevosErrores.name = "El nombre es obligatorio.";
    } else if (nombre.length < 3) {
      nuevosErrores.name = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!email) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email = "Ingresá un email válido.";
    }

    if (!password) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(password)) {
      nuevosErrores.password = "Debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(password)) {
      nuevosErrores.password = "Debe contener al menos una minúscula.";
    }

    setErroresAdmin(nuevosErrores);

    if (nuevosErrores.name) {
      nombreAdminRef.current.focus();
    } else if (nuevosErrores.email) {
      emailAdminRef.current.focus();
    } else if (nuevosErrores.password) {
      passwordAdminRef.current.focus();
    }

    return !Object.values(nuevosErrores).some((error) => error !== "");
  };

  const handlerCrearAdmin = async (e) => {
    e.preventDefault();

    if (!validarAdmin()) {
      return;
    }

    try {
      setCreandoAdmin(true);

      const datos = await crearAdmin({
        ...nuevoAdmin,
        name: nuevoAdmin.name.trim(),
        email: nuevoAdmin.email.trim(),
      });

      setUsuarios((usuariosActuales) => [...usuariosActuales, datos.user]);

      setNuevoAdmin({
        name: "",
        email: "",
        password: "",
      });

      alert("Administrador creado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al crear el administrador");
    } finally {
      setCreandoAdmin(false);
    }
  };

  const cambiarRolUsuario = async (idUsuario, nuevoRol) => {
    try {
      setActualizandoRol(idUsuario);

      const usuarioActualizado = await actualizarRolUsuario(
        idUsuario,
        nuevoRol,
      );

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((u) =>
          u.id === usuarioActualizado.id ? usuarioActualizado : u,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setActualizandoRol(null);
    }
  };

  const borrarUsuario = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?",
    );

    if (!confirmar) return;

    try {
      setEliminandoUsuario(id);

      await eliminarUsuario(id);

      setUsuarios((usuariosActuales) =>
        usuariosActuales.filter((usuario) => usuario.id !== id),
      );

      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al eliminar el usuario");
    } finally {
      setEliminandoUsuario(null);
    }
  };

  const cambiarEstadoCompra = async (idCompra, nuevoEstado) => {
    try {
      setActualizandoCompra(idCompra);

      const compraActualizada = await actualizarEstadoCompra(
        idCompra,
        nuevoEstado,
      );

      setTodasLasCompras((comprasActuales) =>
        comprasActuales.map((compra) =>
          compra.id === idCompra
            ? {
                ...compra,
                ...compraActualizada,
                status: nuevoEstado,
              }
            : compra,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setActualizandoCompra(null);
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

      {usuarioActivo.roleId === 3 && (
        <div>
          <h2>Historial de compras</h2>

          {cargandoCompras ? (
            <p>Cargando historial de compras...</p>
          ) : errorCompras ? (
            <p>{errorCompras}</p>
          ) : compras.length === 0 ? (
            <p>Todavía no realizaste ninguna compra.</p>
          ) : (
            compras.map((compra) => (
              <div key={compra.id} className="border rounded p-3 mb-3">
                <h5>
                  Compra del {new Date(compra.date).toLocaleDateString("es-AR")}
                </h5>

                <p>Estado: {compra.status}</p>

                {compra.detalleCompras.map((detalle) => (
                  <p key={detalle.id}>
                    {detalle.videojuego.name} — Cantidad: {detalle.quantity} — $
                    {(Number(detalle.unitPrice) * detalle.quantity).toFixed(2)}
                  </p>
                ))}

                <h5>Total: ${Number(compra.total).toFixed(2)}</h5>
              </div>
            ))
          )}
        </div>
      )}

      {/* panel del superadm */}
      {usuarioActivo.roleId === 1 && (
        <div>
          <div className="mb-4">
            <h3>Crear Administrador</h3>

            <Form onSubmit={handlerCrearAdmin} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del administrador"
                  value={nuevoAdmin.name}
                  onChange={(e) =>
                    setNuevoAdmin({
                      ...nuevoAdmin,
                      name: e.target.value,
                    })
                  }
                  ref={nombreAdminRef}
                  isInvalid={!!erroresAdmin.name}
                  required
                />
                {erroresAdmin.name && (
                  <Form.Control.Feedback type="invalid">
                    {erroresAdmin.name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email del administrador"
                  value={nuevoAdmin.email}
                  onChange={(e) =>
                    setNuevoAdmin({
                      ...nuevoAdmin,
                      email: e.target.value,
                    })
                  }
                  ref={emailAdminRef}
                  isInvalid={!!erroresAdmin.email}
                  required
                />
                {erroresAdmin.email && (
                  <Form.Control.Feedback type="invalid">
                    {erroresAdmin.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={nuevoAdmin.password}
                  onChange={(e) =>
                    setNuevoAdmin({
                      ...nuevoAdmin,
                      password: e.target.value,
                    })
                  }
                  ref={passwordAdminRef}
                  isInvalid={!!erroresAdmin.password}
                  required
                />
                {erroresAdmin.password && (
                  <Form.Control.Feedback type="invalid">
                    {erroresAdmin.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={creandoAdmin}
              >
                {creandoAdmin ? "Creando..." : "Crear administrador"}
              </button>
            </Form>
          </div>
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargandoUsuarios ? (
                  <tr>
                    <td>Cargando usuarios...</td>
                  </tr>
                ) : errorUsuarios ? (
                  <tr>
                    <td colSpan={5}>{errorUsuarios}</td>
                  </tr>
                ) : usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No hay usuarios registrados</td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.email}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td
                        style={{ color: colores.secondary, fontWeight: "bold" }}
                      >
                        {u.roleId === 1
                          ? "superadmin"
                          : u.roleId === 2
                            ? "admin"
                            : "client"}
                      </td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={u.roleId}
                          onChange={(e) =>
                            cambiarRolUsuario(u.id, e.target.value)
                          }
                          disabled={
                            u.email === usuarioActivo.email ||
                            actualizandoRol === u.id
                          }
                          style={{
                            backgroundColor: colores.background,
                            color: colores.textMain,
                            border: `1px solid ${colores.secondary}`,
                          }}
                        >
                          <option value={3}>client</option>
                          <option value={2}>admin</option>
                          <option value={1}>superadmin</option>
                        </Form.Select>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => borrarUsuario(u.id)}
                          disabled={
                            u.email === usuarioActivo.email ||
                            eliminandoUsuario === u.id
                          }
                        >
                          {eliminandoUsuario === u.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {/* Panel de administracion de compras */}
      {[1, 2].includes(usuarioActivo.roleId) && (
        <div
          className="mt-5 p-4 rounded"
          style={{
            backgroundColor: colores.card,
            border: `1px solid ${colores.primary}`,
          }}
        >
          <h3 style={{ color: colores.primary, marginBottom: "20px" }}>
            Administración de Compras
          </h3>

          {cargandoTodasLasCompras ? (
            <p>Cargando compras...</p>
          ) : errorTodasLasCompras ? (
            <p>{errorTodasLasCompras}</p>
          ) : todasLasCompras.length === 0 ? (
            <p>No hay compras registradas.</p>
          ) : (
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Videojuegos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {todasLasCompras.map((compra) => (
                  <tr key={compra.id}>
                    <td>{compra.id}</td>

                    <td>
                      {compra.usuario?.name || "Sin nombre"}
                      <br />
                      <small>{compra.usuario?.email || "Sin email"}</small>
                    </td>

                    <td>{new Date(compra.date).toLocaleDateString("es-AR")}</td>

                    <td>
                      {compra.detalleCompras?.map((detalle) => (
                        <div key={detalle.id}>
                          {detalle.videojuego?.name || "Videojuego"} x{" "}
                          {detalle.quantity}
                        </div>
                      ))}
                    </td>

                    <td>${Number(compra.total).toFixed(2)}</td>

                    <td>
                      <Form.Select
                        size="sm"
                        value={compra.status}
                        disabled={
                          compra.status !== "pending" ||
                          actualizandoCompra === compra.id
                        }
                        onChange={(e) =>
                          cambiarEstadoCompra(compra.id, e.target.value)
                        }
                        style={{
                          backgroundColor: colores.background,
                          color: colores.textMain,
                          border: `1px solid ${colores.secondary}`,
                        }}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="paid">Pagada</option>
                        <option value="cancelled">Cancelada</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}

export default Perfil;
