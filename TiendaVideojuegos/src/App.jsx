import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import DetalleJuego from "./pages/DetalleJuego";
import { colores } from "./data/theme";
import Perfil from "./pages/Perfil";
import BarraNav from "./components/BarraNav";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="d-flex flex-column min-vh-100"
      style={{
        backgroundColor: colores.background,
        minHeight: "100vh",
        color: colores.textMain,
      }}
    >
      <BarraNav />
      <main className="flex-grow-1">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="login" element={<Login />} />
          <Route path="detalleJuego" element={<DetalleJuego />} />
          <Route path="perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
