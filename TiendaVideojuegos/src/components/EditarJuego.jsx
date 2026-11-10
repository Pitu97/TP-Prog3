import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function EditarJuego({
  juegos,
  editarJuego,
  categorias,
  cargandoCategorias,
  cargandoJuegos,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const juegoEncontrado = juegos.find(
    (juego) => Number(juego.id) === Number(id),
  );

  const [juego, setJuego] = useState({
    name: "",
    description: "",
    price: "",
    platform: "",
    categoryId: "",
    image: "",
  });

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);
  const precioRef = useRef(null);
  const plataformaRef = useRef(null);
  const categoriaRef = useRef(null);
  const imagenRef = useRef(null);

  const [errores, setErrores] = useState({
    name: "",
    description: "",
    price: "",
    platform: "",
    categoryId: "",
    image: "",
  });

  useEffect(() => {
    if (juegoEncontrado) {
      setJuego({
        name: juegoEncontrado.name,
        description: juegoEncontrado.description,
        price: juegoEncontrado.price,
        platform: juegoEncontrado.platform,
        categoryId: juegoEncontrado.categoryId,
        image: juegoEncontrado.image,
      });
    }
  }, [juegoEncontrado]);

  const handleChange = (e) => {
    setJuego({
      ...juego,
      [e.target.name]: e.target.value,
    });
  };

  const validarJuego = () => {
    const nuevosErrores = {
      name: "",
      description: "",
      price: "",
      platform: "",
      categoryId: "",
      image: "",
    };

    if (!juego.name.trim()) {
      nuevosErrores.name = "El nombre del juego es obligatorio.";
    }

    if (!juego.description.trim()) {
      nuevosErrores.description = "La descripción es obligatoria.";
    }

    if (!juego.price.toString().trim()) {
      nuevosErrores.price = "El precio es obligatorio.";
    } else if (
      !Number.isFinite(Number(juego.price)) ||
      Number(juego.price) <= 0
    ) {
      nuevosErrores.price = "El precio debe ser mayor que cero.";
    }

    if (!["PC", "PS5", "Xbox", "Switch"].includes(juego.platform)) {
      nuevosErrores.platform = "Seleccioná una plataforma.";
    }

    if (
      !juego.categoryId ||
      !categorias.some((cat) => Number(cat.id) === Number(juego.categoryId))
    ) {
      nuevosErrores.categoryId = "Seleccioná un género válido.";
    }

    if (!juego.image.trim()) {
      nuevosErrores.image = "La URL de la imagen es obligatoria.";
    } else {
      try {
        const url = new URL(juego.image);

        if (!["http:", "https:"].includes(url.protocol)) {
          nuevosErrores.image = "Ingresá una URL válida.";
        }
      } catch {
        nuevosErrores.image = "Ingresá una URL válida.";
      }
    }

    setErrores(nuevosErrores);

    if (nuevosErrores.name) {
      nombreRef.current.focus();
    } else if (nuevosErrores.description) {
      descripcionRef.current.focus();
    } else if (nuevosErrores.price) {
      precioRef.current.focus();
    } else if (nuevosErrores.platform) {
      plataformaRef.current.focus();
    } else if (nuevosErrores.categoryId) {
      categoriaRef.current.focus();
    } else if (nuevosErrores.image) {
      imagenRef.current.focus();
    }

    return !Object.values(nuevosErrores).some((mensaje) => mensaje !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarJuego()) {
      return;
    }
    setGuardando(true);

    const datosActualizados = {
      ...juego,
      price: Number(juego.price),
      categoryId: Number(juego.categoryId),
    };

    try {
      await editarJuego(id, datosActualizados);

      alert("Videojuego actualizado correctamente");
      navigate("/catalogo");
    } catch (error) {
      console.error(error);
      setError(error.message || "No se pudo actualizar el videojuego");
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoJuegos || cargandoCategorias) {
    return <p className="text-center mt-4">Cargando datos...</p>;
  }

  if (!juegoEncontrado) {
    return (
      <Container className="mt-4">
        <h3>No se encontró el videojuego.</h3>
        <Button onClick={() => navigate("/catalogo")}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4 text-center">Editar videojuego</h2>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del juego</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={juego.name}
                onChange={handleChange}
                ref={nombreRef}
                isInvalid={!!errores.name}
                required
              />
              {errores.name && (
                <Form.Control.Feedback type="invalid">
                  {errores.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={juego.description}
                onChange={handleChange}
                ref={descripcionRef}
                isInvalid={!!errores.description}
                required
              />
              {errores.description && (
                <Form.Control.Feedback type="invalid">
                  {errores.description}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={juego.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                ref={precioRef}
                isInvalid={!!errores.price}
                required
              />
              {errores.price && (
                <Form.Control.Feedback type="invalid">
                  {errores.price}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plataforma</Form.Label>
              <Form.Select
                name="platform"
                value={juego.platform}
                onChange={handleChange}
                ref={plataformaRef}
                isInvalid={!!errores.platform}
                required
              >
                <option value="">Seleccionar plataforma</option>
                <option value="PC">PC</option>
                <option value="PS5">PS5</option>
                <option value="Xbox">Xbox</option>
                <option value="Switch">Switch</option>
              </Form.Select>
              {errores.platform && (
                <Form.Control.Feedback type="invalid">
                  {errores.platform}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="categoryId"
                value={juego.categoryId}
                onChange={handleChange}
                ref={categoriaRef}
                isInvalid={!!errores.categoryId}
                required
              >
                <option value="">Seleccionar género</option>

                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
              {errores.categoryId && (
                <Form.Control.Feedback type="invalid">
                  {errores.categoryId}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={juego.image}
                onChange={handleChange}
                ref={imagenRef}
                isInvalid={!!errores.image}
                required
              />
              {errores.image && (
                <Form.Control.Feedback type="invalid">
                  {errores.image}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {error && <p className="text-danger mb-3">{error}</p>}

            <div className="d-grid gap-2">
              <Button type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar cambios"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/catalogo")}
                disabled={guardando}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditarJuego;
