/* globals ENV_ORIGIN */

import axios from 'axios';
import domtoimage from 'dom-to-image';

import { safeFun } from '../../utils/browser';

function fetchLogos(fetchData, done = () => {}, fail = () => {}) {
  const { term, page } = fetchData;
  const _done = safeFun(done);

  if (term) {
    axios({
      baseURL: `${ENV_ORIGIN || ''}/.netlify/functions/`,
      url: `getlogos?term=${term}&page=${page}`,
      method: 'GET'
    })
      .then(result => {
        _done(result.data.icons);
      })
      .catch(fail);
  }
}

export function readBrandName(urlQuery) {
  const brandName = new RegExp(/b=[a-zA-Z_0-9]+/g).exec(urlQuery);
  return brandName && brandName[0]
    ? brandName[0].split('=')[1].replace(/_/g, ' ')
    : '';
}

export function readKeywords(urlQuery) {
  const keywords = new RegExp(/k=[a-zA-Z_0-9]+/g).exec(urlQuery);
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

export function getLogos(successCb, errCb, page = 1) {
  const _successCb = safeFun(successCb);
  const _errCb = safeFun(errCb);

  // get correct data to use for fetch
  const b = readBrandName(location.hash);
  const k = readKeywords(location.hash);
  const term = k || b;

  // fetch data
  fetchLogos({ term, page }, res => {
    _successCb(res);
  }, _errCb);
}

export function getSVG(url, text, success, fail = () => {}) {
  const _success = safeFun(success);
  const _fail = safeFun(fail);

  axios({
    method: 'GET',
    baseURL: `${ENV_ORIGIN || ''}/.netlify/functions/`,
    url: `transform?img=${url}&text=${text}`
  })
    .then(res => {
      _success(res.data);
    })
    .catch(_fail);
}

export function domToImg(id, picname, fail) {
  const _fail = safeFun(fail);
  const node = document.getElementById(id).cloneNode(true);
  node.id = 'cloned';
  const tmp = document.createElement('div');
  tmp.setAttribute('hidden', 'hidden');
  tmp.appendChild(node);

  const imgEl = tmp.firstChild.firstChild.firstChild;
  imgEl.setAttribute('width', '700px');
  imgEl.setAttribute('height', '700px');

  domtoimage
    .toPng(node, {
      height: 1900,
      width: 2000,
      cachebust: true,
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
      link.setAttribute('download', picname); // or any other extension
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    })
    .catch(_fail);
}
