import React from 'react';

const Turno = ({ date, time, userId, status, doctor, specialty, description }) => {
  return (
    <div className="turno-card">
      <h3>Usuario ID: {userId}</h3>
      <p>Médico: {doctor || "No especificado"}</p>
      <p>Especialidad: {specialty || "No especificado"}</p>
      <p>Fecha: {date}</p>
      <p>Hora: {time}</p>
      <p>Estado: {status ? "Activo" : "Cancelado"}</p> 
      <p>Descripción: {description || "Sin descripción"}</p> {/* ✅ Se agrega la descripción */}
    </div>
  );
};

export default Turno;
