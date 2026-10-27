import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Tarjeta from "../components/Tarjeta";

function DetalleJuego({ juegos, agregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const juego = juegos.find((juego) => juego.id.toString() === id);

  if (!juego) {
    return (
      <div className="container mt-4">
        <h2>No se encontró el videojuego.</h2>
        <Button onClick={() => navigate("/catalogo")}>
          Volver al catálogo
        </Button>
      </div>
    );
  }

  const juegosRelacionados = juegos
    .filter(
      (otroJuego) =>
        otroJuego.id !== juego.id && otroJuego.genre === juego.genre
    )
    .slice(0, 4);

  return (
    <div className="container mt-4 mb-5">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate("/catalogo")}
      >
        Volver al catálogo
      </Button>

      <h2>{juego.title}</h2>

      <div
        className="d-flex flex-wrap justify-content-around align-items-center gap-4 p-4 rounded"
        style={{ backgroundColor: "darkblue", color: "white" }}
      >
        <img
          src={juego.image}
          alt={juego.title}
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "250px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <div>
          <h3>Precio: ${Number(juego.price).toFixed(2)}</h3>
          <p>Plataforma: {juego.platform || "No especificada"}</p>
          <p>Género: {juego.genre || "No especificado"}</p>

          <Button
            variant="success"
            onClick={() => agregarAlCarrito(juego)}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>

      <section className="mt-4">
        <h3>Descripción</h3>
        <p>
          {juego.description || "Todavía no hay una descripción disponible."}
        </p>
      </section>

      <section className="mt-5">
        <h3>Juegos relacionados</h3>

        {juegosRelacionados.length === 0 ? (
          <p>No hay otros juegos del mismo género.</p>
        ) : (
          <div className="Tarjetas">
            {juegosRelacionados.map((otroJuego) => (
              <Tarjeta
                key={otroJuego.id}
                juego={otroJuego}
                title={otroJuego.title}
                price={otroJuego.price}
                image={otroJuego.image}
                agregarAlCarrito={agregarAlCarrito}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DetalleJuego;