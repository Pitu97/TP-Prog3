import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useTheme } from "../context/ThemeContext";
import { crearCompra } from "../services/api";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const { colores } = useTheme();
  const [comprando, setComprando] = useState(false);

  const obtenerPrecio = (juego) => {
    const precio = Number(juego.price);

    return Number.isFinite(precio) && precio > 0 ? precio : null;
  };

  const carritoValido = carrito.every((juego) => {
    const precio = obtenerPrecio(juego);
    const cantidad = Number(juego.cantidad || 1);

    return precio !== null && Number.isInteger(cantidad) && cantidad > 0;
  });

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((juego) =>
      juego.id === id
        ? { ...juego, cantidad: (juego.cantidad || 1) + 1 }
        : juego,
    );

    toast.success("Se agrego una unidad del producto", {
      position: "top-right",
      autoClose: 2000,
    });

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const juegoActual = carrito.find((juego) => juego.id === id);

    if (juegoActual && juegoActual.cantidad > 1) {
      toast.info("Se restó una unidad del producto", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    const nuevoCarrito = carrito
      .map((juego) =>
        juego.id === id
          ? { ...juego, cantidad: (juego.cantidad || 1) - 1 }
          : juego,
      )
      .filter((juego) => (juego.cantidad || 1) > 0);

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce((acumulador, juego) => {
    const precio = obtenerPrecio(juego);

    return acumulador + (precio ?? 0) * (juego.cantidad || 1);
  }, 0);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    if (carrito.length === 0) return;
    setShowModal(true);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((juego) => juego.id !== id);

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    toast.error("El juego fue eliminado del carrito", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  const limpiarCarrito = () => {
    if (carrito.length === 0) return;

    setShowModal(true);
  };

  const confirmarBorrarTodo = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    setShowModal(false);

    toast.info("Se ha vaciado el carrito por completo", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  const comprar = async () => {
    const usuarioActivo = JSON.parse(
      localStorage.getItem("usuarioActivo") || "null",
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

    if (!carritoValido) {
      toast.error(
        "Hay productos con precios inválidos. Revisá el carrito antes de continuar.",
      );
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
      <h2 className="mb-4" style={{ color: colores.textMain }}>
        Mi carrito
      </h2>

      {carrito.length === 0 ? (
        <p style={{ color: colores.textMuted }}>Tu carrito está vacío.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4">
          <div className="flex-grow-1">
            {carrito.map((juego) => (
              <Card
                key={juego.id}
                className="mb-3"
                style={{
                  backgroundColor: colores.card,
                  color: colores.textMain,
                  border: `1px solid ${colores.border}`,
                  borderRadius: "12px",
                }}
              >
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
                    <Card.Title style={{ color: colores.textMain }}>
                      {juego.name}
                    </Card.Title>

                    <p style={{ color: colores.textMuted }}>
                      Precio unitario:{" "}
                      {obtenerPrecio(juego) !== null
                        ? `$${obtenerPrecio(juego).toFixed(2)}`
                        : "Precio no disponible"}
                    </p>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        style={{
                          backgroundColor: colores.surface,
                          color: colores.textMain,
                          border: `1px solid ${colores.border}`,
                          borderRadius: "8px",
                          fontWeight: "bold",
                        }}
                        onClick={() => disminuirCantidad(juego.id)}
                        disabled={comprando}
                      >
                        -
                      </Button>

                      <span>{juego.cantidad || 1}</span>

                      <Button
                        style={{
                          backgroundColor: colores.surface,
                          color: colores.textMain,
                          border: `1px solid ${colores.border}`,
                          borderRadius: "8px",
                          fontWeight: "bold",
                        }}
                        onClick={() => aumentarCantidad(juego.id)}
                        disabled={comprando}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      style={{
                        backgroundColor: colores.secondary,
                        color: colores.textMain,
                        border: `1px solid ${colores.border}`,
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                      size="sm"
                      className="mt-2"
                      onClick={() => eliminarProducto(juego.id)}
                      disabled={comprando}
                    >
                      Borrar
                    </Button>
                  </div>

                  <strong style={{ color: colores.primary }}>
                    {obtenerPrecio(juego) !== null
                      ? `$${(obtenerPrecio(juego) * (juego.cantidad || 1)).toFixed(2)}`
                      : "Precio no disponible"}
                  </strong>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ minWidth: "220px" }}>
            <Card
              className="p-3"
              style={{
                backgroundColor: colores.card,
                color: colores.textMain,
                border: `1px solid ${colores.border}`,
                borderRadius: "12px",
              }}
            >
              <Card.Title style={{ color: colores.textMain }}>
                Resumen de compra
              </Card.Title>

              <Card.Text style={{ color: colores.textMuted }}>
                Total:{" "}
                <strong style={{ color: colores.primary }}>
                  ${total.toFixed(2)}
                </strong>
              </Card.Text>

              <Button
                style={{
                  backgroundColor: colores.primary,
                  color: colores.textMain,
                  border: `1px solid ${colores.border}`,
                  borderRadius: "8px",
                  fontWeight: "600",
                  padding: "10px",
                }}
                onClick={comprar}
                disabled={comprando || !carritoValido}
              >
                {comprando ? "Procesando..." : "Confirmar compra"}
              </Button>
              <Button
                style={{
                  backgroundColor: colores.secondary,
                  color: colores.textMain,
                  border: `1px solid ${colores.border}`,
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
                onClick={limpiarCarrito}
                disabled={comprando}
              >
                Borrar todo
              </Button>
            </Card>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: colores.card,
                color: colores.textMain,
                borderColor: colores.border,
              }}
            >
              <Modal.Title style={{ color: colores.textMain }}>
                Vaciar carrito
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              style={{
                backgroundColor: colores.card,
                color: colores.textMuted,
              }}
            >
              ¿Estás seguro de que quieres eliminar todos los productos del
              carrito?
            </Modal.Body>

            <Modal.Footer
              style={{
                backgroundColor: colores.card,
                borderColor: colores.border,
              }}
            >
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={confirmarBorrarTodo}>
                Sí, borrar todo
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Carrito;
