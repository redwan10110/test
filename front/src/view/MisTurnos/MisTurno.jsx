import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import { AppointmentContext } from "../../context/AppoimentContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateTurno from "../../components/Turno/CreateTurno";
import "./MisTurnos.css";

const MisTurnos = () => {
  const { appointments, cancelAppointment, fetchAppointments } =
    useContext(AppointmentContext);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cancelErrors, setCancelErrors] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // ✅ Redirect only after loading is complete
    }
    if (user) {
      fetchAppointments(user.id); // ✅ Fetch appointments after user is loaded
    }
  }, [user, loading, navigate]);

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "¿Estás seguro de que deseas cancelar esta cita?"
    );
    if (confirmCancel) {
      try {
        await cancelAppointment(appointmentId);
        fetchAppointments(user.id); // Refresh appointments after cancellation
      } catch (error) {
        setCancelErrors("Error al cancelar la cita");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // ✅ Prevent UI flicker while loading
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="title">Mis Turnos</h1>

        {/* ✅ Sección para agendar nuevos turnos */}
        <div className="form-container">
          <h2>Agendar un Nuevo Turno</h2>
          <CreateTurno />
        </div>

        {/* ✅ Contenedor con scroll si hay muchos turnos */}
        <div className="turnos-container">
          {appointments.length > 0 ? (
            appointments.map((turno, index) => (
              <div
                key={`${turno.id}-${index}`}
                className={`turno-item ${
                  turno.status ? "activo" : "cancelado"
                }`}
              >
                <div className="turno-info">
                  <strong>Fecha:</strong> {turno.date} |<strong> Hora:</strong>{" "}
                  {turno.time} <br />
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`estado ${
                      turno.status ? "activo" : "cancelado"
                    }`}
                  >
                    {turno.status ? "Activo" : "Cancelado"}
                  </span>{" "}
                  <br />
                  <br />
                  <strong>Descripción:</strong>{" "}
                  {turno.description || "Sin descripción"}
                </div>
                {turno.status && (
                  <>
                    <button
                      onClick={() => handleCancel(turno.id)}
                      className="btn-cancel"
                    >
                      Cancelar
                    </button>
                    {cancelErrors && (
                      <p className="error-message">{cancelErrors}</p>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-turnos">No tienes turnos agendados.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MisTurnos;
