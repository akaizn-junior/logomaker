/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { Pageheader } from './header.jsx';

describe('Header component test', () => {
  it('should exist', () => {
    const wrapper = enzyme.shallow(<Pageheader />);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have a ".header-title" element', () => {
    const wrapper = enzyme.shallow(<Pageheader />);
    expect(wrapper.find('.header-title')).to.have.lengthOf(1);
  });

  it('should have a ".header-subtitle" element', () => {
    const wrapper = enzyme.shallow(<Pageheader />);
    expect(wrapper.find('.header-subtitle')).to.have.lengthOf(1);
  });
});
