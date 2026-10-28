import { useState } from "react";
import Tarjeta from "../components/Tarjeta";
import Form from "react-bootstrap/Form";
import { colores } from "../data/theme";

function Catalogo({ juegos }) {
  const [busqueda, setBusqueda] = useState("");
  const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);

  const listaPlataformas = ["PC", "PS5", "Switch"];
  const listaGeneros = ["Cyberpunk", "RPG", "Action"];

  const handlePlataformaChange = (plataforma) => {
    if (plataformasSeleccionadas.includes(plataforma)) {
      setPlataformasSeleccionadas(
        plataformasSeleccionadas.filter((item) => item !== plataforma),
      );
    } else {
      setPlataformasSeleccionadas([...plataformasSeleccionadas, plataforma]);
    }
  };

  const handleGeneroChange = (genero) => {
    if (generosSeleccionados.includes(genero)) {
      setGenerosSeleccionados(
        generosSeleccionados.filter((item) => item !== genero),
      );
    } else {
      setGenerosSeleccionados([...generosSeleccionados, genero]);
    }
  };

  const juegosFiltrados = juegos
    ? juegos.filter((juego) => {
        const coincideNombre = juego.title
          .toLowerCase()
          .includes(busqueda.toLowerCase());

        const coincidePlataforma =
          plataformasSeleccionadas.length === 0 ||
          plataformasSeleccionadas.includes(juego.platform);

        const coincideGenero =
          generosSeleccionados.length === 0 ||
          generosSeleccionados.includes(juego.genre);

        return coincideNombre && coincidePlataforma && coincideGenero;
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
          <Form.Group className="mb-3" controlId="searchGame">
            <Form.Control
              type="text"
              placeholder="Buscar juego"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              style={{
                backgroundColor: colores.background,
                color: colores.textMain,
                border: `1px solid ${colores.secondary}`,
              }}
            />
          </Form.Group>

          <div className="d-flex gap-5 flex-wrap">
            <div>
              <h6 style={{ color: colores.primary }}>Plataformas</h6>
              {listaPlataformas.map((plataforma, index) => (
                <Form.Check
                  key={`plat-${index}`}
                  type="checkbox"
                  id={`plat-${index}`}
                  label={plataforma}
                  checked={plataformasSeleccionadas.includes(plataforma)}
                  onChange={() => handlePlataformaChange(plataforma)}
                />
              ))}
            </div>

            <div>
              <h6 style={{ color: colores.primary }}>Categorias</h6>
              {listaGeneros.map((genero, index) => (
                <Form.Check
                  key={`gen-${index}`}
                  type="checkbox"
                  id={`gen-${index}`}
                  label={genero}
                  checked={generosSeleccionados.includes(genero)}
                  onChange={() => handleGeneroChange(genero)}
                />
              ))}
            </div>
          </div>
        </Form>
      </div>

      <section>
        <div className="Tarjetas d-flex justify-content-center flex-wrap gap-3">
          {juegosFiltrados.map((juego) => (
            <Tarjeta
              key={juego.id}
              title={juego.title}
              price={juego.price}
              image={juego.image}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Catalogo;
