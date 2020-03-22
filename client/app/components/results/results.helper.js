import axios from 'axios';

function fetchLogos(term, done = () => {}, fail = () => {}) {
  if (term) {
    axios({
      baseURL: 'http://localhost:9000/.netlify/functions/',
      url: `getlogos?term=${term}`,
      method: 'GET'
    })
      .then(result => {
        done && typeof done === 'function' && done(result.data.icons);
      })
      .catch(fail);
  }
}

export function readCompany() {
  let company = new RegExp(/c=[a-zA-Z_0-9]+/g).exec(location.hash);
  return company && company[0] && company[0].split('=')[1].replace(/_/g, ' ') || '';
}

export function readKeywords() {
  let keywords = new RegExp(/k=[a-zA-Z_0-9]+/g).exec(location.hash);
  return keywords && keywords[0] && keywords[0].split('=')[1].replace(/_/g, ' ') || '';
}

export function getLogos(successCb) {
  const c = readCompany();
  const k = readKeywords();
  const term = k || c;
  fetchLogos(term, res => {
    successCb
    && typeof successCb === 'function'
    && successCb(Object.values(res));
  });
}
