import React from "react";
import Spline3 from '@splinetool/react-spline';
import "../Styles/LearnPage.css";

const LearnPage = () => {
  return (
    <div className="learn-page">
      {/* Background animation */}
      <div className="spline-background">
        <Spline3 scene="https://prod.spline.design/7Zrnt-zC1XfFkzSx/scene.splinecode" />
      </div>
      {/* Main content */}
      <div className="content-overlay">
        <header className="learn-header">
          <h1>Welcome to the TravelBuddy Learning Hub</h1>
          <p>Assisting your Travels with knowledge and insights.</p>
        </header>
        <main className="learn-grid">
          <div className="learn-section section-left">
            <h2>Why Use Us?</h2>
            <p>
              TravelBuddy provides clear and budget friendly travel plans, 
              planning to go abroad ? you're on a budget ? no idea on where to go and when ? 
              TravelBuddy is here to assist you! .
            </p>
          </div>
          <div className="learn-section section-right">
            <h2>Our Key Features</h2>
            <ul>
              <li>Interactive chat with experience</li>
              <li>Guidance & Assitance 24/7</li>
              <li>Real-world budget accuracy</li>
              <li>Accessible anytime, anywhere</li>
            </ul>
          </div>
          <div className="learn-section section-right">
            <h2>Optimal Usage</h2>
            <p>
              Leverage our tools and resources to maximize your experience:
            </p>
            <ul>
              <li>Set a budget</li>
              <li>Set a precise location</li>
              <li>Insert travel duration</li>
              <li>Track your adventure effectively</li>
            </ul>
          </div>
          <div className="learn-section section-center">
            <h2>Ready to Start?</h2>
            <p>
              Dive into our interactive chatbot and start planning for your next Vacation now!
            </p>
            <button className="cta-button">Get Started</button>
          </div>
        </main>
        <footer className="learn-footer">
          <p>© 2024 Learning Hub. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LearnPage;
