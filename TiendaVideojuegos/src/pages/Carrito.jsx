import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Carrito() {
  return (
    <>
      <BarraNav />
      <h2>Carrito</h2>
      <div className="Tarjetas">
        <div>
          <Row xs={1} md={1} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Juego</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </Card.Text>
                  </Card.Body>
                  <button>+</button>
                  <button>-</button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Resumen</Card.Title>
              <Card.Text>
                Total: $$$
              </Card.Text>
            </Card.Body>
            <button>Comprar</button>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Carrito;
