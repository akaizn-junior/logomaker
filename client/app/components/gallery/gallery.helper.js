/* globals ENV_ORIGIN, iconsBucket */

import axios from 'axios';

import { safeFun } from '../../utils/browser';
import {
  readBrandName,
  readKeywords
} from '../../utils/helpers';

export {
  readPack,
  readBrandName,
  readKeywords
} from '../../utils/helpers';

function fetchLogos(fetchData, done = () => {}, fail = () => {}) {
  const { term, text, page } = fetchData;
  const _done = safeFun(done);
  const _fail = safeFun(fail);

  if (term) {
    iconsBucket && iconsBucket
      .getItem(term + page)
      .then(exists => {
        if (exists) {
          _done(exists);
        } else {
          axios({
            baseURL: `${ENV_ORIGIN || ''}/.netlify/functions/`,
            url: `getlogos?term=${term}&page=${page}&text=${text}`,
            method: 'GET'
          })
            .then(result => {
              iconsBucket.setItem(term + page, result.data.icons);
              _done(result.data.icons);
            })
            .catch(_fail);
        }
      });
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
