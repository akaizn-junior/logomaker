/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { Card } from './card.jsx';

describe('Card component test', () => {
  it('should exist', () => {
    const card = enzyme.shallow(<Card />);
    expect(card).to.have.lengthOf(1);
  });

  it('should have a ".results-card" element', () => {
    const card = enzyme.shallow(<Card />);
    expect(card.find('.results-card')).to.have.lengthOf(1);
  });

  it('should have a ".download-panel" element', () => {
    const card = enzyme.shallow(<Card />);
    expect(card.find('.download-panel')).to.have.lengthOf(1);
  });
});
