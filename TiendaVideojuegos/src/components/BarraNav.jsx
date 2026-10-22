
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { colores } from "../data/theme";
import logo from "../assets/img/Logo_flix_limpio.png";
import { useNavigate } from "react-router-dom";

function BarraNav() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: colores.card,
        borderBottom: `2px solid ${colores.primary}`,
      }}
    >
      <Container fluid>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{
            color: colores.textMain,
            fontWeight: "bold",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src={logo}
            alt="Logo Flix Games"
            style={{ height: "30px", marginRight: "10px" }}
          />
          Flix Games
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: colores.textMuted }}
        />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={() => navigate("/catalogo")}
              style={{ color: colores.textMain, cursor: "pointer" }}
            >
              Catálogo
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/carrito")}
              style={{ color: colores.textMain, cursor: "pointer" }}
            >
              Carrito
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/NuevoJuego")}
              style={{ color: colores.textMain, cursor: "pointer" }}
            >
              Agregar juego
            </Nav.Link>

            <NavDropdown
              title={
                <span style={{ color: colores.textMain }}>
                  Categorías
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item
                onClick={() => navigate("/catalogo")}
              >
                Acción
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate("/catalogo")}
              >
                Aventura
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={() => navigate("/catalogo")}
              >
                RPG
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              onClick={() => navigate("/perfil")}
              style={{ color: colores.textMain, cursor: "pointer" }}
            >
              Usuario
            </Nav.Link>
          </Nav>

          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/catalogo");
            }}
          >
            <Form.Control
              type="search"
              placeholder="Buscar juegos..."
              className="me-2"
              aria-label="Buscar juegos"
              style={{
                backgroundColor: colores.background,
                color: colores.textMain,
                border: `1px solid ${colores.textMuted}`,
              }}
            />

            <Button
              type="submit"
              style={{
                backgroundColor: colores.secondary,
                color: colores.textMain,
                border: "none",
              }}
            >
              Buscar
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNav;
