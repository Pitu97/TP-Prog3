import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { colores } from "../data/theme";

function Tarjeta({ title, price, image }) {
  return (
    <Card
      style={{ width: "14rem", backgroundColor: colores.card, border: "none" }}
    >
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title style={{ color: colores.textMain }}>{title}</Card.Title>
        <Card.Text style={{ color: colores.primary }}>
          Precio: ${price}
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
