import React, { useState } from "react";
import "./styles/Albums.css";

const API_URL = "https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "6bce462c35mshb4800de57059215p1d3133jsn47bcc5a6b9e9",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export default function Albums() {
  const [searchQuery, setSearchQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setAlbums([]);
    setTracks([]);

    try {
      const response = await fetch(`${API_URL}&q=${encodeURIComponent(searchQuery)}`, options);
      if (!response.ok) throw new Error("Error fetching data");

      const data = await response.json();
      console.log("API Response:", data); // Para depuración

      const albumResults = data.albums?.items?.map((album) => ({
        id: album?.data?.uri || "",
        name: album?.data?.name || "Unknown Album",
        artist: album?.data?.artists?.items[0]?.profile?.name || "Unknown Artist",
        cover: album?.data?.coverArt?.sources[0]?.url || "",
        totalTracks: album?.data?.tracks?.totalCount || 0,
      })) || [];

      const trackResults = data.tracks?.items?.map((track) => ({
        id: track?.data?.id || "",
        name: track?.data?.name || "Unknown Track",
        artist: track?.data?.artists?.items[0]?.profile?.name || "Unknown Artist",
        albumCover: track?.data?.albumOfTrack?.coverArt?.sources[0]?.url || "",
        duration: track?.data?.duration?.totalMilliseconds || 0,
        spotifyUrl: `https://open.spotify.com/track/${track?.data?.id}`,
      })) || [];

      setAlbums(albumResults);
      setTracks(trackResults);
    } catch (err) {
      setError("Failed to fetch data. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="albums-container">
      <h2 className="title">Search Albums & Songs</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by artist, song, or album"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results-container">
        {albums.length > 0 && (
          <div className="albums-section">
            <h3>Albums</h3>
            <div className="albums-grid">
              {albums.map((album) => (
                <div key={album.id} className="album-card">
                  {album.cover && <img src={album.cover} alt={album.name} className="album-img" />}
                  <h4>{album.name}</h4>
                  <p>{album.artist}</p>
                  <p>{album.totalTracks} Songs</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tracks.length > 0 && (
          <div className="tracks-section">
            <h3>Songs</h3>
            <div className="tracks-list">
              {tracks.map((track) => (
                <div key={track.id} className="track-card">
                  {track.albumCover && <img src={track.albumCover} alt={track.name} className="track-img" />}
                  <div className="track-info">
                    <h4>{track.name}</h4>
                    <p>{track.artist}</p>
                    <p>Duration: {Math.floor(track.duration / 60000)}:
                      {((track.duration % 60000) / 1000).toFixed(0).padStart(2, "0")}
                    </p>
                    <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify-link">
                      Listen on Spotify
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
