import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Categorias({ categorias = [], cargando }) {
  const navigate = useNavigate();
  const { colores } = useTheme();

  if (cargando) {
    return <p style={{ color: colores.textMuted }}>Cargando categorías...</p>;
  }

  return (
    <div className="d-flex gap-3 flex-wrap my-4">
      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() =>
            navigate("/catalogo", { state: { generoInicial: cat.name } })
          }
          className="btn"
          style={{
            backgroundColor: colores.card,
            color: colores.textMain,
            border: `1px solid ${colores.primary}`,
            padding: "12px 24px",
            fontSize: "1.1rem",
            borderRadius: "8px",
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default Categorias;
