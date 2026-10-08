import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Login() {
  return (
    <>
      <BarraNav />
      <div className="Tarjetas">
        <div>
            <h2>Login</h2>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <button>Iniciar Sesion</button>
        </div>
        <div>
            <h2>Registrarse</h2>
            <FloatingLabel controlId="floatingInput" label="Nombre">
            <Form.Control type="text" placeholder="Nombre" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Direccion">
            <Form.Control type="text" placeholder="Direccion" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <button>Registrarse</button>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Login;
