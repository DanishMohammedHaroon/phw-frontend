import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket.js";

const ClientMessaging = () => {
  const { user } = useAuth();
  const clientId = user?.id;
  const assignedPhysioId = user?.physiotherapistId;

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.connect();
    // Join a room based on the conversation between the client and physiotherapist
    const room = `physio:${assignedPhysioId}_client:${clientId}`;
    socket.emit("join", room);
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, [clientId, assignedPhysioId]);

  const handleSendMessage = () => {
    if (!newMsg.trim()) return;
    const room = `physio:${assignedPhysioId}_client:${clientId}`;
    const data = {
      from: clientId,
      to: assignedPhysioId,
      message: newMsg.trim(),
      room,
      timestamp: new Date().toISOString(),
    };
    socket.emit("sendMessage", data);
    setMessages((prev) => [...prev, data]);
    setNewMsg("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Messaging with Your Physiotherapist</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "60vh",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "0.5rem" }}>
              <strong>{msg.from === clientId ? "You" : "Physio"}</strong>:{" "}
              {msg.message}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
      <div>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Send
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ClientMessaging;
