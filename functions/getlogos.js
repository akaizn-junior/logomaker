const NounProject = require('the-noun-project');

// setup the environment
require('dotenv').config();

exports.handler = function(event, _c, callback) {
  const isOptions = event.httpMethod === 'OPTIONS';
  const isGet = event.httpMethod === 'GET';
  const term = event.queryStringParameters.term;
  const limit = event.queryStringParameters.limit || 6;
  const page = event.queryStringParameters.page || 0;
  const offset = event.queryStringParameters.offset || 1;

  const done = (err, status, data) => {
    callback(err, {
      statusCode: status,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  };

  isOptions && done(null, 204, {});

  if (isGet) {
    const nounProject = new NounProject({
      key: process.env.NOUN_KEY,
      secret: process.env.NOUN_SECRET
    });

    nounProject.getIconsByTerm(term, { limit, offset, page }, (err, data) => {
      if (err) {
        return done(err, 404, {});
      }

      return done(null, 200, data);
    });
  }
};
