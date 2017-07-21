require('dotenv').config();
const restify = require('restify');
const restifyOAuth2 = require('restify-oauth2');
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

let dir;
if (process.env.ENVIRONMENT === 'local') {
  dir = process.env.DIRECTORY_LOCAL;
} else if (process.env.ENVIRONMENT === 'prod') {
  dir = process.env.DIRECTORY_PROD;
} else if (process.env.ENVIRONMENT === 'dev') {
  dir = process.env.DIRECTORY_DEV;
}

server.use(restify.bodyParser({
  maxBodySize: 0,
  mapParams: false,
  mapFiles: false,
  overrideParams: false,
  keepExtensions: true,
  uploadDir: dir,
  multiples: false,
  hash: 'sha1',
}));

restifyOAuth2.cc(server, { tokenEndpoint: '/oauth/token', hooks: models });

routes(server);

server.listen(process.env.PORT, () => {
  console.log('%s listening at %s', server.name, server.url);
});
