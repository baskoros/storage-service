const crypto = require('crypto');
const db = require('../config/database/config.database.app');
const moment = require('moment')

let today
let tomorrow


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
        today = moment()
        tomorrow = today.add(2, process.env.EXPIRED)
        const token = generateToken(`${credentials.clientId}:${credentials.clientSecret}`);
        const newClient = {
          clientId: database[0].clientId,
          token: token,
          expiresIn: tomorrow.format("YYYY-MM-DD HH:mm:ss")
        }
        // const token = generateToken(`${credentials.clientId}:${credentials.clientSecret}`);
        return newClient;
      }
    })
    .then((result) => {
      db.insert(result)
        .into('token')
        .then(cb(null, result.token));
    })
    .catch(() => cb(null, false));
};

exports.authenticateToken = (token, req, cb) => {
  db.select('token', 'clientId', 'expiresIn')
    .from('token')
    .where('token', token)
    .then((result) => {
      const time = moment(result[0].expiresIn).format("YYYY-MM-DD HH:mm:ss")
      today = moment().format("YYYY-MM-DD HH:mm:ss")
      if (result[0].token === token && time >= today) {
        req.passport = true;
        return true;
      }
      return false;
    })
    .then(result => cb(null, result))
    .catch(error => cb(null, error));
};
