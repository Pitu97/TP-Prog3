import Carousel from "react-bootstrap/Carousel";
import { colores } from "../data/theme";

function Carrusel({ juegos }) {
  const juegosDestacados = juegos ? juegos.slice(0, 3) : [];

  return (
    <Carousel fade style={{ borderBottom: `2px solid ${colores.primary}` }}>
      {juegosDestacados.map((juego) => (
        <Carousel.Item key={juego.id}>
          <img
            src={juego.image}
            alt={juego.title}
            className="d-block w-100"
            style={{ height: "600px", objectFit: "cover" }}
          />
          <Carousel.Caption
            style={{
              backgroundColor: "rgba(11, 13, 20, 0.75)",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3 style={{ color: colores.textMain, fontWeight: "bold" }}>
              {juego.title}
            </h3>
            <p
              style={{ color: colores.primary, fontSize: "1.2rem", margin: 0 }}
            >
              ${juego.price}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
