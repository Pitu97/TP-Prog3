import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import { listaJuegos } from "./data/listaJuegos";
import { colores } from "./data/theme";

function App() {
  const [juegos, setJuegos] = useState(listaJuegos);

  return (
    <div
      style={{
        backgroundColor: colores.background,
        minHeight: "100vh",
        color: colores.textMain,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard juegos={juegos} />} />
          <Route path="catalogo" element={<Catalogo juegos={juegos} />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
