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
      body: data || '',
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

          TextToSVG.load('./fonts/Quicksand-Regular.otf', function(err, textToSVG) {
            if (err) {
              return done(err, 500);
            }

            const attributes = {
              fill: '#000000',
              stroke: '#000000'
            };

            const options = {
              x: 75,
              y: 240,
              fontSize: 30,
              anchor: 'bottom',
              attributes
            };

            const tSvg = textToSVG.getPath(text, options);
            const svgWrap = '<svg viewBox="0 0 250 250" width="250" height="250">';

            let fullImgSvg = `<g width="80" height="80">${imgSvg}</g>`;

            let fullSvg = svgWrap + fullImgSvg + tSvg;
            fullSvg += '</svg>';

            return done(null, 200, fullSvg);
          });
        });
      })
      .catch(err => done(err, 500));
  }
};
