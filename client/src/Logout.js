import React from "react";

export default function Logout() {
  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
