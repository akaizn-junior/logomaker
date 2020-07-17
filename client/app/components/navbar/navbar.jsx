import React from 'react';
import { Link } from 'react-router-dom';
// components
import { Logo } from '../icons';
import { Faces } from '../';
// styles
import './navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link
          to="/"
          style={{
            width: '100px',
            display: 'block'
          }}
        >
          <Logo
            aria-label="App logo"
          />
        </Link>
      </div>
      <div className="navbar__faces">
        <Faces />
      </div>
    </nav>
  );
}
