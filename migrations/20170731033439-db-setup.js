'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('clients', {
    id : {type: 'int', primaryKey: true, autoIncrement: true},
    clientId : {type: 'string', length: 100, unique : true},
    clientSecret : {type : 'string', length: 100}
  });
};

exports.down = function(db) {
  return db.dropTable('clients');
};

exports._meta = {
  "version": 1
};
