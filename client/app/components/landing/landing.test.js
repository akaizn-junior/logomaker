/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { Landing } from './landing.jsx';

describe('Landing component test', () => {
  it('should exist', () => {
    const wrapper = enzyme.shallow(<Landing />);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have a ".landing" element', () => {
    const wrapper = enzyme.shallow(<Landing />);
    expect(wrapper.find('.landing')).to.have.lengthOf(1);
  });

  it('should have a ".landing__panel" element', () => {
    const wrapper = enzyme.shallow(<Landing />);
    expect(wrapper.find('.landing__panel')).to.have.lengthOf(1);
  });
});
