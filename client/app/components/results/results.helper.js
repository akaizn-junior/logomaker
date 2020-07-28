/* globals ENV_ORIGIN */

import axios from 'axios';
import domtoimage from 'dom-to-image';

import { safeFun } from '../../utils/browser';

export function readBrandName(urlQuery) {
  const brandName = new RegExp(/b=[a-zA-Z_\-0-9]+/g).exec(urlQuery);
  return brandName && brandName[0]
    ? brandName[0].split('=')[1].replace(/_/g, ' ')
    : '';
}

export function readKeywords(urlQuery) {
  const keywords = new RegExp(/k=[a-zA-Z_\-0-9]+/g).exec(urlQuery);
  return keywords && keywords[0]
    ? keywords[0].split('=')[1].replace(/_/g, ' ')
    : '';
}

export function readPack(urlQuery) {
  const pack = new RegExp(/pack=[0-9]+/g).exec(urlQuery);
  return pack && pack[0]
    ? pack[0].split('=')[1]
    : 1;
}

function fetchLogos(fetchData, done = () => {}, fail = () => {}) {
  const { term, text, page } = fetchData;
  const _done = safeFun(done);

  if (term) {
    axios({
      baseURL: `${ENV_ORIGIN || ''}/.netlify/functions/`,
      url: `getlogos?term=${term}&page=${page}&text=${text}`,
      method: 'GET'
    })
      .then(result => {
        _done(result.data.icons);
      })
      .catch(fail);
  }
}

export function getLogos(successCb, errCb, page = 1) {
  const _successCb = safeFun(successCb);
  const _errCb = safeFun(errCb);

  // get correct data to use for fetch
  const b = readBrandName(location.hash);
  const k = readKeywords(location.hash);
  const term = k || b;

  // fetch data
  fetchLogos({ term, text: b, page }, res => {
    _successCb(res);
  }, _errCb);
}

export function domToImg(id, picname, fail) {
  const _fail = safeFun(fail);
  const node = document.getElementById(id).cloneNode(true);
  node.id = 'cloned';
  const tmp = document.createElement('div');
  tmp.setAttribute('hidden', 'hidden');
  tmp.appendChild(node);

  const imgEl = tmp.firstChild.firstChild.firstChild;
  if (imgEl.setAttribute) {
    imgEl.setAttribute('width', '700px');
    imgEl.setAttribute('height', '700px');
  }

  domtoimage
    .toPng(node, {
      height: 1900,
      width: 2000,
      cacheBust: true,
      style: {
        border: 'none',
        outline: 'none',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: '120px',
        fontWeight: 'bold',
        paddingTop: '15%',
        fontFamily: 'Quicksand'
      }
    })
    .then(dataUrl => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.setAttribute('download', picname);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(e => _fail(e));
}
