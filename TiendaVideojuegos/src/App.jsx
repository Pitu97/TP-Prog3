import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Catalogo from "./pages/Catalogo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="catalogo" element={<Catalogo />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
