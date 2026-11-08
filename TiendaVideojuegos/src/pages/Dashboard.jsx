import Carrusel from "../components/Carrusel";
import Tarjeta from "../components/Tarjeta";
import Categorias from "../components/Categorias";
import { colores } from "../data/theme";

function Dashboard({
  juegos,
  agregarAlCarrito,
  categorias,
  cargandoCategorias,
}) {
  const juegosDestacados = juegos.slice(3, 8);

  return (
    <>
      <Carrusel juegos={juegos} />
      <section className="container my-5">
        <div
          className="d-flex justify-content-between align-items-center pb-2 mb-4"
          style={{
            borderBottom: `2px solid ${colores.primary}`,
          }}
        >
          <h2
            className="m-0"
            style={{
              color: colores.textMain,
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Juegos Destacados
          </h2>

          <button
            onClick={() => navigate("/catalogo")}
            className="btn btn-sm"
            style={{
              backgroundColor: "transparent",
              color: colores.secondary,
              border: `1px solid ${colores.secondary}`,
              fontWeight: "bold",
            }}
          >
            Ver todos →
          </button>
        </div>

        <div
          className="Tarjetas"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {juegosDestacados.map((juego) => (
            <Tarjeta
              key={juego.id}
              juego={juego}
              title={juego.name}
              price={juego.price}
              image={juego.image}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </section>
      <section className="container my-5">
        <div
          className="pb-2 mb-4"
          style={{
            borderBottom: `2px solid ${colores.primary}`,
          }}
        >
          <h2
            className="m-0"
            style={{
              color: colores.textMain,
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Filtrar por categoria
          </h2>
        </div>
        <div className="Tarjetas">
          <Categorias
            categorias={categorias}
            cargandoCategorias={cargandoCategorias}
          />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
