import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z\s]{5,50}$/,
        "Debe tener entre 5 y 50 caracteres y solo letras."
      )
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9]{5,15}$/,
        "El nombre de usuario debe tener entre 5 y 15 caracteres alfanuméricos."
      )
      .required("El nombre de usuario es obligatorio"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Debe contener 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial."
      )
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirmar la contraseña es obligatorio"),
    birthdate: Yup.date()
      .transform((value, originalValue) => {
        return originalValue ? new Date(originalValue) : value;
      })
      .max(new Date(), "La fecha de nacimiento no puede ser futura.")
      .test("is-adult", "Debes tener al menos 18 años.", function (value) {
        if (!value) return false;

        const todayUTC = new Date();
        const eighteenYearsAgoUTC = new Date(
          Date.UTC(
            todayUTC.getUTCFullYear() - 18,
            todayUTC.getUTCMonth(),
            todayUTC.getUTCDate()
          )
        );

        return value <= eighteenYearsAgoUTC;
      })
      .required("La fecha de nacimiento es obligatoria."),
    nDni: Yup.string()
      .matches(
        /^\d{8,10}$/,
        "El DNI debe tener entre 8 y 10 dígitos numéricos."
      )
      .required("El DNI es obligatorio."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      nDni: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        await register(values);
        setStatus("Usuario registrado exitosamente");
        resetForm();
      } catch (error) {
        setStatus(error.response?.data?.error || "Error en el registro");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <Link to="/">🔙 Volver a Inicio</Link>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          marginTop: "300px",
        }}
      >
        <label>Nombre:</label>
        <input type="text" name="name" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name && (
          <p>{formik.errors.name}</p>
        )}

        <label>Correo Electrónico:</label>
        <input type="email" name="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}

        <label>Nombre de Usuario:</label>
        <input
          type="text"
          name="username"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <p>{formik.errors.username}</p>
        )}

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}

        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p>{formik.errors.confirmPassword}</p>
        )}

        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="birthdate"
          {...formik.getFieldProps("birthdate")}
        />
        {formik.touched.birthdate && formik.errors.birthdate && (
          <p>{formik.errors.birthdate}</p>
        )}

        <label>Número de DNI:</label>
        <input type="text" name="nDni" {...formik.getFieldProps("nDni")} />
        {formik.touched.nDni && formik.errors.nDni && (
          <p>{formik.errors.nDni}</p>
        )}

        <button type="submit">Registrar</button>
        {formik.status && <p>{formik.status}</p>}
      </form>
    </div>
  );
};

export default Register;
