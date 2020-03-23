// exports.handler = function(event, context, callback) {
//   const isOptions = event.httpMethod === 'OPTIONS';
//   const isGet = event.httpMethod === 'GET';
//   const imgUrl = event.queryStringParameters.img || '';

//   const done = (err, status, data) => {
//     callback(err, {
//       statusCode: status,
//       body: JSON.stringify(data),
//       headers: {
//         'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
//         'Access-Control-Allow-Methods': 'GET, OPTIONS',
//         'Content-Type': 'application/json'
//       }
//     });
//   };

//   isOptions && done(null, 204, {});

//   if (isGet) {
//   }
// };
