import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar";
import hospitalImage from "../../assets/hospital.webp"; 
import "/src/styles/global.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <div className="text-section">
          <h1 className="title">Nass Wess Hospital - Innovación y Cuidado Médico de Excelencia</h1>
          <p className="description">
            Nass Wess Hospital es un centro médico de vanguardia reconocido por su alta calidad en atención sanitaria, 
            tecnología de última generación y un equipo de especialistas altamente capacitados.
          </p>

          <h2 className="subtitle">Servicios del Hospital</h2>
          <ul className="services-list">
            <li>Emergencias 24/7 - Atención inmediata para cualquier urgencia médica.</li>
            <li>Horario de Atención para Médicos Internistas: 8:00 AM - 8:00 PM</li>
            <li>Cirugía General y Especializada - Equipos quirúrgicos avanzados con mínima invasión.</li>
            <li>Unidad de Cuidados Intensivos (UCI) - Monitoreo de pacientes críticos con tecnología de punta.</li>
            <li>Pediatría y Neonatología - Atención especializada para bebés y niños.</li>
            <li>Oncología y Tratamientos Avanzados - Terapias innovadoras contra el cáncer.</li>
            <li>Cardiología y Cirugía Cardiovascular - Diagnóstico y tratamiento de enfermedades del corazón.</li>
          </ul>

          <h2 className="subtitle">Nuestros Médicos Destacados</h2>
          <ul className="doctor-list">
            <li>Dra. Ana Torres (Pediatra) - Experta en el cuidado de la salud infantil.</li>
            <li>Dr. Carlos Mendoza (Ginecólogo) - Especialista en salud reproductiva y obstetricia.</li>
            <li>Dra. Sofia Martinez (Dermatóloga) - Experta en enfermedades de la piel y tratamientos estéticos.</li>
            <li>Dr. Javier Gómez (Ortopedista) - Especialista en lesiones y enfermedades del sistema musculoesquelético.</li>
            <li>Dra. Elena Ruiz (Endocrinóloga) - Experta en trastornos hormonales y metabólicos.</li>
            <li>Dr. Roberto Fernández (Gastroenterólogo) - Especialista en enfermedades del sistema digestivo.</li>
            <li>Dr. Jonathan Wells (Cardiólogo) - 20 años de experiencia en cirugía cardiovascular.</li>
            <li>Dra. Laura Smith (Oncóloga) - Líder en tratamientos avanzados contra el cáncer.</li>
          </ul>

        </div>
        <div className="image-section">
          <img src={hospitalImage} alt="Nass Wess Hospital" className="hospital-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
