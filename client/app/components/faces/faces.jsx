import React, { useState, useEffect } from 'react';

import {
  SmileyFace,
  HappyFace,
  WinkyFace,
  KissyFace
} from '../icons';
// styles
import './faces.css';

export function Faces() {
  const [currentFace, setCurrentFace] = useState(0);

  const faces = [
    <SmileyFace key={0} />,
    <HappyFace key={1} />,
    <KissyFace key={2} />,
    <WinkyFace key={3} />
  ];

  useEffect(() => {
    let i = currentFace;
    setTimeout(() => {
      setCurrentFace(++i % faces.length);
    }, 2500);
  }, [currentFace]);

  return (
    <div className="app-faces">
      {faces[currentFace]}
    </div>
  );
}
