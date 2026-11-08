import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import { obtenerJuegos, obtenerCategorias } from "./services/api";
import DetalleJuego from "./pages/DetalleJuego";
import { colores } from "./data/theme";
import Perfil from "./pages/Perfil";
import BarraNav from "./components/BarraNav";
import Footer from "./components/Footer";
import NuevoJuego from "./components/NuevoJuego";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  const [error, setError] = useState("");

  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
  });

  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const datos = await obtenerJuegos();
        setJuegos(datos);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los videojuegos");
      } finally {
        setCargando(false);
      }
    };

    cargarJuegos();
  }, []);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const datos = await obtenerCategorias();
        setCategorias(datos);
      } catch (error) {
        console.error(error);
        console.error("No se pudieron cargar las categorías");
      } finally {
        setCargandoCategorias(false);
      }
    };

    cargarCategorias();
  }, []);

  const agregarJuego = (nuevoJuego) => {
    setJuegos((juegosActuales) => [...juegosActuales, nuevoJuego]);
  };

  const agregarAlCarrito = (juego) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.some(
        (juegoCarrito) => juegoCarrito.id === juego.id,
      );

      let carritoActualizado;

      if (existe) {
        carritoActualizado = carritoActual.map((juegoCarrito) =>
          juegoCarrito.id === juego.id
            ? {
                ...juegoCarrito,
                cantidad: (juegoCarrito.cantidad || 1) + 1,
              }
            : juegoCarrito,
        );
      } else {
        carritoActualizado = [...carritoActual, { ...juego, cantidad: 1 }];
      }

      localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

      return carritoActualizado;
    });
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div
          className="d-flex flex-column min-vh-100"
          style={{
            backgroundColor: colores.background,
            minHeight: "100vh",
            color: colores.textMain,
          }}
        >
          <BarraNav setBusqueda={setBusqueda} />

          <main className="flex-grow-1">
            {cargando && <p>Cargando videojuegos...</p>}

            {error && <p>{error}</p>}
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    juegos={juegos}
                    agregarAlCarrito={agregarAlCarrito}
                  />
                }
              />

              <Route
                path="/catalogo"
                element={
                  <Catalogo
                    juegos={juegos}
                    categorias={categorias}
                    agregarAlCarrito={agregarAlCarrito}
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                  />
                }
              />

              <Route
                path="/carrito"
                element={<Carrito carrito={carrito} setCarrito={setCarrito} />}
              />

              <Route
                element={
                  <Protected
                    rolesPermitidos={["user", "admin", "superadmin"]}
                  />
                }
              >
                <Route path="/perfil" element={<Perfil />} />
              </Route>
              <Route
                element={
                  <Protected rolesPermitidos={["admin", "superadmin"]} />
                }
              >
                <Route
                  path="/NuevoJuego"
                  element={<NuevoJuego agregarJuego={agregarJuego} categorias={categorias} cargandoCategorias={cargandoCategorias} />}
                />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
