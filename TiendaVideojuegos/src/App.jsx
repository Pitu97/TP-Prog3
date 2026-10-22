
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import { listaJuegos } from "./data/listaJuegos";
import DetalleJuego from "./pages/DetalleJuego";
import { colores } from "./data/theme";
import Perfil from "./pages/Perfil";
import BarraNav from "./components/BarraNav";
import Footer from "./components/Footer";
import NuevoJuego from "./components/NuevoJuego";

function App() {
  const [juegos, setJuegos] = useState(listaJuegos);

  const agregarJuego = (nuevoJuego) => {
    setJuegos((juegosActuales) => [...juegosActuales, nuevoJuego]);
  };

  return (
    <BrowserRouter>
      <div
        className="d-flex flex-column min-vh-100"
        style={{
          backgroundColor: colores.background,
          minHeight: "100vh",
          color: colores.textMain,
        }}
      >
        <BarraNav />

        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<Dashboard juegos={juegos} />}
            />

            <Route
              path="/catalogo"
              element={<Catalogo juegos={juegos} />}
            />

            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detalleJuego" element={<DetalleJuego />} />
            <Route path="/perfil" element={<Perfil />} />

            <Route
              path="/NuevoJuego"
              element={<NuevoJuego agregarJuego={agregarJuego} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
