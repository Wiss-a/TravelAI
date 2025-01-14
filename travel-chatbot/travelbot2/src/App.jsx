// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HeroSection';
import ChatPage from './Components/ChatPage';
import LearnPage from './Components/LearnPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </Router>
  );
}
