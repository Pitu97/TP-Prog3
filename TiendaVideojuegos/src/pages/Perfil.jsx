import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Perfil() {
  const navigate = useNavigate();
  const { colores } = useTheme();

  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null"
  );

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  if (!usuarioActivo) {
    return (
      <div className="container mt-4">
        <h2>Tenés que iniciar sesión para ver tu perfil.</h2>

        <button onClick={() => navigate("/login")}>
          Ir al login
        </button>
      </div>
    );
  }

  const historialCompras = JSON.parse(
    localStorage.getItem("historialCompras") || "{}"
  );

  const compras = historialCompras[usuarioActivo.email] || [];

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-around align-items-center mb-5">
        <div
          style={{
            backgroundColor: "darkblue",
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          Foto
        </div>

        <div>
          <h2>{usuarioActivo.name}</h2>
          <p>{usuarioActivo.email}</p>
        </div>

        <button onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <h2>Historial de compras</h2>

      {compras.length === 0 ? (
        <p>Todavía no realizaste ninguna compra.</p>
      ) : (
        compras.map((compra) => (
          <div
            key={compra.id}
            className="border rounded p-3 mb-3"
          >
            <h5>
              Compra del {new Date(compra.date).toLocaleDateString("es-AR")}
            </h5>

            {compra.details.map((detalle, index) => (
              <p key={`${compra.id}-${detalle.gameId}-${index}`}>
                {detalle.game.name} — Cantidad: {detalle.quantity} —
                ${(detalle.unitPrice * detalle.quantity).toFixed(2)}
              </p>
            ))}

            <h5>Total: ${compra.total.toFixed(2)}</h5>
          </div>
        ))
      )}
    </div>
  );
}

export default Perfil;