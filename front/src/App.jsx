import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./view/Home/Home";
import Contact from "./view/contact/contact";
import AboutUs from "./view/aboutus/aboutus";
import MisTurnos from "./view/MisTurnos/MisTurno";
import Register from "./view/register/Register";
import Login from "./view/login/Login";

import "./styles/global.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
