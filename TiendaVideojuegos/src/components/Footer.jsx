import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { colores } from "../data/theme";

function Footer() {
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
              Tu sitio para descubrir los mejores videojuegos, noticias y
              novedades del mundo gaming.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h5 style={{ color: colores.textMain }}>Enlaces</h5>
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
                  href="/juegos"
                  className="text-decoration-none"
                  style={{ color: colores.textMuted }}
                >
                  Juegos
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  className="text-decoration-none"
                  style={{ color: colores.textMuted }}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5 style={{ color: colores.textMain }}>Seguinos</h5>
            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: colores.secondary }}
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: colores.secondary }}
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: colores.secondary }}
              >
                Discord
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: colores.textMuted, opacity: 0.2 }} />

        <div className="text-center">
          <small style={{ color: colores.textMuted }}>
            © 2026 FlixGames - Todos los derechos reservados.
          </small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
