import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.id) {
      fetchAppointments(user.id);
    } else {
      setAppointments([]); // Clear appointments immediately when user logs out
    }
  }, [user]);

  const fetchAppointments = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/appointments/user/${userId}`
      );
      setAppointments(response.data);
    } catch {
      setAppointments([]);
    }
  };

  const addAppointment = async (newAppointment) => {
    if (!user?.id) return;

    try {
      await axios.post("http://localhost:3000/appointments/schedule", {
        ...newAppointment,
        userId: user.id,
      });
      fetchAppointments(user.id);
    } catch {}
  };

  const cancelAppointment = async (id, date, setError) => {
    if (!id) return;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const appointmentDate = new Date(date);
    appointmentDate.setUTCHours(0, 0, 0, 0);

    if (appointmentDate <= today) {
      setError("No se pueden cancelar turnos del mismo día o pasados.");
      return;
    }

    try {
      await axios.put("http://localhost:3000/appointments/cancel", { id });
      fetchAppointments(user.id);
    } catch {
      setError("Error al cancelar el turno. Intente de nuevo.");
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        cancelAppointment,
        fetchAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
