import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const temas = {
  claro: {
    background: "#FEE9E1",
    card: "#FFFFFF",
    primary: "#222725",
    textMain: "#222725",
    secondary: "#06D6A0",
  },

  oscuro: {
    background: "#222725",
    card: "#343A38",
    primary: "#5BC3EB",
    textMain: "#FFFFFF",
    secondary: "#06D6A0",
  },
};

export function ThemeProvider({ children }) {
  const [modo, setModo] = useState(
    localStorage.getItem("tema") || "oscuro"
  );

  const cambiarTema = () => {
    const nuevoTema = modo === "oscuro" ? "claro" : "oscuro";

    setModo(nuevoTema);
    localStorage.setItem("tema", nuevoTema);
  };

  const colores = temas[modo];

  return (
    <ThemeContext.Provider value={{ modo, colores, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}