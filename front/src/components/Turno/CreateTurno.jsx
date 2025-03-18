import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { AppointmentContext } from "../../context/AppoimentContext";

const CreateAppointment = () => {
  const { fetchAppointments } = useContext(AppointmentContext);
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    description: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "date") {
      if (!value) {
        error = "La fecha es obligatoria.";
      } else {
        // Get today's date in the user's local time (midnight)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Convert the user-selected date to a local Date object (to prevent UTC shifts)
        const selectedDate = new Date(`${value}T00:00:00`);
        selectedDate.setHours(0, 0, 0, 0);

        // Ensure the selected date is at least tomorrow
        if (selectedDate <= today) {
          error = "La fecha debe ser posterior al día de hoy.";
        }

        // Get the correct day of the week (0 = Sunday, 6 = Saturday)
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
          error = "No se pueden hacer reservas en fines de semana.";
        }
      }
    }

    if (name === "time") {
      if (!value) {
        error = "La hora es obligatoria.";
      } else {
        const [hours] = value.split(":").map(Number);
        if (hours < 8 || hours >= 20) {
          error = "La hora debe estar entre las 08:00 AM y las 08:00 PM.";
        }
      }
    }

    if (name === "description") {
      if (!value || !value.trim()) {
        error = "La descripción es obligatoria.";
      } else if (value.length < 10) {
        error = "La descripción debe tener al menos 10 caracteres.";
      } else if (value.length > 50) {
        error = "La descripción no puede superar los 50 caracteres.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    const newAppointment = {
      date: formData.date.trim(),
      time: formData.time.trim(),
      description: formData.description.trim(),
      userId: user.id,
      status: true,
    };

    try {
      await axios.post(
        "http://localhost:3000/appointments/schedule",
        newAppointment,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      fetchAppointments(user?.id);
      setFormData({ date: "", time: "", description: "" });
      setErrors({ date: "", time: "", description: "" });
    } catch (error) {
      console.error("❌ Error al agendar cita:", error);
    }
  };

  return (
    <div>
      <h1>Agendar Cita</h1>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <label>Hora:</label>
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Seleccionar horario
          </option>{" "}
          {/* 👈 Opción inicial */}
          {Array.from({ length: 25 }, (_, i) => {
            const hour = 8 + Math.floor(i / 2);
            const minute = i % 2 === 0 ? "00" : "30";
            const formattedTime = `${hour
              .toString()
              .padStart(2, "0")}:${minute}`;
            return (
              <option key={formattedTime} value={formattedTime}>
                {formattedTime}
              </option>
            );
          })}
        </select>
        {errors.time && <p className="error">{errors.time}</p>}

        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <button
          type="submit"
          disabled={Object.values(errors).some((err) => err !== "")}
        >
          Agendar Cita
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
