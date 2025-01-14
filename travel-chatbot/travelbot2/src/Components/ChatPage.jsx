import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Correct import for styles
import "../Styles/ChatPage.css";
import SplineScene2 from "./SplineScene2";
import '../Styles/HeroSection.css';


export default function ChatPage() {
  const [userInput, setUserInput] = useState(""); // Store user input
  const [messages, setMessages] = useState([]); // Store chat messages
  const [currentStep, setCurrentStep] = useState(0); // Track chatbot conversation flow
  const [selectedDate, setSelectedDate] = useState(null); // For date picker input
  const [budget, setBudget] = useState(0); // For storing selected budget
  const [plan, setPlan] = useState({}); // For storing final travel plan

  // Function to fetch the initial chatbot message
  const fetchInitialMessage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "" }), // Empty message for the first prompt
      });

      const data = await response.json();
      setMessages([{ sender: "ai", text: data.response }]); // Display the first question
      setCurrentStep(0); // Reset the step tracker
    } catch (error) {
      console.error("Error communicating with the backend:", error);
      setMessages([
        { sender: "ai", text: "Error: Unable to fetch a response. Try again later." },
      ]);
    }
  };

  // Fetch initial message when the component mounts
  useEffect(() => {
    fetchInitialMessage();
  }, []);
useEffect(() => {
  const resetBackendState = async () => {
    await fetch("http://127.0.0.1:8000/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  resetBackendState();
}, []);

  // Handle sending the message to the backend
  const handleSend = async () => {
    if ((!userInput.trim() && currentStep !== 0 && currentStep !== 3) ||
        (currentStep === 0 && budget === 0)) {
      return;
    }

    const messageToSend =
      currentStep === 3 ? selectedDate : currentStep === 0 ? budget : userInput;

    const newMessages = [...messages, { sender: "user", text: messageToSend }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "ai", text: data.response }]);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Error communicating with the backend:", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Error: Unable to fetch a response. Try again later." },
      ]);
    } finally {
      setUserInput("");
      if (currentStep === 3) setSelectedDate(null);
      if (currentStep === 0) setBudget(0);
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    console.log("Selected date:", formattedDate);
    setSelectedDate(formattedDate);
  };

const handleResetPlan = async () => {
  // Clear local states
  setMessages([]);
  setCurrentStep(0);
  setSelectedDate(null);
  setBudget(0);
  setPlan({});

  // Inform the backend to reset the session
  try {
    const response = await fetch("http://127.0.0.1:8000/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reset: true }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Session reset successfully:", data);

      // Show the first question
      setMessages([{ text: data.response, sender: "bot" }]);
    } else {
      console.error("Failed to reset session:", await response.json());
    }
  } catch (error) {
    console.error("Error resetting session:", error);
  }
};




  return (
    <>
      <nav className="navbar">
        <div className="logo">MyTravelBuddy</div>
        <div className="nav-links">
          <a href="/learn">About</a>
          <a href="/chat">Chat</a>
        </div>
      </nav>
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
                  {message.sender === "ai" ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
              ))}
            </div>
            <div className="input-container">
              {currentStep === 3 ? (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select your travel date"
                />
              ) : currentStep === 0 ? (
                <div>
                  <label style={{ color: "black", fontSize: "16px" }}>
                    Choose your budget: ${budget}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={{
                      accentColor: "#007BFF",
                      backgroundColor: "#f0f0f0",
                      color: "black",
                    }}
                  />
                </div>
              ) : currentStep < 4 ? (
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type a message..."
                />
              ) : null}

              {currentStep < 4 && <button onClick={handleSend}>Send</button>}

              {currentStep === 4 && (
                <div className="action-buttons">
                  <button onClick={handleResetPlan}>Reset Plan</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
