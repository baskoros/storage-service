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

exports.up = function (db, callback) {
  db.createTable('clients', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    clientId: {type: 'string', unique: true, length: 256, notNull: true},
    clientSecret: {type: 'string', notNull: true, length: 256}
  }, insertJaki);

  function insertJaki(err) {
    if (err) { 
      callback(err); 
      return;
     }
    db.insert('clients', ['clientId', 'clientSecret'], ['aplikasiJaki', 'secretJaki'], insertCRM);
     function insertCRM(err){
       if(err){
         callback(err)
         return
       }
        db.insert('clients', ['clientId', 'clientSecret'], ['aplikasiCRM', 'secretCRM'], callback);
     }
  }
};

exports.down = function(db) {
  return db.dropTable('clients');
};

exports._meta = {
  "version": 1
};
