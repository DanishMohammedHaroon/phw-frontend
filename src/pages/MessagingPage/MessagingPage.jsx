import React, { useState, useEffect } from "react";
import axios from "axios";

const MessagingPage = () => {
  // For demonstration, let's assume the logged-in user's ID is "1"
  // In a real app, you'd use context (useAuth) to get the current user.
  const currentUserId = "1";
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState("");

  // Function to fetch messages for the current user
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/messages", {
        params: { userId: currentUserId },
      });
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err.response?.data?.message);
      setError("Failed to load messages.");
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!recipientId || !messageText.trim()) {
      setError("Please enter a recipient and a message.");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:5050/api/messages", {
        from: currentUserId,
        to: recipientId,
        message: messageText.trim(),
      });
      console.log("Message sent:", response.data.data);
      // Optionally, refresh the messages list
      fetchMessages();
      // Clear message input
      setMessageText("");
    } catch (err) {
      console.error("Error sending message:", err.response?.data?.message);
      setError(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Messaging</h2>
      <form onSubmit={handleSendMessage}>
        <div>
          <input
            type="text"
            placeholder="Recipient ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Your message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <hr />
      <h3>Your Messages</h3>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>
                {msg.from === currentUserId ? "You" : `User ${msg.from}`}
              </strong>{" "}
              to{" "}
              <strong>
                {msg.to === currentUserId ? "You" : `User ${msg.to}`}
              </strong>
              : {msg.message}{" "}
              <em>({new Date(msg.timestamp).toLocaleString()})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagingPage;
