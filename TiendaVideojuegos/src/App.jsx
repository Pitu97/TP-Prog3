import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";
import { colores } from "./data/theme";

function App() {
  const [count, setCount] = useState(0);

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
          <Route path="/" element={<Dashboard />} />
          <Route path="catalogo" element={<Catalogo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
