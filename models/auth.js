const crypto = require('crypto');
const db = require('../config/database/config.database.app');

function generateToken(data) {
  const random = Math.floor(Math.random() * 100001);
  const timestamp = (new Date()).getTime();
  const sha256 = crypto.createHmac('sha256', `${random}WOO${timestamp}`);
  return sha256.update(data).digest('base64');
}

exports.grantClientToken = (credentials, req, cb) => {
  db.select('clientId', 'clientSecret')
    .from('clients')
    .where('clientId', credentials.clientId)
    .map((result) => {
      const database = {
        clientId: result.clientId,
        clientSecret: result.clientSecret,
      };
      return database;
    })
    .then((database) => {
      const isValid = database[0].clientSecret === credentials.clientSecret &&
        (database[0].clientId === credentials.clientId);
      if (isValid) {
        const token = generateToken(`${credentials.clientId}:${credentials.clientSecret}`);
        return token;
      }
    })
    .then((result) => {
      db.where('clientId', credentials.clientId)
        .update('token', result)
        .from('clients')
        .then(cb(null, result));
    })
    .catch(() => cb(null, false));
};

exports.authenticateToken = (token, req, cb) => {
  db.select('token', 'clientId')
    .from('clients')
    .where('token', token)
    .then((result) => {
      if (result[0].token === token) {
        req.passport = true;
        return true;
      }
      return false;
    })
    .then(result => cb(null, result))
    .catch(error => cb(null, error));
};
