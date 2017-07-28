const fs = require('fs');
require('dotenv').config();
const path = require('path');
const uuid = require('uuid');
const Joi = require('joi');

let dir;

switch (process.env.ENVIRONMENT) {
  case 'prod':
    dir =  process.env.DIRECTORY_PROD;
    break;
  case 'dev':
    dir =  process.env.DIRECTORY_DEV;
    break;
  default:
    dir =  process.env.DIRECTORY_LOCAL;
    break;
}

const schema = Joi.object().keys({
  projectName: Joi.string().regex(/^[a-zA-Z0-9_.]+$/).min(3),
});

const upload = {
  addUpload: (req, res) => {
    const projectName = req.params.projectName;
    const newPath = dir + projectName + '/';

    const checkDir = new Promise((resolve, reject) => {
      fs.stat(newPath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            reject({
              message: 'DirectoryNotExist',
            });
          }
        } else {
          resolve();
        }
      });
    });

    const saveFile = () => new Promise((resolve, reject) => {
      const ext = path.extname(req.files.upload.path);
      const newFile = uuid.v4() + ext;
      const newFilePath = newPath + newFile;
      fs.rename(req.files.upload.path, newFilePath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            reject({
              message: 'DirectoryNotExist',
            });
          }
          reject(err);
        }
        resolve({
          status: "success",
          message: "File Upload",
          images: {
            fieldname: "file",
            originalname: req.files.upload.name,
            mimetype: req.files.upload.type,
            destination: dir,
            filename: newFile,
            path: newFilePath,
            size: req.files.upload.size
          },
          url: process.env.DOMAIN + projectName + '/' + newFile,
        });
      });
    });

    checkDir
      .then(() => saveFile())
      .then((result) => {
        res.json(200, result);
      })
      .catch((error) => {
        res.json(400, error);
      });
  },

  makeDirectory: (req, res) => {
    const projectName = req.params.projectName;

    Joi.validate({ projectName }, schema, (err) => {
      if (err) {
        res.send(400, {
          message: 'ValidationError',
          error: err,
        });
      }
    });

    const projectPath = dir + projectName;
    fs.stat(projectPath, (err) => {
      if (err) {
        fs.mkdir(projectPath, (err) => {
          if (err) {
            res.send(400, {
              message: 'DirectoryNotCreated',
              error: err,
            });
          }
          res.send(200, {
            message: 'DirectoryCreated',
          });
        });
      } else if (projectPath) {
        res.send(200, {
          message: 'DirectoryExists',
        });
      }
    });
  },
};

module.exports = upload;
