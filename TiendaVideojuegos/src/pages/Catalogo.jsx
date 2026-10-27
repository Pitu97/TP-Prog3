
import Tarjeta from "../components/Tarjeta";

import Form from "react-bootstrap/Form";

function Catalogo({ juegos, agregarAlCarrito }) {
  return (
    <>

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
                juego={juego}
                title={juego.title}
                price={juego.price}
                image={juego.image}
                agregarAlCarrito={agregarAlCarrito}
              />
            ))}
        </div>
      </section>

    </>
  );
}

export default Catalogo;
