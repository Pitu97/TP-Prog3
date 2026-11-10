import { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

function NuevoJuego({ agregarJuego, categorias, cargandoCategorias }) {
  const { colores } = useTheme();
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [juego, setJuego] = useState({
    name: "",
    description: "",
    price: "",
    platform: "",
    categoryId: "",
    image: "",
  });

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

    if (!juego.price.trim()) {
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

    const nuevoJuego = {
      ...juego,
      price: Number(juego.price),
      categoryId: Number(juego.categoryId),
    };

    try {
      await agregarJuego(nuevoJuego);

      alert("Juego agregado correctamente");

      setJuego({
        name: "",
        description: "",
        price: "",
        platform: "",
        categoryId: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      setError(error.message || "No se pudo agregar el videojuego");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div
            style={{
              backgroundColor: colores.card,
              border: `1px solid ${colores.border}`,
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.10)",
            }}
          >
            <h2 className="mb-4 text-center" style={{ color: colores.primary }}>
              Agregar nuevo juego
            </h2>

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: colores.textMain }}>
                  Nombre del juego
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={juego.name}
                  onChange={handleChange}
                  ref={nombreRef}
                  isInvalid={!!errores.name}
                  required
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
                />
                {errores.name && (
                  <Form.Control.Feedback type="invalid">
                    {errores.name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: colores.textMain }}>
                  Descripción
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={juego.description}
                  onChange={handleChange}
                  ref={descripcionRef}
                  isInvalid={!!errores.description}
                  required
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
                />
                {errores.description && (
                  <Form.Control.Feedback type="invalid">
                    {errores.description}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: colores.textMain }}>
                  Precio
                </Form.Label>
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
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
                />
                {errores.price && (
                  <Form.Control.Feedback type="invalid">
                    {errores.price}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: colores.textMain }}>
                  Plataforma
                </Form.Label>
                <Form.Select
                  name="platform"
                  value={juego.platform}
                  onChange={handleChange}
                  ref={plataformaRef}
                  isInvalid={!!errores.platform}
                  required
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
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
                <Form.Label style={{ color: colores.textMain }}>
                  Género
                </Form.Label>
                <Form.Select
                  name="categoryId"
                  value={juego.categoryId}
                  onChange={handleChange}
                  ref={categoriaRef}
                  isInvalid={!!errores.categoryId}
                  required
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
                >
                  <option value="">
                    {cargandoCategorias
                      ? "Cargando categorías..."
                      : "Seleccionar género"}
                  </option>

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
                <Form.Label style={{ color: colores.textMain }}>
                  URL de la imagen
                </Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={juego.image}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  ref={imagenRef}
                  isInvalid={!!errores.image}
                  required
                  style={{
                    backgroundColor: colores.background,
                    color: colores.textMain,
                    border: `1px solid ${colores.border}`,
                  }}
                />
                {errores.image && (
                  <Form.Control.Feedback type="invalid">
                    {errores.image}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {error && <p className="text-danger mb-3">{error}</p>}

              <div className="d-grid">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: colores.primary,
                    color: colores.background,
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontWeight: "600",
                  }}
                  disabled={guardando || cargandoCategorias}
                >
                  {guardando ? "Guardando..." : "Agregar juego"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NuevoJuego;
