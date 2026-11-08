import { useState } from "react";
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

function NuevaCategoria({ categorias, setCategorias, cargandoCategorias }) {
  const [nombre, setNombre] = useState("");
  const [nombreEdicion, setNombreEdicion] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setError("Ingresá un nombre para la categoría.");
      return;
    }

    const yaExiste = categorias.some(
      (cat) =>
        cat.name.toLowerCase() === nombreLimpio.toLowerCase() &&
        cat.id !== idEditando,
    );

    if (yaExiste) {
      setError("Ya existe una categoría con ese nombre.");
      return;
    }

    try {
      setGuardando(true);
      setError("");
      setMensaje("");

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
          <h2 className="text-center mb-4">Administrar categorías</h2>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {mensaje && (
            <Alert variant="success" dismissible onClose={() => setMensaje("")}>
              {mensaje}
            </Alert>
          )}

          <h5 className="mb-3">
            {idEditando !== null ? "Editar categoría" : "Crear nueva categoría"}
          </h5>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la categoría</Form.Label>

              <Form.Control
                type="text"
                placeholder="Ejemplo: Aventura"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" disabled={guardando}>
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
                >
                  Cancelar
                </Button>
              )}
            </div>
          </Form>

          <hr className="my-4" />

          <h5 className="mb-3">Categorías existentes</h5>

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
                >
                  <span>{cat.name}</span>

                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditar(cat)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEliminar(cat)}
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
        </Col>
      </Row>
    </Container>
  );
}

export default NuevaCategoria;
