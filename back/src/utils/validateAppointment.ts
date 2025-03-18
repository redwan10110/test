interface AppointmentData {
  date: string;
  time: string;
}

export const validateAppointmentData = (
  appointmentData: AppointmentData
): string[] => {
  const { date, time } = appointmentData;
  const errors: string[] = [];

  // Get today's date in the user's local time (without time part)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert the provided date to a local Date object (ensure correct interpretation)
  const selectedDate = new Date(`${date}T00:00:00`);
  selectedDate.setHours(0, 0, 0, 0); // Normalize time to avoid issues

  // Ensure the date is at least tomorrow
  if (selectedDate <= today) {
    errors.push("La fecha debe ser posterior al día de hoy.");
  }

  // Get the correct day of the week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = selectedDate.getDay();
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    errors.push("No se pueden hacer reservas en fines de semana.");
  }

  // Validate hospital hours (8:00 AM - 8:00 PM in local time)
  const [hours] = time.split(":").map(Number);
  if (hours < 8 || hours >= 20) {
    errors.push("La hora debe estar entre las 08:00 y las 20:00.");
  }

  return errors;
};
