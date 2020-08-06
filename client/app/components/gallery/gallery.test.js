/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Gallery } from './gallery.jsx';
// helpers
import {
  readBrandName,
  readKeywords
} from './gallery.helper';

describe('Gallery component test', () => {
  it('should exist', () => {
    const wrapper = enzyme.shallow(<Gallery />);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have a ".gallery__placeholder" element', () => {
    const wrapper = enzyme.shallow(<Gallery />);
    expect(wrapper.find('.gallery__placeholder')).to.have.lengthOf(1);
  });

  it('should have a ".gallery__panel" element', () => {
    const wrapper = enzyme.shallow(<Gallery />);
    expect(wrapper.find('.gallery__panel')).to.have.lengthOf(1);
  });

  it('should read an empty brand name from URL query', () => {
    const fnSpy = spy(readBrandName);
    expect(fnSpy('?')).to.be.a('string');
    expect(fnSpy('?')).to.be.empty;
  });

  it('should get the correct brand name via the URL', () => {
    const fnSpy = spy(readBrandName);
    expect(fnSpy('?b=Banana_Hammock')).to.be.a('string');
    expect(fnSpy('?b=Banana_Hammock')).to.equal('Banana Hammock');
  });

  it('should read an empty keyword URL query', () => {
    const fnSpy = spy(readKeywords);
    expect(fnSpy('?')).to.be.a('string');
    expect(fnSpy('?')).to.be.empty;
  });

  it('should get the correct brand name via the URL', () => {
    const fnSpy = spy(readKeywords);
    expect(fnSpy('?k=coffee')).to.be.a('string');
    expect(fnSpy('?k=coffee')).to.equal('coffee');
  });
});
