import Carrusel from "../components/Carrusel";
import Tarjeta from "../components/Tarjeta";
import Categorias from "../components/Categorias";

function Dashboard({ juegos, agregarAlCarrito }) {
  return (
    <>
      <Carrusel juegos={juegos} />
      <section>
        <div className="Tarjetas">
          {juegos &&
            juegos.map((juego) => (
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
      <section>
        <div className="Tarjetas">
          <Categorias />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
