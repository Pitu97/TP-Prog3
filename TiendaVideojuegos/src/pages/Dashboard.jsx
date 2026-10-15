import BarraNav from "../components/BarraNav";
import Carrusel from "../components/Carrusel";
import Tarjeta from "../components/Tarjeta";
import Categorias from "../components/Categorias";
import Footer from "../components/Footer";

function Dashboard({ juegos }) {
  return (
    <>
      <BarraNav />
      <Carrusel />
      <section>
        <div className="Tarjetas">
          {juegos &&
            juegos.map((juego) => (
              <Tarjeta
                key={juego.id}
                title={juego.title}
                price={juego.price}
                image={juego.image}
              />
            ))}
        </div>
      </section>
      <section>
        <div className="Tarjetas">
          <Categorias />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
