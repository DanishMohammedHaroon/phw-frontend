import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket";
import "./PhysioMessaging.scss";

const PhysioMessaging = () => {
  const { user } = useAuth();
  const physioId = user?.id;
  const [physioName, setPhysioName] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [error, setError] = useState("");

  // Connect socket on mount
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch physiotherapist info
  useEffect(() => {
    const fetchPhysio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/physiotherapists/${physioId}`
        );
        setPhysioName(response.data.name);
      } catch (err) {
        console.error(
          "Error fetching physiotherapist info:",
          err.response?.data?.message
        );
        setPhysioName(physioId);
      }
    };
    if (physioId) fetchPhysio();
  }, [physioId]);

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
  const fetchMessages = async (clientId) => {
    try {
      const response = await axios.get("http://localhost:5050/api/messages", {
        params: { clientId, physioId },
      });
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to load messages:", err.response?.data || err);
      setError("Failed to load messages.");
    }
  };

  useEffect(() => {
    if (selectedClientId) {
      const room = `physio:${physioId}_client:${selectedClientId}`;
      console.log("Joining room:", room);
      socket.emit("join", room);
      fetchMessages(selectedClientId);
      const messageListener = (data) => {
        console.log("Received message:", data);
        setMessages((prev) => [...prev, data]);
      };
      socket.on("receiveMessage", messageListener);
      return () => {
        socket.off("receiveMessage", messageListener);
      };
    }
  }, [selectedClientId, physioId]);

  const handleSendMessage = async () => {
    if (!newMsg.trim() || !selectedClientId) return;
    const room = `physio:${physioId}_client:${selectedClientId}`;
    const data = {
      from: physioId,
      to: selectedClientId,
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

  // Helper to get sender's name based on message's "from" value
  const getSenderName = (msgFrom) => {
    if (Number(msgFrom) === Number(physioId)) {
      return physioName;
    } else {
      const client = clients.find((c) => Number(c.id) === Number(msgFrom));
      return client ? client.name : "Unknown Client";
    }
  };

  return (
    <div className="physio-messaging">
      <div className="physio-messaging__clients-panel">
        <h3 className="physio-messaging__clients-title">Your Clients</h3>
        {clients.length === 0 ? (
          <p className="physio-messaging__no-clients">No clients assigned.</p>
        ) : (
          <ul className="physio-messaging__client-list">
            {clients.map((client) => (
              <li
                key={client.id}
                className={`physio-messaging__client-item ${
                  selectedClientId === client.id
                    ? "physio-messaging__client-item--selected"
                    : ""
                }`}
                onClick={() => setSelectedClientId(client.id)}
              >
                {client.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="physio-messaging__conversation-panel">
        <h3 className="physio-messaging__conversation-title">
          Conversation with{" "}
          {clients.find((c) => c.id === selectedClientId)?.name ||
            "Select a client"}
        </h3>
        <div className="physio-messaging__messages-container">
          {messages.length === 0 ? (
            <p className="physio-messaging__no-messages">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="physio-messaging__message">
                <strong>{getSenderName(msg.from)}</strong>: {msg.message}
                <br />
                <small>{new Date(msg.timestamp).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
        <div className="physio-messaging__input-container">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="physio-messaging__input"
          />
          <button
            onClick={handleSendMessage}
            className="physio-messaging__send-button"
          >
            Send
          </button>
        </div>
        {error && <p className="physio-messaging__error">{error}</p>}
      </div>
    </div>
  );
};

export default PhysioMessaging;
