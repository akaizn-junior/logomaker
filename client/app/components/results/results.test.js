/* globals describe, it */
import React from 'react';
import enzyme from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Results } from './results.jsx';
// helpers
import {
  readBrandName,
  readKeywords
} from './results.helper';

describe('Results component test', () => {
  it('should exist', () => {
    const wrapper = enzyme.shallow(<Results />);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have a ".results__placeholder" element', () => {
    const wrapper = enzyme.shallow(<Results />);
    expect(wrapper.find('.results__placeholder')).to.have.lengthOf(1);
  });

  it('should have a ".results__panel" element', () => {
    const wrapper = enzyme.shallow(<Results />);
    expect(wrapper.find('.results__panel')).to.have.lengthOf(1);
  });

  it('should read an empty company name from URL query', () => {
    const fnSpy = spy(readBrandName);
    expect(fnSpy('?')).to.be.a('string');
    expect(fnSpy('?')).to.be.empty;
  });

  it('should get the correct company name via the URL', () => {
    const fnSpy = spy(readBrandName);
    expect(fnSpy('?c=Banana_Hammock')).to.be.a('string');
    expect(fnSpy('?c=Banana_Hammock')).to.equal('Banana Hammock');
  });

  it('should read an empty keyword URL query', () => {
    const fnSpy = spy(readKeywords);
    expect(fnSpy('?')).to.be.a('string');
    expect(fnSpy('?')).to.be.empty;
  });

  it('should get the correct company name via the URL', () => {
    const fnSpy = spy(readKeywords);
    expect(fnSpy('?k=coffee')).to.be.a('string');
    expect(fnSpy('?k=coffee')).to.equal('coffee');
  });
});
