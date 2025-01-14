{/*import React from "react";
import "../Styles/ChatPage.css";
import SplineScene2 from "./SplineScene2";

export default function ChatPage() {
  return (
    <div className="chat-container">
      <SplineScene2 />
      <div className="chat-overlay">
        <div className="chat-box">
          <div className="messages">
          </div>
          <div className="input-container">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}*/}
import React, { useState } from "react";
import "../Styles/ChatPage.css";
import SplineScene2 from "./SplineScene2";

export default function ChatPage() {
  const [userInput, setUserInput] = useState(""); // Store user input
  const [messages, setMessages] = useState([]); // Store chat messages

  // Handle sending the message to the backend
  const handleSend = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    // Add user's message to the chat
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Add the AI's response to the chat
      setMessages([...newMessages, { sender: "ai", text: data.response }]);
    } catch (error) {
      console.error("Error communicating with the backend:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Error: Unable to fetch a response. Try again later." },
      ]);
    } finally {
      setUserInput(""); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      <SplineScene2 />
      <div className="chat-overlay">
        <div className="chat-box">
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "user" ? "user-message" : "ai-message"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}




