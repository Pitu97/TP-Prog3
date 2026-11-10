import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Tarjeta({
  title,
  price,
  image,
  agregarAlCarrito,
  juego,
  eliminarJuego,
}) {
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
      className="tarjeta-videojuego"
      style={{
        width: "14rem",
        backgroundColor: colores.card,
        border: `1px solid ${colores.border}`,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        onClick={verDetalle}
        style={{
          height: "190px",
          width: "100%",
          objectFit: "cover",
          cursor: "pointer",
          display: "block",
          borderBottom: `1px solid ${colores.border}`,
        }}
      />

      <Card.Body>
        <Card.Title
          onClick={verDetalle}
          style={{
            color: colores.textMain,
            cursor: "pointer",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          {title}
        </Card.Title>

        <Card.Text
          style={{
            color: colores.primary,
            fontSize: "1.1rem",
            fontWeight: "700",
            marginTop: "8px",
          }}
        >
          Precio: ${price}
        </Card.Text>

        <Button
          onClick={() => agregarAlCarrito(juego)}
          style={{
            backgroundColor: colores.primary,
            color: colores.background,
            border: "none",
            borderRadius: "8px",
            width: "100%",
            fontWeight: "600",
            padding: "9px",
          }}
        >
          Agregar al carrito
        </Button>
        {esAdmin && (
          <Button
            className="mt-2 w-100"
            style={{
              borderRadius: "8px",
              fontWeight: "600",
            }}
            variant="warning"
            onClick={() => navigate(`/EditarJuego/${juego.id}`)}
          >
            Editar juego
          </Button>
        )}
        {esAdmin && (
          <Button
            className="mt-2 w-100"
            style={{
              borderRadius: "8px",
              fontWeight: "600",
            }}
            variant="danger"
            onClick={async () => {
              const confirmar = window.confirm(
                `¿Estás seguro de que querés eliminar ${juego.name}?`,
              );

              if (!confirmar) return;

              try {
                await eliminarJuego(juego.id);
                alert("Videojuego eliminado correctamente");
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            Eliminar juego
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;
