import React from "react";
import "./styles/TrackSearchResult.css"; // Importa los estilos

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div className="track-container" onClick={handlePlay}>
      <img src={track.albumUrl} alt="Album Cover" className="track-image" />
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
    </div>
  );
}
