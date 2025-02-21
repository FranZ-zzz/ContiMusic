import React from "react";
import { FaPlay, FaList, FaUser, FaMusic, FaSignOutAlt } from "react-icons/fa";
import "./styles/Sidebar.css";

export default function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">
      <h2 className="logo">🎵 MySpotify Clon</h2>
      <ul className="menu">
        <li onClick={() => setActivePage("dashboard")}>
          <FaPlay /> Playback
        </li>
        <li onClick={() => setActivePage("playlist")}>
          <FaList /> Playlist
        </li>
        <li onClick={() => setActivePage("profile")}>
          <FaUser /> Profile
        </li>
        <li onClick={() => setActivePage("albums")}>
          <FaMusic /> Albums
        </li>
        <li onClick={() => setActivePage("logout")}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}
