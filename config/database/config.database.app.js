require('dotenv').config();
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'sembarang',
    database: process.env.DB_DATABASE || 'jktnxt',
    timezone: 'Asia/Jakarta',
  },
});

module.exports = knex;
