import React from 'react';
import { Logo } from '../../icons/logo';
import { Link } from 'react-router-dom';

import './navbar.css';

export function Navbar() {
  return (
    <nav>
      <div className="brand">
        <Logo
          title="Logo Maker"
          aria-label="Logo Maker"
        />
      </div>
      <div className="menu">
        <ul>
          <li
            title="About us"
            aria-label="About us"
          >
            <Link to="/">About</Link>
          </li>
          <li
            title="Reach out"
            aria-label="Reach out"
          >
          <Link to="/">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
