import { useState } from "react";
import "./App.css";
import BarraNav from "./components/BarraNav";
import Carrusel from "./components/Carrusel";
import Tarjeta from "./components/Tarjeta";
import Categorias from "./components/Categorias";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BarraNav />
      <Carrusel />
      <section>
        <div className="Tarjetas">
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
          <Tarjeta />
        </div>
      </section>
      <section>
        <div className="Tarjetas">
          <Categorias />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
