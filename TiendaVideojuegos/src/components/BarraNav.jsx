import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { colores } from "../data/theme";
import logo from "../assets/img/Logo_flix_limpio.png";

function BarraNav() {
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
          href="#"
          style={{
            color: colores.textMain,
            fontWeight: "bold",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "30px", marginRight: "10px" }} />
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
            <Nav.Link href="#action1" style={{ color: colores.textMain }}>
              Catalogo
            </Nav.Link>
            <Nav.Link href="#action2" style={{ color: colores.textMain }}>
              Carrito
            </Nav.Link>

            <NavDropdown
              title={
                <span style={{ color: colores.textMain }}>Categorias</span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Accion</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Aventura</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">RPG</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#" disabled style={{ color: colores.textMuted }}>
              Usuario
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar juegos..."
              className="me-2"
              aria-label="Search"
              style={{
                backgroundColor: colores.background,
                color: colores.textMain,
                border: `1px solid ${colores.textMuted}`,
              }}
            />
            <Button
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
