import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  registrarUsuario,
  iniciarSesion as iniciarSesionAPI,
} from "../services/api";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const { colores } = useTheme();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [erroresLogin, setErroresLogin] = useState({
    email: "",
    password: "",
  });

  const nombreRef = useRef(null);
  const registroEmailRef = useRef(null);
  const registroPasswordRef = useRef(null);

  const [erroresRegistro, setErroresRegistro] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const validarLogin = () => {
    const nuevosErrores = {
      email: "",
      password: "",
    };

    if (!usuario.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      nuevosErrores.email = "Ingresá un correo electrónico válido.";
    }

    if (!usuario.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    }

    setErroresLogin(nuevosErrores);

    if (nuevosErrores.email) {
      emailRef.current.focus();
    } else if (nuevosErrores.password) {
      passwordRef.current.focus();
    }

    return !Object.values(nuevosErrores).some((error) => error !== "");
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!validarLogin()) {
      return;
    }

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

  const validarRegistro = () => {
    const nuevosErrores = {
      name: "",
      email: "",
      password: "",
    };

    if (!registro.name.trim()) {
      nuevosErrores.name = "El nombre es obligatorio.";
    } else if (registro.name.trim().length < 3) {
      nuevosErrores.name = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!registro.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registro.email)) {
      nuevosErrores.email = "Ingresá un correo electrónico válido.";
    }

    if (!registro.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    } else if (registro.password.length < 8) {
      nuevosErrores.password =
        "La contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Z]/.test(registro.password)) {
      nuevosErrores.password = "Debe contener al menos una letra mayúscula.";
    } else if (!/[a-z]/.test(registro.password)) {
      nuevosErrores.password = "Debe contener al menos una letra minúscula.";
    }

    setErroresRegistro(nuevosErrores);

    if (nuevosErrores.name) {
      nombreRef.current.focus();
    } else if (nuevosErrores.email) {
      registroEmailRef.current.focus();
    } else if (nuevosErrores.password) {
      registroPasswordRef.current.focus();
    }

    return !Object.values(nuevosErrores).some((error) => error !== "");
  };

  const registrarse = async (e) => {
    e.preventDefault();

    if (!validarRegistro()) {
      return;
    }

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
    <div
      className="Tarjetas"
      style={{
        alignItems: "flex-start",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          backgroundColor: colores.card,
          color: colores.textMain,
          border: `1px solid ${colores.border}`,
          borderRadius: "12px",
          padding: "25px",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h2 style={{ color: colores.primary }}>Iniciar sesión</h2>

        <Form onSubmit={iniciarSesion} noValidate>
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
              ref={emailRef}
              isInvalid={!!erroresLogin.email}
              required
            />
          </FloatingLabel>
          {erroresLogin.email && (
            <div className="text-danger small mt-1">{erroresLogin.email}</div>
          )}

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
              ref={passwordRef}
              isInvalid={!!erroresLogin.password}
              required
            />
          </FloatingLabel>
          {erroresLogin.password && (
            <div className="text-danger small mt-1">
              {erroresLogin.password}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: colores.primary,
              color: colores.background,
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        </Form>
      </div>

      <div
        style={{
          backgroundColor: colores.card,
          color: colores.textMain,
          border: `1px solid ${colores.border}`,
          borderRadius: "12px",
          padding: "25px",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h2 style={{ color: colores.primary }}>Registrarse</h2>

        <Form onSubmit={registrarse} noValidate>
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
              ref={nombreRef}
              isInvalid={!!erroresRegistro.name}
              required
            />
          </FloatingLabel>
          {erroresRegistro.name && (
            <div className="text-danger small mt-1">{erroresRegistro.name}</div>
          )}

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
              ref={registroEmailRef}
              isInvalid={!!erroresRegistro.email}
              required
            />
          </FloatingLabel>
          {erroresRegistro.email && (
            <div className="text-danger small mt-1">
              {erroresRegistro.email}
            </div>
          )}

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
              ref={registroPasswordRef}
              isInvalid={!!erroresRegistro.password}
              required
            />
          </FloatingLabel>
          {erroresRegistro.password && (
            <div className="text-danger small mt-1">
              {erroresRegistro.password}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: colores.primary,
              color: colores.background,
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
