import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.webp";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Hospital Logo" className={styles.logo} />
        <h1 className={styles.hospitalTitle}>Nass Wess Hospital</h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link to="/mis-turnos">Mis Turnos</Link>
          </li>
        )}
        <li>
          <Link to="/about-us">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className={styles.authButtons}>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
