import axios from 'axios';

function fetchLogos(term, done = () => {}, fail = () => {}) {
  if (term) {
    axios({
      baseURL: '/.netlify/functions/',
      url: `getlogos?term=${term}`,
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

export function getLogos(successCb, errCb) {
  const _successCb = successCb && typeof successCb === 'function' && successCb || function() {};
  const _errCb = errCb && typeof errCb === 'function' && errCb || function() {};

  // get correct data to use for fetch
  const c = readCompany(location.hash);
  const k = readKeywords(location.hash);
  const term = k || c;

  // fetch data
  fetchLogos(term, res => {
    _successCb(Object.values(res));
  }, _errCb);
}
