import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTheme } from "../context/ThemeContext";

function Footer() {
  const { colores } = useTheme();

  return (
    <footer
      className="mt-5 py-4"
      style={{
        backgroundColor: colores.card,
        borderTop: `2px solid ${colores.primary}`,
        color: colores.textMain,
      }}
    >
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 style={{ color: colores.primary, fontWeight: "bold" }}>
              FlixGames
            </h5>
            <p style={{ color: colores.textMuted }}>
              Somos una tienda de videojuegos digitales para todas las
              plataformas.
            </p>
          </Col>

          <Col md={8}>
            <Row>
              <Col sm={4} className="mb-3">
                <h5 style={{ color: colores.textMain, fontWeight: "bold" }}>
                  Enlaces
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="/"
                      className="text-decoration-none"
                      style={{ color: colores.textMuted }}
                    >
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a
                      href="/catalogo"
                      className="text-decoration-none"
                      style={{ color: colores.textMuted }}
                    >
                      Juegos
                    </a>
                  </li>
                  <li>
                    <a
                      href="/perfil"
                      className="text-decoration-none"
                      style={{ color: colores.textMuted }}
                    >
                      Tu perfil
                    </a>
                  </li>
                </ul>
              </Col>

              <Col sm={4} className="mb-3">
                <h5 style={{ color: colores.textMain, fontWeight: "bold" }}>
                  Seguinos
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{ color: colores.secondary }}
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{ color: colores.secondary }}
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{ color: colores.secondary }}
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </Col>

              <Col sm={4} className="mb-3">
                <h5 style={{ color: colores.textMain, fontWeight: "bold" }}>
                  Contacto
                </h5>
                <p style={{ color: colores.textMuted, marginBottom: "5px" }}>
                  Tel: +54 341 4000000
                </p>
                <p style={{ color: colores.textMuted }}>
                  Email: soporte@flixgames.com
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <hr style={{ borderColor: colores.textMuted, opacity: 0.2 }} />

        <div className="text-center">
          <small style={{ color: colores.textMuted }}>
            &copy; 2026 FlixGames - Todos los derechos reservados.
          </small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
