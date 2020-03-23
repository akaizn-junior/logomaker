const fs = require('fs');

// setup the environment
require('dotenv').config();

exports.handler = function(event, context, callback) {
  const isOptions = event.httpMethod === 'OPTIONS';
  const isGet = event.httpMethod === 'GET';
  const name = event.queryStringParameters.name || '';
  const imgUrl = event.queryStringParameters.img || '';
  const imageName = name ? `${name}.png` : 'my-logo.png';

  const done = (err, status, data) => {
    callback(err, {
      statusCode: status,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${imageName}"`
      }
    });
  };

  isOptions && done(null, 204, {});

  if (isGet) {
    fs.readFile(imgUrl, (err, data) => {
      if (err) {
        return done(err, 404, {});
      }

      return done(null, 200, data);
    });
  }
};
