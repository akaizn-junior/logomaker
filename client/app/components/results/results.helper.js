import axios from 'axios';

export function getLogos(term, done = () => {}, fail = () => {}) {
  if (term) {
    axios({
      baseURL: 'https://api.thenounproject.com/',
      url: `icons/${term}`,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'json'
      },
      withCredentials: true,
      auth: {}
    })
      .then(result => {
        done && typeof done === 'function' && done(result);
      })
      .catch(fail);
  }
}
