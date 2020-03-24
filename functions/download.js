const axios = require('axios');

// setup the environment
require('dotenv').config();

exports.handler = function(event, context, callback) {
  const isOptions = event.httpMethod === 'OPTIONS';
  const isGet = event.httpMethod === 'GET';
  const imgUrl = event.queryStringParameters.img || '';

  const done = (err, status, data) => {
    callback(err, {
      statusCode: status,
      body: data,
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  };

  isOptions && done(null, 204);

  if (isGet) {
    axios({
      responseType: 'arraybuffer',
      method: 'GET',
      url: imgUrl
    })
      .then(res => done(null, 200, res.data))
      .catch(err => done(err, 500));
  }
};
