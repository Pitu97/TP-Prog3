import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    direccion: "",
    email: "",
    password: "",
  });

  const [registro, setRegistro] = useState({
    nombre: "",
    direccion: "",
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

  const iniciarSesion = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );

    const usuarioEncontrado = usuariosGuardados.find(
      (u) =>
        u.email === usuario.email &&
        u.password === usuario.password
    );

    if (usuarioEncontrado) {
      localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioEncontrado)
      );

      navigate("/perfil");
    } else {
      alert("Email o contraseña incorrectos. Registrate primero.");
    }
  };

  const registrarse = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );

    const emailExiste = usuariosGuardados.some(
      (u) => u.email === registro.email
    );

    if (emailExiste) {
      alert("Ya existe un usuario registrado con ese email.");
      return;
    }

    const nuevoUsuario = {
      nombre: registro.nombre,
      direccion: registro.direccion,
      email: registro.email,
      password: registro.password,
    };

    usuariosGuardados.push(nuevoUsuario);

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuariosGuardados)
    );

    alert("Registro exitoso. Ahora podés iniciar sesión.");

    setRegistro({
      nombre: "",
      direccion: "",
      email: "",
      password: "",
    });
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
              name="nombre"
              placeholder="Nombre"
              value={registro.nombre}
              onChange={handleChangeRegistro}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="registroDireccion"
            label="Dirección"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={registro.direccion}
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