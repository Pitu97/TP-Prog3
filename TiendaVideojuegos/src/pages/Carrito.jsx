import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useTheme } from "../context/ThemeContext";
import { crearCompra } from "../services/api";
import { useState } from "react";

function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const { colores } = useTheme();
  const obtenerPrecio = (juego) => Number(juego.price) || 0;
  const [comprando, setComprando] = useState(false);

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((juego) =>
      juego.id === id
        ? { ...juego, cantidad: (juego.cantidad || 1) + 1 }
        : juego
    );

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((juego) =>
        juego.id === id
          ? { ...juego, cantidad: (juego.cantidad || 1) - 1 }
          : juego
      )
      .filter((juego) => (juego.cantidad || 1) > 0);

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce(
    (acumulador, juego) =>
      acumulador + obtenerPrecio(juego) * (juego.cantidad || 1),
    0
  );

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((juego) => juego.id !== id);

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const limpiarCarrito = () => {
    if (carrito.length === 0) return;

    const confirmar = window.confirm(
      "Estas seguro de que quieres eliminar todos los productos del carrito?"
    );

    if (!confirmar) return;

    setCarrito([]);
    localStorage.setItem("carrito", JSON.stringify([]));
  };

  const comprar = async () => {
    const usuarioActivo = JSON.parse(
      localStorage.getItem("usuarioActivo") || "null"
    );

    if (!usuarioActivo) {
      alert("Tenés que iniciar sesión para comprar.");
      navigate("/login");
      return;
    }

    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      setComprando(true);

      const items = carrito.map((juego) => ({
        gameId: juego.id,
        quantity: juego.cantidad || 1,  
      }));

      await crearCompra(items);

      setCarrito([]);
      localStorage.setItem("carrito", JSON.stringify([]));

      alert("Compra realizada correctamente");
      navigate("/perfil");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setComprando(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Mi carrito</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4">
          <div className="flex-grow-1">
            {carrito.map((juego) => (
              <Card key={juego.id} className="mb-3">
                <div className="d-flex align-items-center p-3 gap-3">
                  <Card.Img
                    src={juego.image}
                    alt={juego.name}
                    style={{
                      width: "120px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="flex-grow-1">
                    <Card.Title>{juego.name}</Card.Title>

                    <p>Precio unitario: ${obtenerPrecio(juego).toFixed(2)}</p>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => disminuirCantidad(juego.id)}
                        disabled={comprando}
                      >
                        -
                      </Button>

                      <span>{juego.cantidad || 1}</span>

                      <Button
                        variant="secondary"
                        onClick={() => aumentarCantidad(juego.id)}
                        disabled={comprando}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => eliminarProducto(juego.id)}
                      disabled={comprando}
                      >
                        Borrar
                    </Button>
                  </div>

                  <strong>
                    ${(obtenerPrecio(juego) * (juego.cantidad || 1)).toFixed(2)}
                  </strong>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ minWidth: "220px" }}>
            <Card className="p-3">
              <Card.Title>Resumen de compra</Card.Title>

              <Card.Text>
                Total: <strong>${total.toFixed(2)}</strong>
              </Card.Text>

              <Button variant="success" onClick={comprar} disabled={comprando}>
                {comprando ? "Procesando..." : "Confirmar compra"}
              </Button>
              <Button
                variant="danger"
                onClick={limpiarCarrito}
                disabled={comprando}
              >
                Borrar todo
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;