import { CreateUserDto } from "../dtos/IUserDto";

export const validateRegisterUser = (
  input: CreateUserDto
): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameRegex = /^[a-zA-Z\s]{5,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nDniRegex = /^[0-9]{8,10}$/;

  if (!input.name) {
    errors.name = "Debe tener al menos 5 caracteres y solo letras.";
  } else if (!nameRegex.test(input.name)) {
    errors.name =
      "El nombre debe contener solo letras y al menos 5 caracteres.";
  }

  if (!input.email) {
    errors.email = "El email es requerido.";
  } else if (!emailRegex.test(input.email)) {
    errors.email = "Email no válido.";
  }

  if (!input.username) {
    errors.username = "Usuario requerido.";
  } else if (!usernameRegex.test(input.username)) {
    errors.username = "Usuario debe tener al menos 5 caracteres alfanuméricos.";
  }

  if (!input.password) {
    errors.password = "Contraseña requerida.";
  } else if (!passwordRegex.test(input.password)) {
    errors.password =
      "Debe incluir una mayúscula, un número y un carácter especial (@$!%*?&).";
  }

  if (input.nDni && !nDniRegex.test(input.nDni)) {
    errors.nDni = "DNI debe tener entre 8 y 10 dígitos numéricos.";
  }

  // Birthdate validation: Must be at least 18 years old and not in the future
  if (input.birthdate) {
    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0); // Ensure consistent UTC time

    const birthDateUTC = new Date(input.birthdate);
    birthDateUTC.setUTCHours(0, 0, 0, 0); // Normalize to UTC

    // Calculate the minimum allowed birthdate (18 years old)
    const minAgeDateUTC = new Date(
      todayUTC.getUTCFullYear() - 18,
      todayUTC.getUTCMonth(),
      todayUTC.getUTCDate()
    );

    if (birthDateUTC > todayUTC) {
      errors.birthdate = "La fecha de nacimiento no puede ser futura.";
    } else if (birthDateUTC > minAgeDateUTC) {
      errors.birthdate = "Debes tener al menos 18 años.";
    }
  }

  return errors;
};
