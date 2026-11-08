import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario, iniciarSesion as iniciarSesionAPI } from "../services/api";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registro, setRegistro] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRegistro = (e) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const datos = await iniciarSesionAPI({
        email: usuario.email,
        password: usuario.password,
      });

      localStorage.setItem("token", datos.token);
      localStorage.setItem("usuarioActivo", JSON.stringify(datos.user));

      navigate("/perfil");
    } catch (error) {
      alert(error.message);
    }
  };

  const registrarse = async (e) => {
    e.preventDefault();

    try {
      await registrarUsuario({
        name: registro.name,
        email: registro.email,
        password: registro.password,
      });

      alert("Registro exitoso. Ahora podés iniciar sesión.");

      setRegistro({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="Tarjetas">
      <div>
        <h2>Login</h2>

        <Form onSubmit={iniciarSesion}>
          <FloatingLabel
            controlId="loginEmail"
            label="Correo electronico"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              value={usuario.email}
              onChange={handleChangeLogin}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="loginPassword"
            label="Contraseña"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={usuario.password}
              onChange={handleChangeLogin}
              required
            />
          </FloatingLabel>

          <button type="submit">Iniciar sesión</button>
        </Form>
      </div>

      <div>
        <h2>Registrarse</h2>

        <Form onSubmit={registrarse}>
          <FloatingLabel
            controlId="registroNombre"
            label="Nombre"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre"
              value={registro.name}
              onChange={handleChangeRegistro}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="registroEmail"
            label="Correo electronico"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              value={registro.email}
              onChange={handleChangeRegistro}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="registroPassword"
            label="Contraseña"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={registro.password}
              onChange={handleChangeRegistro}
              required
            />
          </FloatingLabel>

          <button type="submit">Registrarse</button>
        </Form>
      </div>
    </div>
  );
}

export default Login;