import BarraNav from "../components/BarraNav";
import Tarjeta from "../components/Tarjeta";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";

function Catalogo({ juegos }) {
  return (
    <>
      <BarraNav />
      <h2>Catalogo</h2>
      <div style={{ backgroundColor: "darkblue", height: "200px" }}>
        <Form>
          {["checkbox", "checkbox", "checkbox"].map((type, index) => (
            <div key={`default-${type}-${index}`} className="mb-3">
              <Form.Check
                type={type}
                id={`default-${type}-${index}`}
                label={`default ${type}`}
              />
            </div>
          ))}
        </Form>
      </div>
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
      <Footer />
    </>
  );
}

export default Catalogo;
