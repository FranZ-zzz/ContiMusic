import React from "react";
import "./styles/Playlist.css"; // Archivo CSS para los estilos

export default function Playlist() {
  return (
    <div className="playlist-container">
      <h2 className="playlist-title">🎶 Mis Playlists</h2>

      <div className="playlist-embed">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZEVXbMDoHDwVN2tF?utm_source=generator"
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      <div className="playlist-embed">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZEVXbJfdy5b0KP7W?utm_source=generator"
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
