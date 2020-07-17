import React from 'react';

// style
import './lost.css';
import { Link } from 'react-router-dom';

export function Lost() {
  return (
    <section className="lost">
      <div className="lost__panel">
        <span>We&apos;ve lost you. Come back</span>
        &nbsp;<Link to="/">home!</Link>
      </div>
    </section>
  );
}
