import { useState } from "react";
import Tarjeta from "../components/Tarjeta";
import Form from "react-bootstrap/Form";
import { useTheme } from "../context/ThemeContext";

function Catalogo({ juegos, agregarAlCarrito, busqueda, setBusqueda }) {
  const [plataformas, setPlataformas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const { colores } = useTheme();

  const listaPlataformas = ["PC", "PS5", "Switch"];
  const listaGeneros = ["Cyberpunk", "RPG", "Action"];

  const togglePlataforma = (plat) => {
    if (plataformas.includes(plat)) {
      setPlataformas(plataformas.filter((item) => itemñ !== plat));
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
        const pasaNombre = juego.title
          .toLowerCase()
          .includes((busqueda || "").toLowerCase());

        const pasaPlataforma =
          plataformas.length === 0 || plataformas.includes(juego.platform);

        const pasaGenero =
          generos.length === 0 || generos.includes(juego.genre);

        return pasaNombre && pasaPlataforma && pasaGenero;
      })
    : [];

  return (
    <>
      <h2 style={{ color: colores.textMain, margin: "20px" }}>Catalogo</h2>

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
        <Form>
          <Form.Group style={{ marginBottom: "20px" }} controlId="searchGame">
            <Form.Control
              type="text"
              placeholder="Buscar juego por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                backgroundColor: colores.background,
                color: colores.textMain,
                border: `1px solid ${colores.secondary}`,
              }}
            />
          </Form.Group>

          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
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
              <h6 style={{ color: colores.primary }}>Categorias</h6>
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
          </div>
        </Form>
      </div>

      <section>
        <div
          className="Tarjetas"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
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
