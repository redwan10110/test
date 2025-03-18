import React from 'react';
import Navbar from "../../components/NavBar"; // 🔹 Se corrigió la ruta de importación
import "../../styles/global.css";

function Contact() {
  return (
    <>
      <Navbar /> 
      <div className="page-container">
        <h1 className="title">Contacto</h1>
        <p>Puedes contactarnos al correo info@nasswesshospital.com o llamarnos al (123) 456-7890.</p>
      </div>
    </>
  );
}

export default Contact;
