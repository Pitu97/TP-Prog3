import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Tarjeta({ title, price, image, agregarAlCarrito, juego }) {
  const navigate = useNavigate();
  const { colores } = useTheme();
  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null",
  );

  const esAdmin = usuarioActivo?.roleId === 1 || usuarioActivo?.roleId === 2;

  const verDetalle = () => {
    if (juego) {
      navigate(`/detalleJuego/${juego.id}`);
    }
  };

  return (
    <Card
      style={{
        width: "14rem",
        backgroundColor: colores.card,
        border: "none",
      }}
    >
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        onClick={verDetalle}
        style={{
          height: "200px",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      <Card.Body>
        <Card.Title
          onClick={verDetalle}
          style={{
            color: colores.textMain,
            cursor: "pointer",
          }}
        >
          {title}
        </Card.Title>

        <Card.Text style={{ color: colores.primary }}>
          Precio: ${price}
        </Card.Text>

        <Button
          onClick={() => agregarAlCarrito(juego)}
          style={{
            backgroundColor: colores.secondary,
            color: colores.textMain,
            border: "none",
          }}
        >
          Agregar al carrito
        </Button>
        {esAdmin && (
          <Button
            className="mt-2 w-100"
            variant="warning"
            onClick={() => navigate(`/EditarJuego/${juego.id}`)}
          >
            Editar juego
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;
