import axios from 'axios';

export function getLogos(term, resultsCb = () => {}) {
  axios({
    baseURL: 'https://api.thenounproject.com/',
    url: `icon/${term}`,
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: false,
    auth: {
      oauth_consumer_key: '476e24fc91dd49e3bf492bc4c96e2e7c'
    }
  })
    .then(result => {
      resultsCb && typeof resultsCb === 'function' && resultsCb(result);
    })
    .catch(() => {});
}
