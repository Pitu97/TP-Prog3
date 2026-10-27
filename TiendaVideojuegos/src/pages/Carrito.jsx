import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();

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
      acumulador + juego.price * (juego.cantidad || 1),
    0
  );

  const comprar = () => {
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

    const comprasGuardadas = JSON.parse(
      localStorage.getItem("historialCompras") || "{}"
    );

    const email = usuarioActivo.email;
    const comprasUsuario = comprasGuardadas[email] || [];

    const nuevaCompra = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString("es-AR"),
      juegos: carrito.map((juego) => ({ ...juego })),
      total: total,
    };

    comprasGuardadas[email] = [...comprasUsuario, nuevaCompra];

    localStorage.setItem(
      "historialCompras",
      JSON.stringify(comprasGuardadas)
    );

    setCarrito([]);
    localStorage.setItem("carrito", JSON.stringify([]));

    alert("¡Compra realizada correctamente!");
    navigate("/perfil");
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
                    alt={juego.title}
                    style={{
                      width: "120px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="flex-grow-1">
                    <Card.Title>{juego.title}</Card.Title>

                    <p>Precio unitario: ${juego.price.toFixed(2)}</p>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => disminuirCantidad(juego.id)}
                      >
                        -
                      </Button>

                      <span>{juego.cantidad || 1}</span>

                      <Button
                        variant="secondary"
                        onClick={() => aumentarCantidad(juego.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <strong>
                    ${(juego.price * (juego.cantidad || 1)).toFixed(2)}
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

              <Button variant="success" onClick={comprar}>
                Confirmar compra
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;