import React from "react";
import { motion } from "framer-motion";
import "./styles/Login.css"; // Archivo de estilos

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=6623577be145419e8985346f406e4254&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="login-container">

      <motion.img
        src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
        alt="Spotify Logo"
        className="spotify-logo"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />


      <motion.h1
        className="login-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Bienvenido a mi SpotifyClon
      </motion.h1>

      <motion.p
        className="login-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Ingeniería Web
      </motion.p>

      {/* Botón de Login */}
      <motion.a
        href={AUTH_URL}
        className="login-button"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        Ingresar con Spotify
      </motion.a>
    </div>
  );
}
