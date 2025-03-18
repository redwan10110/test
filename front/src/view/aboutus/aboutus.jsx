import React from 'react';
import Navbar from '../../components/NavBar';
import "../../styles/global.css";

function AboutUs() {
  return (
    <div className="page-container">
      <Navbar />
      <h1 className="title">Sobre Nosotros</h1>
      <p>
        Nass Wess Hospital es un centro médico de excelencia, comprometido con la innovación y el cuidado del paciente. 
        Contamos con tecnología avanzada y un equipo de especialistas altamente capacitados para brindar servicios de salud 
        de la más alta calidad en un ambiente seguro y humanizado.
      </p>
    </div>
  );
}

export default AboutUs;
