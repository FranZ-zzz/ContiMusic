import React from "react";
import "./styles/Profile.css"; // Archivo CSS para los estilos

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h1 className="profile-name">Franz</h1>
          <p className="profile-location">Perú</p>
          <p className="profile-genre">🎵 Género favorito: Rock Alternativo</p>
          <p className="profile-followers">Seguidores: 1.2K</p>
          <p className="profile-following">Siguiendo: 300</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <h3>💽 Playlists</h3>
          <p>15</p>
        </div>
        <div className="stat-box">
          <h3>🎧 Canciones Favoritas</h3>
          <p>200</p>
        </div>
        <div className="stat-box">
          <h3>⏳ Tiempo Escuchado</h3>
          <p>350 horas</p>
        </div>
      </div>
    </div>
  );
}
