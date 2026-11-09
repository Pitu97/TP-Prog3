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
  const obtenerPrecio = (juego) => Number(juego.price) || 0;
  const [comprando, setComprando] = useState(false);

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

  const total = carrito.reduce(
    (acumulador, juego) =>
      acumulador + obtenerPrecio(juego) * (juego.cantidad || 1),
    0,
  );

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

    toast.alert("Se ha vaciado el carrito por completo", {
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
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Vaciar carrito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que quieres eliminar todos los productos del
              carrito?
            </Modal.Body>
            <Modal.Footer>
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
