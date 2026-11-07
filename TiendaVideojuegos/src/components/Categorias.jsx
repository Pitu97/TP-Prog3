import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { colores } from "../data/theme";

function Categorias() {
  const navigate = useNavigate();

  const listaGeneros = ["Cyberpunk", "RPG", "Action"];

  const irACategoria = (generoElegido) => {
    navigate("/catalogo", {
      state: { generoInicial: generoElegido },
    });
  };

  return (
    <div style={{ margin: "40px 20px", textAlign: "center" }}>
      <h3 style={{ color: colores.textMain, marginBottom: "25px" }}>
        Explorar por Categoria
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {listaGeneros.map((gen) => (
          <Button
            key={gen}
            onClick={() => irACategoria(gen)}
            style={{
              backgroundColor: colores.card,
              color: colores.primary,
              border: `2px solid ${colores.primary}`,
              padding: "12px 30px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              minWidth: "180px",
              boxShadow: `0 0 10px ${colores.background}`,
            }}
          >
            {gen}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
