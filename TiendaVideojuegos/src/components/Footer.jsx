import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          {/* Información */}
          <Col md={4} className="mb-3">
            <h5>FlixGames</h5>
            <p className="text-secondary">
              Tu sitio para descubrir los mejores videojuegos,
              noticias y novedades del mundo gaming.
            </p>
          </Col>

          {/* Enlaces */}
          <Col md={4} className="mb-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/juegos" className="text-white text-decoration-none">
                  Juegos
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-white text-decoration-none">
                  Contacto
                </a>
              </li>
            </ul>
          </Col>

          {/* Redes */}
          <Col md={4} className="mb-3">
            <h5>Seguinos</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white text-decoration-none">
                Instagram
              </a>
              <a href="#" className="text-white text-decoration-none">
                Twitter
              </a>
              <a href="#" className="text-white text-decoration-none">
                Discord
              </a>
            </div>
          </Col>
        </Row>

        <hr />

        <div className="text-center text-secondary">
          <small>
            © 2026 FlixGames - Todos los derechos reservados.
          </small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;