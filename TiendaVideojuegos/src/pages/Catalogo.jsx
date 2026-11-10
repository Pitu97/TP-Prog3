import { useState, useEffect } from "react";
import Tarjeta from "../components/Tarjeta";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Catalogo({
  juegos,
  categorias = [],
  agregarAlCarrito,
  busqueda,
  setBusqueda,
  eliminarJuego,
}) {
  const [plataformas, setPlataformas] = useState([]);
  const { colores } = useTheme();

  const location = useLocation();
  const generoRecibido = location.state?.generoInicial;

  const listaPlataformas = ["PC", "PS5", "Switch", "Xbox"];

  const categoriaEncontrada = categorias.find(
    (cat) => cat.name === generoRecibido,
  );

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(
    categoriaEncontrada ? [Number(categoriaEncontrada.id)] : [],
  );

  useEffect(() => {
    if (categoriaEncontrada) {
      setCategoriasSeleccionadas([Number(categoriaEncontrada.id)]);
    }
  }, [categoriaEncontrada]);

  const togglePlataforma = (plat) => {
    if (plataformas.includes(plat)) {
      setPlataformas(plataformas.filter((item) => item !== plat));
    } else {
      setPlataformas([...plataformas, plat]);
    }
  };

  const toggleCategoria = (id) => {
    const categoriaId = Number(id);

    setCategoriasSeleccionadas((categoriasActuales) =>
      categoriasActuales.includes(categoriaId)
        ? categoriasActuales.filter((catId) => catId !== categoriaId)
        : [...categoriasActuales, categoriaId],
    );
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setPlataformas([]);
    setCategoriasSeleccionadas([]);
  };

  const juegosFiltrados = juegos
    ? juegos.filter((juego) => {
        const pasaNombre = (juego.name || "")
          .toLowerCase()
          .includes((busqueda || "").toLowerCase());

        const pasaPlataforma =
          plataformas.length === 0 || plataformas.includes(juego.platform);

        const pasaCategoria =
          categoriasSeleccionadas.length === 0 ||
          categoriasSeleccionadas.includes(Number(juego.categoryId));

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
                  style={{ color: colores.textMain }}
                />
              ))}
            </div>

            <div>
              <h6 style={{ color: colores.primary }}>Categorias</h6>
              {categorias.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  label={cat.name}
                  checked={categoriasSeleccionadas.includes(Number(cat.id))}
                  onChange={() => toggleCategoria(cat.id)}
                  style={{ color: colores.textMain }}
                />
              ))}
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
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
          {juegosFiltrados.length > 0 ? (
            juegosFiltrados.map((juego) => (
              <Tarjeta
                key={juego.id}
                juego={juego}
                title={juego.name}
                price={juego.price}
                image={juego.image}
                agregarAlCarrito={agregarAlCarrito}
                eliminarJuego={eliminarJuego}
              />
            ))
          ) : (
            <p style={{ color: colores.textMain, margin: "30px" }}>
              No se encontraron videojuegos con los filtros seleccionados.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Catalogo;
