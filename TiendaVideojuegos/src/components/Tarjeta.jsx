import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { colores } from "../data/theme";

function Tarjeta() {
  return (
    <Card
      style={{ width: "14rem", backgroundColor: colores.card, border: "none" }}
    >
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title style={{ color: colores.textMain }}>Juego</Card.Title>
        <Card.Text style={{ color: colores.primary }}>
          Precio: Muy caro para vos
        </Card.Text>
        <Button
          style={{
            backgroundColor: colores.secondary,
            color: colores.textMain,
            border: "none",
          }}
        >
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;
