import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Playlist from "./Playlist";
import Profile from "./Profile";
import Albums from "./Albums";
import Logout from "./Logout";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import "./styles/Dashboard.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "6623577be145419e8985346f406e4254",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="dashboard">
      <Sidebar setActivePage={setActivePage} />
      <div className="content">
        {activePage === "dashboard" && (
          <div>
            <h2 className="title">Playback</h2>
            <Container className="search-container">
              <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
              />
              <div className="search-results">
                {searchResults.map((track) => (
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    chooseTrack={chooseTrack}
                  />
                ))}
              </div>
            </Container>
          </div>
        )}
        {activePage === "playlist" && <Playlist />}
        {activePage === "profile" && <Profile />}
        {activePage === "albums" && <Albums />}
        {activePage === "logout" && <Logout />}
      </div>
      <div className="player-container">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}
