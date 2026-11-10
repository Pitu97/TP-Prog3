
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const temas = {
  claro: {
    background: "#F4F6FB",
    card: "#FFFFFF",
    surface: "#EEF1F7",
    primary: "#2563EB",
    secondary: "#7C3AED",
    textMain: "#172033",
    textMuted: "#667085",
    border: "#DCE2EC",
  },

  oscuro: {
    background: "#0B0D14",
    card: "#151A27",
    surface: "#1D2433",
    primary: "#00D9F5",
    secondary: "#9333EA",
    textMain: "#F5F7FB",
    textMuted: "#9AA4B2",
    border: "#2B3445",
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
