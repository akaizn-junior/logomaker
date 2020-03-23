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

  it('should have a "#landing-page" element', () => {
    const wrapper = enzyme.shallow(<Landing />);
    expect(wrapper.find('#landing-page')).to.have.lengthOf(1);
  });

  it('should have a ".main-section" element', () => {
    const wrapper = enzyme.shallow(<Landing />);
    expect(wrapper.find('.main-section')).to.have.lengthOf(1);
  });
});
