import React, { useState } from "react";
import "./styles/Profile.css";

const CHATBOT_API_URL = "https://custom-chatbot-api.p.rapidapi.com/getbotdetails";
const SPOTIFY_API_URL = "https://spotify23.p.rapidapi.com/track_lyrics/?id=4snRyiaLyvTMui0hzp8MF7";
const API_KEY = "6bce462c35mshb4800de57059215p1d3133jsn47bcc5a6b9e9";

const chatbotOptions = {
  method: "POST",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "custom-chatbot-api.p.rapidapi.com",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    bot_id: "OEXJ8qFp5E5AwRwymfPts90vrHnmr8yZgNE171101852010w2S0bCtN3THp448W7kDSfyTf3OpW5TUVefz",
  }),
};

const spotifyOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export default function Profile() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]); // Historial de mensajes
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const fetchChatResponse = async () => {
    if (!userMessage.trim()) return;

    // Agregar el mensaje del usuario al historial
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);

    setLoading(true);

    try {
      if (userMessage.toLowerCase().includes("letra de")) {
        // Procesar solicitud de letras de canciones con la API de Spotify
        const response = await fetch(SPOTIFY_API_URL, spotifyOptions);
        const result = await response.json();

        if (result && result.lyrics) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: `Aquí tienes la letra:\n\n${result.lyrics}` },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "No encontré la letra de la canción. Intenta con otra." },
          ]);
        }
      } else {
        // Procesar conversación general con la nueva API del chatbot
        const response = await fetch(CHATBOT_API_URL, chatbotOptions);
        const result = await response.text();

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: result },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Hubo un error al procesar tu solicitud. Intenta nuevamente." },
      ]);
    } finally {
      setUserMessage(""); // Limpiar el campo de entrada
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      {/* Burbuja flotante */}
      <div className="chat-bubble" onClick={toggleChat}>
        💬
      </div>

      {/* Chat */}
      {isChatOpen && (
        <div className="chat-box">
          <h3>ContiMUSIC bot</h3>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.sender === "user" ? "user-message" : "chat-response"}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="chat-input"
            />
            <button
              onClick={fetchChatResponse}
              disabled={loading || !userMessage.trim()}
              className="chat-send-button"
            >
              {loading ? "Cargando..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}