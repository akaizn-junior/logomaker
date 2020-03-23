/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { Navbar } from './navbar.jsx';

describe('Navbar component test', () => {
  it('should exist', () => {
    const wrapper = enzyme.shallow(<Navbar />);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have a ".brand" element', () => {
    const wrapper = enzyme.shallow(<Navbar />);
    expect(wrapper.find('.brand')).to.have.lengthOf(1);
  });

  it('should have a ".menu" element', () => {
    const wrapper = enzyme.shallow(<Navbar />);
    expect(wrapper.find('.menu')).to.have.lengthOf(1);
  });
});
