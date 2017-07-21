const _ = require("underscore");
const crypto = require("crypto");
const db = require('../config/database/config.database.app');

function generateToken(data) {
    const random = Math.floor(Math.random() * 100001);
    const timestamp = (new Date()).getTime();
    const sha256 = crypto.createHmac("sha256", random + "WOO" + timestamp);
    return sha256.update(data).digest("base64");
}

exports.grantClientToken = (credentials, req, cb) => {
        let query = db.select('clientId', 'clientSecret')
                        .from('clients')
                        .where('clientId', credentials.clientId)
                        .map(result => {
                            let database = {
                                clientId : result.clientId,
                                clientSecret : result.clientSecret
                            }
                            return database;
                        })
                        .then(database => {
                            let isValid = database[0].clientSecret === credentials.clientSecret && (database[0].clientId === credentials.clientId);
                            if (isValid) {
                                let token = generateToken(credentials.clientId + ":" + credentials.clientSecret);
                                return token;
                            }
                        }) 
                        .then(result => {
                            db.where('clientId', credentials.clientId)
                                .update('token', result)
                                .from('clients')
                                .then(cb(null, result))
                            })
                        .catch(error => {
                            return cb(null, false);
                        })
}

exports.authenticateToken = (token, req, cb) => {
    let query = db.select('token', 'clientId')
                    .from('clients')
                    .where('token', token)
                    .then(result => {
                        if (result[0].token === token){
                            req.passport = true;
                            return true;
                        }
                        else {
                            return false;
                        }
                    })
                    .then(result => {
                        return cb(null, result);
                    })
                    .catch(error => {
                        return cb(null, error);
                    })
}