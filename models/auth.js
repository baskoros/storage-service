const crypto = require('crypto');
const db = require('../config/database/config.database.app');
const moment = require('moment');

function generateToken(data) {
  const random = Math.floor(Math.random() * 100001);
  const timestamp = (new Date()).getTime();
  const sha256 = crypto.createHmac('sha256', `${random}WOO${timestamp}`);
  return sha256.update(data).digest('base64');
}

let today = moment();
// If not working use this
// let tomorrow = today.add(1, 'day');
let tomorrow = today.add(process.env.DURATION, process.env.DURATION_TIME);

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
        const new_input = {
          clientId : database[0].clientId,
          token : token,
          expiresIn : tomorrow.format("YYYY-MM-DD HH:mm:ss"),
        }
        return new_input;
      }
    })
    .then((result) => {
      db.insert(result).into('tokens')
        .then(cb(null, result.token));
    })
    .catch(() => cb(null, false));
};

exports.authenticateToken = (token, req, cb) => {
  db.select('token', 'expiresIn')
    .from('tokens')
    .where('token', token)
    .then((result) => {
      const time_query = moment(result[0].expiresIn).format("YYYY-MM-DD HH:mm:ss");
      today = moment().format("YYYY-MM-DD HH:mm:ss");
      isValid = time_query >= today;
      if (result[0].token === token && isValid) {
        req.passport = true;
        return true;
      }
      else {
        return false;
      }
    })
    .then(result => cb(null, result))
    .catch(error => cb(null, error));
};
