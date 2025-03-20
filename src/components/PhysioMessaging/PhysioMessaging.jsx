// src/pages/PhysioMessaging.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket";

const PhysioMessaging = () => {
  const { user } = useAuth();
  const physioId = user?.id;

  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [error, setError] = useState("");

  // Connect socket when component mounts
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch clients assigned to this physiotherapist
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/users/clients"
        );
        const assignedClients = response.data.filter(
          (client) => String(client.physiotherapistId) === String(physioId)
        );
        setClients(assignedClients);
      } catch (err) {
        setError("Failed to load clients.");
        console.error(err);
      }
    };
    if (physioId) {
      fetchClients();
    }
  }, [physioId]);

  // Fetch conversation history when a client is selected
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Adjust parameters as needed based on your backend design.
        const response = await axios.get("http://localhost:5050/api/messages", {
          params: { clientId: selectedClientId, physioId },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    if (selectedClientId) {
      // Join the conversation room
      const room = `physio:${physioId}_client:${selectedClientId}`;
      console.log("Joining room:", room);
      socket.emit("join", room);
      // Fetch conversation history from backend
      fetchMessages();

      // Listen for new messages
      const messageListener = (data) => {
        console.log("Received message:", data);
        setMessages((prev) => [...prev, data]);
      };
      socket.on("receiveMessage", messageListener);

      // Cleanup listener on room change or component unmount
      return () => {
        socket.off("receiveMessage", messageListener);
      };
    }
  }, [selectedClientId, physioId]);

  const handleSendMessage = () => {
    if (!newMsg.trim() || !selectedClientId) return;
    const room = `physio:${physioId}_client:${selectedClientId}`;
    const data = {
      from: physioId,
      to: selectedClientId,
      message: newMsg.trim(),
      room,
      timestamp: new Date().toISOString(),
    };
    socket.emit("sendMessage", data);
    setMessages((prev) => [...prev, data]);
    setNewMsg("");
  };

  return (
    <div style={{ display: "flex", height: "80vh", padding: "1rem" }}>
      <div
        style={{
          flex: "1",
          borderRight: "1px solid #ccc",
          paddingRight: "1rem",
        }}
      >
        <h3>Your Clients</h3>
        {clients.length === 0 ? (
          <p>No clients assigned.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {clients.map((client) => (
              <li
                key={client.id}
                style={{
                  padding: "0.5rem",
                  cursor: "pointer",
                  backgroundColor:
                    selectedClientId === client.id ? "#f0f0f0" : "transparent",
                }}
                onClick={() => setSelectedClientId(client.id)}
              >
                {client.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        style={{
          flex: "2",
          paddingLeft: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>
          Conversation with{" "}
          {clients.find((c) => c.id === selectedClientId)?.name ||
            "Select a client"}
        </h3>
        <div
          style={{
            flex: "1",
            border: "1px solid #ccc",
            padding: "1rem",
            overflowY: "auto",
            marginBottom: "1rem",
          }}
        >
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "0.5rem" }}>
                <strong>{msg.from === physioId ? "You" : "Client"}</strong>:{" "}
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
    </div>
  );
};

export default PhysioMessaging;
