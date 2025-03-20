// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5050", {
  autoConnect: false, // Connect manually after authentication if needed
});

export default socket;
