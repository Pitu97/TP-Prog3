import BarraNav from "../components/BarraNav";
import Tarjeta from "../components/Tarjeta";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";

function Catalogo() {
  return (
    <>
      <BarraNav />
      <h2>Catalogo</h2>
      <div style={{ backgroundColor: "darkblue", height: "200px" }}>
        <Form>
          {["checkbox", "checkbox", "checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
              />
            </div>
          ))}
        </Form>
      </div>
      <section>
        <div className="Tarjetas">
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Catalogo;
