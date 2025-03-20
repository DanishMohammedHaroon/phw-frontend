import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket";
import "./ClientMessaging.scss";

const ClientMessaging = () => {
  const { user } = useAuth();
  const clientId = user?.id;
  const clientName = user?.name;
  const assignedPhysioId = user?.physiotherapistId;
  const [physioName, setPhysioName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [error, setError] = useState("");

  // Fetch physiotherapist info to get the name
  useEffect(() => {
    const fetchPhysio = async () => {
      if (!assignedPhysioId) return;
      try {
        const response = await axios.get(
          `http://localhost:5050/api/physiotherapists/${assignedPhysioId}`
        );
        setPhysioName(response.data.name);
      } catch (err) {
        console.error(
          "Error fetching physiotherapist info:",
          err.response?.data?.message
        );
        setPhysioName(assignedPhysioId);
      }
    };
    fetchPhysio();
  }, [assignedPhysioId]);

  // Function to fetch persisted messages from backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/messages", {
        params: { clientId, physioId: assignedPhysioId },
      });
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to load messages:", err.response?.data || err);
      setError("Failed to load messages.");
    }
  };

  // Fetch persisted messages on mount (or when client/physio IDs change)
  useEffect(() => {
    if (clientId && assignedPhysioId) {
      fetchMessages();
    }
  }, [clientId, assignedPhysioId]);

  // Setup socket connection and join room for real-time updates
  useEffect(() => {
    socket.connect();
    const room = `physio:${assignedPhysioId}_client:${clientId}`;
    socket.emit("join", room);
    const messageListener = (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receiveMessage", messageListener);
    return () => {
      socket.off("receiveMessage", messageListener);
      socket.disconnect();
    };
  }, [clientId, assignedPhysioId]);

  const handleSendMessage = async () => {
    if (!newMsg.trim()) return;
    const room = `physio:${assignedPhysioId}_client:${clientId}`;
    const data = {
      from: clientId,
      to: assignedPhysioId,
      message: newMsg.trim(),
      room,
      timestamp: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        "http://localhost:5050/api/messages",
        data
      );
      const savedMessage = response.data.messageData || data;
      socket.emit("sendMessage", savedMessage);
      setMessages((prev) => [...prev, savedMessage]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err);
      setError("Failed to send message.");
    }
  };

  // Updated helper: Compare numeric values for sender name
  const getSenderName = (msgFrom) => {
    return Number(msgFrom) === Number(clientId) ? clientName : physioName;
  };

  return (
    <div className="client-messaging">
      <h2 className="client-messaging__heading">
        Messaging with Your Physiotherapist
      </h2>
      <div className="client-messaging__messages">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="client-messaging__message">
              <strong>{getSenderName(msg.from)}</strong>: {msg.message}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
      <div className="client-messaging__input-container">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="client-messaging__input"
        />
        <button
          onClick={handleSendMessage}
          className="client-messaging__send-button"
        >
          Send
        </button>
      </div>
      {error && <p className="client-messaging__error">{error}</p>}
    </div>
  );
};

export default ClientMessaging;