import { useState } from "react";
import Tarjeta from "../components/Tarjeta";
import Form from "react-bootstrap/Form";
import { useTheme } from "../context/ThemeContext";

function Catalogo({ juegos, agregarAlCarrito, busqueda, setBusqueda }) {
  const [plataformas, setPlataformas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const { colores } = useTheme();

  const listaPlataformas = ["PC", "PS5", "Switch"];
  const listaCategorias = [
    {id: 1, name: "Action"},
    {id: 2, name: "RPG"},
    {id: 3, name: "Cyberpunk"}
  ];

  const togglePlataforma = (plat) => {
    if (plataformas.includes(plat)) {
      setPlataformas(plataformas.filter((item) => item !== plat));
    } else {
      setPlataformas([...plataformas, plat]);
    }
  };

  const toggleCategoria = (id) => {
    if (categorias.includes(id)) {
      setCategorias(categorias.filter((item) => item !== id));
    } else {
      setCategorias([...categorias, id]);
    }
  };

  const juegosFiltrados = juegos
    ? juegos.filter((juego) => {
        const pasaNombre = juego.title
          .toLowerCase()
          .includes((busqueda || "").toLowerCase());

        const pasaPlataforma =
          plataformas.length === 0 || plataformas.includes(juego.platform);

        const pasaCategoria =
          categorias.length === 0 || categorias.includes(Number(juego.categoryId));

        return pasaNombre && pasaPlataforma && pasaCategoria;
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
              {listaCategorias.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  id={`categoria-${cat.id}`}
                  label={cat.name}
                  checked={categorias.includes(cat.id)}
                  onChange={() => toggleCategoria(cat.id)}
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
              title={juego.name}
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
