import React from 'react';

import './landing.css';

export function Landing() {
  return (
    <div id="landing-page">
      <header>
        <div className="header-title">
          <h1>Welcome to our Logo Maker</h1>
          <div className="header-subtitle">
            <p>Type your company name, and a keyword about your business.</p>
            <p>We will generate logos based on the information given.</p>
          </div>
        </div>
      </header>
      <section id="input-section">
        <div id="user-input"></div>
      </section>
    </div>
  );
}
