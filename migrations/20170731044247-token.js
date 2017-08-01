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
  return db.createTable('token', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true 
    },
      
    clientId: { 
      type: 'string', 
      length: 256, 
      notNull: true,
      foreignKey: {
        name: 'clinetId',
        table: 'clients',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          clientId: 'clientId'
        }
      }
    },

    token: { 
      type: 'string', 
      length: 256
    },

    expiresIn: {
      type: 'datetime'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('token');
};

exports._meta = {
  "version": 1
};
