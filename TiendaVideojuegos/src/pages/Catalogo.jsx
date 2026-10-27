import { useState } from "react";
import Tarjeta from "../components/Tarjeta";
import Form from "react-bootstrap/Form";
import { colores } from "../data/theme";

function Catalogo({ juegos, agregarAlCarrito }) {
  const [plataformas, setPlataformas] = useState([]);
  const [generos, setGeneros] = useState([]);

  const listaPlataformas = ["PC", "PS5", "Switch", "Xbox"];
  const listaGeneros = ["Action / RPG", "Cyberpunk", "RPG", "Action"];

  const togglePlataforma = (plat) => {
    if (plataformas.includes(plat)) {
      setPlataformas(plataformas.filter((item) => item !== plat));
    } else {
      setPlataformas([...plataformas, plat]);
    }
  };

  const toggleGenero = (gen) => {
    if (generos.includes(gen)) {
      setGeneros(generos.filter((item) => item !== gen));
    } else {
      setGeneros([...generos, gen]);
    }
  };

  const juegosFiltrados = juegos
    ? juegos.filter((juego) => {
        const pasaPlataforma =
          plataformas.length === 0 || plataformas.includes(juego.platform);

        const pasaGenero =
          generos.length === 0 || generos.includes(juego.genre);

        return pasaPlataforma && pasaGenero;
      })
    : [];

  return (
    <>
      <h2 style={{ color: colores.textMain, margin: "20px" }}>
        Catálogo
      </h2>

      <div
        style={{
          backgroundColor: colores.card,
          padding: "20px",
          margin: "20px",
          borderRadius: "8px",
          border: `1px solid ${colores.primary}`,
          color: colores.textMain,
        }}
      >
        <Form className="d-flex gap-5">
          <div>
            <h6 style={{ color: colores.primary }}>Plataformas</h6>

            {listaPlataformas.map((plat) => (
              <Form.Check
                key={plat}
                type="checkbox"
                id={plat}
                label={plat}
                checked={plataformas.includes(plat)}
                onChange={() => togglePlataforma(plat)}
              />
            ))}
          </div>

          <div>
            <h6 style={{ color: colores.primary }}>Categorías</h6>

            {listaGeneros.map((gen) => (
              <Form.Check
                key={gen}
                type="checkbox"
                id={gen}
                label={gen}
                checked={generos.includes(gen)}
                onChange={() => toggleGenero(gen)}
              />
            ))}
          </div>
        </Form>
      </div>

      <section>
        <div className="Tarjetas d-flex justify-content-center flex-wrap gap-3">
          {juegosFiltrados.map((juego) => (
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