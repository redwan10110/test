import { useContext } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Validation function directly in the same file
const validateUsernameAndPassword = (input) => {
  const errors = {};
  const usernameRegex = /^[a-zA-Z0-9]{5,15}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!input.username) {
    errors.username = "Usuario es requerido";
  } else if (!usernameRegex.test(input.username)) {
    errors.username = "El usuario debe tener entre 5 y 15 caracteres";
  }

  if (!input.password) {
    errors.password = "Contraseña es requerida";
  } else if (!passwordRegex.test(input.password)) {
    errors.password =
      "Debe tener una mayúscula, un número, un carácter especial (@!-), y mínimo 8 caracteres";
  }

  return errors;
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateUsernameAndPassword,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await login(values);
        setStatus("Login exitoso");
        navigate("/"); // Redirect to Home
      } catch {
        setStatus("Error en el login");
      }
      setSubmitting(false);
    },
  });

  return (
    <div>
      <Link
        to="/"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          textDecoration: "none",
        }}
      >
        🔙 Volver a Home
      </Link>
      <form onSubmit={formik.handleSubmit}>
        <label>Usuario:</label>
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Usuario"
        />
        {formik.touched.username && formik.errors.username && (
          <p>{formik.errors.username}</p>
        )}

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Contraseña"
        />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          Iniciar sesión
        </button>
        {formik.status && <p>{formik.status}</p>}
      </form>
    </div>
  );
};

export default Login;
