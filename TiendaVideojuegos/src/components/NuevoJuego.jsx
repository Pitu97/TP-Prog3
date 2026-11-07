
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function NuevoJuego({ agregarJuego }) {
  const [juego, setJuego] = useState({
    name: "",
    description: "",
    price: "",
    platform: "",
    categoryId: "",
    image: ""
  });

  const handleChange = (e) => {
    setJuego({
      ...juego,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoJuego = {
      ...juego,
      price: Number(juego.price),
      categoryId: Number(juego.categoryId)
    };

    console.log("Juego enviado:", nuevoJuego);

    agregarJuego(nuevoJuego);

    alert("Juego agregado correctamente");

    setJuego({
      name: "",
      description: "",
      price: "",
      platform: "",
      categoryId: "",
      image: ""
    });
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4 text-center">
            Agregar nuevo juego
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del juego</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={juego.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={juego.description}
                onChange={handleChange}
                required
              />
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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plataforma</Form.Label>
              <Form.Select
                name="platform"
                value={juego.platform}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar plataforma</option>
                <option value="PC">PC</option>
                <option value="PS5">PS5</option>
                <option value="Xbox">Xbox</option>
                <option value="Switch">Switch</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="categoryId"
                value={juego.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar género</option>
                <option value="1">Acción</option>
                <option value="2">RPG</option>
                <option value="3">Cyberpunk</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={juego.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">
                Agregar juego
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NuevoJuego;
