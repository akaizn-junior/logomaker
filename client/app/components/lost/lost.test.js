/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { Lost } from './lost.jsx';

describe('Lost component test', () => {
  it('should exist', () => {
    const wrapper = enzyme.shallow(<Lost />);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have a ".lost" element', () => {
    const wrapper = enzyme.shallow(<Lost />);
    expect(wrapper.find('.lost')).to.have.lengthOf(1);
  });

  it('should have a ".lost__panel" element', () => {
    const wrapper = enzyme.shallow(<Lost />);
    expect(wrapper.find('.lost__panel')).to.have.lengthOf(1);
  });
});
