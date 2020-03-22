import React from 'react';

import './lost.css';
import { Pageheader } from '../';
import { LostIcon } from '../../icons';

export function Lost() {
  return (
    <div>
      <Pageheader
        headerTitle="We've lost you!"
        headerSubtitles={[
          'Our machines are hard at working.',
          'Come back home.'
        ]}
      />
      <section className="main-section">
        <div id="lost-main" className="main-box">
          <LostIcon id="lost-svg" />
        </div>
      </section>
    </div>
  );
}
