const db = require('../config/database/config.database.app');
const path = require('path');

const upload = {
  addUpload: payload => new Promise((resolve, reject) => {
    const uploadObject = {
      nama_file: payload.name,
      filename: path.basename(payload.path),
      path: payload.path,
    };
    db.insert(uploadObject)
      .into('file')
      .then(() => {
        resolve({
          message: 'Success to upload',
          filename: path.basename(payload.path),
          path: payload.path,
          resource_file: payload.nama_file,
        });
      })
      .catch((error) => {
        reject({
          message: 'Failed to upload',
          error: `'${error}'`,
        });
      });
  }),
};

module.exports = upload;
