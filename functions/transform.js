const axios = require('axios');
const TextToSVG = require('text-to-svg');

const PNGReader = require('./imagetracer/PNGReader');
const ImageTracer = require('./imagetracer/imagetracer');

// setup the environment
require('dotenv').config();

exports.handler = function(event, context, callback) {
  const isOptions = event.httpMethod === 'OPTIONS';
  const isGet = event.httpMethod === 'GET';
  const text = event.queryStringParameters.text || '';
  const imgUrl = event.queryStringParameters.img || '';

  const done = (err, status, data) => {
    callback(err, {
      statusCode: status,
      body: JSON.stringify(data || ''),
      headers: {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
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
      .then(res => {
        const reader = new PNGReader(res.data);
        reader.parse(function(err, png) {
          if (err) {
            return done(err, 500);
          }

          // creating an ImageData object
          const myImageData = {
            width: png.width,
            height: png.height,
            data: png.pixels
          };

          // tracing to SVG string
          const imgSvg = ImageTracer.imagedataToSVG(myImageData, 'posterized2');

          TextToSVG.load('./fonts/Quicksand.otf', function(err, textToSVG) {
            if (err) {
              return done(err, 500);
            }

            const attributes = {
              fill: '#000000',
              stroke: '#000000'
            };

            const options = {
              x: 0,
              y: 120,
              fontSize: 100,
              anchor: 'bottom',
              attributes
            };

            const tSvg = textToSVG.getSVG(text, options);
            return done(null, 200, { icon: imgSvg, text: tSvg });
          });
        });
      })
      .catch(err => done(err, 500));
  }
};
