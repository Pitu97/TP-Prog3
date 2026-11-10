import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Tarjeta from "../components/Tarjeta";
import { useTheme } from "../context/ThemeContext";

function DetalleJuego({ juegos, categorias, agregarAlCarrito }) {
  const { colores } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const juego = juegos.find((juego) => juego.id.toString() === id);

  const categoria = categorias.find(
    (categoria) => Number(categoria.id) === Number(juego?.categoryId),
  );

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
        otroJuego.id !== juego.id &&
        Number(otroJuego.categoryId) === Number(juego.categoryId),
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

      <h2>{juego.name}</h2>

      <div
        className="d-flex flex-wrap justify-content-around align-items-center gap-4 p-4 rounded"
        style={{
          backgroundColor: colores.card,
          color: colores.textMain,
          border: `1px solid ${colores.border}`,
          borderRadius: "12px",
        }}
      >
        <img
          src={juego.image}
          alt={juego.name}
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "250px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <div>
          <h3 style={{ color: colores.primary }}>Precio: ${Number(juego.price).toFixed(2)}</h3>
          <p style={{ color: colores.textMuted }}>Plataforma: {juego.platform || "No especificada"}</p>
          <p style={{ color: colores.textMuted }}>Categoria: {categoria?.name || "Sin categoria"}</p>

          <Button variant="success" onClick={() => agregarAlCarrito(juego)}>
            Agregar al carrito
          </Button>
        </div>
      </div>

      <section className="mt-4">
        <h3 style={{ color: colores.textMain }}>Descripción</h3>
        <p>
          {juego.description || "Todavía no hay una descripción disponible."}
        </p>
      </section>

      <section className="mt-5">
        <h3 style={{ color: colores.textMain }}>Juegos relacionados</h3>

        {juegosRelacionados.length === 0 ? (
          <p>No hay otros juegos del mismo género.</p>
        ) : (
          <div className="Tarjetas">
            {juegosRelacionados.map((otroJuego) => (
              <Tarjeta
                key={otroJuego.id}
                juego={otroJuego}
                title={otroJuego.name}
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
