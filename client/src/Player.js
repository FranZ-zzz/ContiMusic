import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "./styles/Player.css"; // Importa los estilos

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;

  return (
    <div className="player-container">
      <SpotifyPlayer
        className="spotify-player"
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
}
