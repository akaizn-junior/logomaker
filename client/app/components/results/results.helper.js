/* globals ENV_ORIGIN */

import axios from 'axios';
import domtoimage from 'dom-to-image';

function fetchLogos(fetchData, done = () => {}, fail = () => {}) {
  const { term, page } = fetchData;

  if (term) {
    axios({
      baseURL: `${ENV_ORIGIN || ''}/.netlify/functions/`,
      url: `getlogos?term=${term}&page=${page}`,
      method: 'GET'
    })
      .then(result => {
        done && typeof done === 'function' && done(result.data.icons);
      })
      .catch(fail);
  }
}

export function readCompany(urlQuery) {
  let company = new RegExp(/c=[a-zA-Z_0-9]+/g).exec(urlQuery);
  return company && company[0] && company[0].split('=')[1].replace(/_/g, ' ') || '';
}

export function readKeywords(urlQuery) {
  let keywords = new RegExp(/k=[a-zA-Z_0-9]+/g).exec(urlQuery);
  return keywords && keywords[0] && keywords[0].split('=')[1].replace(/_/g, ' ') || '';
}

export function getLogos(successCb, errCb, page = 0) {
  const _successCb = successCb && typeof successCb === 'function' && successCb || function() {};
  const _errCb = errCb && typeof errCb === 'function' && errCb || function() {};

  // get correct data to use for fetch
  const c = readCompany(location.hash);
  const k = readKeywords(location.hash);
  const term = k || c;

  // fetch data
  fetchLogos({ term, page }, res => {
    _successCb(res);
  }, _errCb);
}

export function getSVG(url, text, success, fail = () => {}) {
  const _success = success && typeof success === 'function' && success || function() {};
  const _fail = fail && typeof fail === 'function' && fail || function() {};

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
  const _fail = fail && typeof fail === 'function' && fail || function() {};
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
      height: 1800,
      width: 2000,
      style: {
        border: 'none',
        outline: 'none',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: '120px',
        paddingTop: '15%',
        fontFamily: 'QuicksandBold'
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
