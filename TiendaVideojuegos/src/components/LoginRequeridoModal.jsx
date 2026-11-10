import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function LoginRequeridoModal({ show, onHide }) {
  const navigate = useNavigate();
  const { colores } = useTheme();

  const irAlLogin = () => {
    onHide();
    navigate("/login");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: colores.card,
          color: colores.textMain,
          borderColor: colores.border,
        }}
      >
        <Modal.Title style={{ color: colores.primary }}>
          Inicio de sesión requerido
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: colores.card,
          color: colores.textMain,
        }}
      >
        Tenés que iniciar sesión para realizar esta acción.
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: colores.card,
          borderColor: colores.border,
        }}
      >
        <Button
          onClick={onHide}
          style={{
            backgroundColor: colores.surface,
            color: colores.textMain,
            border: `1px solid ${colores.border}`,
            borderRadius: "8px",
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={irAlLogin}
          style={{
            backgroundColor: colores.primary,
            color: colores.background,
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Ir al login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginRequeridoModal;
