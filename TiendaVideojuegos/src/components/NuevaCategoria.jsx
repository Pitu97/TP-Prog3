import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Alert,
} from "react-bootstrap";

import {
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/api";
import { useTheme } from "../context/ThemeContext";

function NuevaCategoria({ categorias, setCategorias, cargandoCategorias }) {
  const { colores } = useTheme();
  const [nombre, setNombre] = useState("");
  const [nombreEdicion, setNombreEdicion] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const nombreRef = useRef(null);

  const [errores, setErrores] = useState({
    nombre: "",
  });

  const navigate = useNavigate();

  const validarCategoria = () => {
    const nuevosErrores = {
      nombre: "",
    };

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      nuevosErrores.nombre = "El nombre de la categoría es obligatorio.";
    } else if (nombreLimpio.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else if (
      categorias.some(
        (cat) =>
          cat.name.toLowerCase() === nombreLimpio.toLowerCase() &&
          Number(cat.id) !== Number(idEditando),
      )
    ) {
      nuevosErrores.nombre = "Ya existe una categoría con ese nombre.";
    }

    setErrores(nuevosErrores);

    if (nuevosErrores.nombre) {
      nombreRef.current.focus();
    }

    return !nuevosErrores.nombre;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMensaje("");

    if (!validarCategoria()) {
      return;
    }

    const nombreLimpio = nombre.trim();

    try {
      setGuardando(true);

      if (idEditando !== null) {
        const categoriaActualizada = await actualizarCategoria(
          idEditando,
          nombreLimpio,
        );

        setCategorias((prev) =>
          prev.map((cat) =>
            cat.id === idEditando ? categoriaActualizada : cat,
          ),
        );

        setMensaje("Categoría actualizada correctamente.");
        setIdEditando(null);
      } else {
        const nuevaCategoria = await crearCategoria(nombreLimpio);

        setCategorias((prev) => [...prev, nuevaCategoria]);

        setMensaje("Categoría creada correctamente.");
      }

      setNombre("");
    } catch (error) {
      setError(error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = (categoria) => {
    setIdEditando(categoria.id);
    setNombre(categoria.name);
    setError("");
    setMensaje("");
  };

  const cancelarEdicion = () => {
    setIdEditando(null);
    setNombre("");
    setError("");
    setMensaje("");
  };

  const handleEliminar = async (categoria) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que querés eliminar la categoría "${categoria.name}"?`,
    );

    if (!confirmar) return;

    try {
      setError("");
      setMensaje("");

      await eliminarCategoria(categoria.id);

      setCategorias((prev) => prev.filter((cat) => cat.id !== categoria.id));

      if (idEditando === categoria.id) {
        cancelarEdicion();
      }

      setMensaje("Categoría eliminada correctamente.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={9} lg={7}>
          <div
            style={{
              backgroundColor: colores.card,
              border: `1px solid ${colores.border}`,
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.10)",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: colores.primary }}>
              Administrar categorías
            </h2>

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            {mensaje && (
              <Alert
                variant="success"
                dismissible
                onClose={() => setMensaje("")}
              >
                {mensaje}
              </Alert>
            )}

            <h5 className="mb-3" style={{ color: colores.textMain }}>
              {idEditando !== null
                ? "Editar categoría"
                : "Crear nueva categoría"}
            </h5>

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: colores.textMain }}>
                  Nombre de la categoría
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Ejemplo: Aventura"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  ref={nombreRef}
                  isInvalid={!!errores.nombre}
                  required
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
                />
                {errores.nombre && (
                  <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  disabled={guardando}
                  style={{
                    backgroundColor: colores.primary,
                    color: colores.background,
                    border: "none",
                    borderRadius: "8px",
                    padding: "9px 18px",
                    fontWeight: "600",
                  }}
                >
                  {guardando
                    ? "Guardando..."
                    : idEditando !== null
                      ? "Guardar cambios"
                      : "Crear categoría"}
                </Button>

                {idEditando !== null && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={cancelarEdicion}
                    disabled={guardando}
                    style={{
                      backgroundColor: colores.surface,
                      color: colores.textMain,
                      border: `1px solid ${colores.border}`,
                      borderRadius: "8px",
                      padding: "9px 18px",
                      fontWeight: "600",
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </Form>

            <hr className="my-4" />

            <h5 className="mb-3" style={{ color: colores.textMain }}>
              Categorías existentes
            </h5>

            {cargandoCategorias ? (
              <p>Cargando categorías...</p>
            ) : categorias.length === 0 ? (
              <p>Todavía no hay categorías.</p>
            ) : (
              <ListGroup>
                {categorias.map((cat) => (
                  <ListGroup.Item
                    key={cat.id}
                    className="d-flex justify-content-between align-items-center gap-2"
                    style={{
                      backgroundColor: colores.card,
                      color: colores.textMain,
                      borderColor: colores.border,
                    }}
                  >
                    <span style={{ color: colores.textMain }}>{cat.name}</span>

                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditar(cat)}
                        style={{
                          borderRadius: "8px",
                          fontWeight: "600",
                        }}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminar(cat)}
                        style={{
                          borderRadius: "8px",
                          fontWeight: "600",
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            <div className="d-grid mt-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Volver
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NuevaCategoria;
