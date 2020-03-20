import axios from 'axios';

export function getLogos(term, done = () => {}, fail = () => {}) {
  if (term) {
    axios({
      baseURL: 'https://api.thenounproject.com/',
      url: `icon/${term}`,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'json'
      },
      auth: {
        oauth_consumer_key: '476e24fc91dd49e3bf492bc4c96e2e7c'
      }
    })
      .then(result => {
        done && typeof done === 'function' && done(result);
      })
      .catch(fail);
  }
}
