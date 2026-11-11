import Carousel from "react-bootstrap/Carousel";
import { useTheme } from "../context/ThemeContext";

function Carrusel({ juegos }) {
  const { colores, modo } = useTheme();
  const juegosDestacados = juegos ? juegos.slice(0, 3) : [];

  const imagenesCarrusel = {
    "Elden Ring: Shadow of the Erdtree":
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",

    "Chrono Trigger Reborn":
      "https://cdn.akamai.steamstatic.com/steam/apps/613830/capsule_616x353.jpg",

    "God of War Ragnarök":
      "https://cdn.akamai.steamstatic.com/steam/apps/2322010/capsule_616x353.jpg",
  };

  return (
    <Carousel fade style={{ borderBottom: `2px solid ${colores.primary}` }}>
      {juegosDestacados.map((juego) => (
        <Carousel.Item key={juego.id}>
          <img
            src={imagenesCarrusel[juego.name] || juego.image}
            alt={juego.name}
            className="d-block w-100"
            style={{
              height: "clamp(220px, 40vw, 420px)",
              objectFit: "cover",
            }}
          />
          <Carousel.Caption
            style={{
              backgroundColor:
                modo === "oscuro"
                  ? "rgba(11, 13, 20, 0.85)"
                  : "rgba(255, 255, 255, 0.85)",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3 style={{ color: colores.textMain, fontWeight: "bold" }}>
              {juego.name}
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
