require('dotenv').config();
const restify = require('restify');
const oauth2 = require('restify-oauth2');
const models = require('./models/auth');

const server = restify.createServer({
  name: 'JSC Storage Service',
  version: '1.0.0',
});

require('body-parser');
const routes = require('./routes/routes');


restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
restify.CORS.ALLOW_HEADERS.push('Accept-Language');
restify.CORS.ALLOW_HEADERS.push('x-admin-token');
restify.CORS.ALLOW_HEADERS.push('x-apps-token');

server.use(restify.CORS());
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: true }));


server.use(restify.bodyParser({
  maxBodySize: 0,
  mapParams: false,
  mapFiles: false,
  overrideParams: false,
  keepExtensions: true,
  multiples: false,
  hash: 'sha1',
}));

oauth2.cc(server, {
  tokenEndpoint: '/oauth/token',
  hooks: models,
  tokenExpirationTime: '2 Minggu'
});

routes(server);

server.listen(process.env.PORT, () => {
  console.log('%s listening at %s', server.name, server.url);
});
