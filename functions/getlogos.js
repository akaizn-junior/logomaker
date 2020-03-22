const NounProject = require('the-noun-project');

// setup the environment
require('dotenv').config();

exports.handler = function(event, context, callback) {
  const isOptions = event.httpMethod === 'OPTIONS';
  const isGet = event.httpMethod === 'GET';
  const term = event.queryStringParameters.term;
  const limit = event.queryStringParameters.limit || 6;

  const done = (err, logos) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(logos),
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  };

  isOptions && done(null, {});

  const nounProject = new NounProject({
    key: process.env.NOUN_KEY,
    secret: process.env.NOUN_SECRET
  });

  isGet && nounProject.getIconsByTerm(term, { limit }, function(err, data) {
    if (err) {
      return done(err, {});
    }

    return done(null, data);
  });
};
