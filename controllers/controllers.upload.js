const fs = require('fs');
require('dotenv').config();
const contentDisposition = require('content-disposition');
const destroy = require('destroy');
const onFinished = require('on-finished');
const path = require('path');
const uuid = require('uuid');

const Joi = require('joi');

const schema = Joi.object().keys({
  projectName: Joi.string().regex(/^[a-zA-Z0-9_.]+$/).min(3),
});

const upload = {
  addUpload: (req, res) => {
    const projectName = req.params.projectName;
    const newPath = process.env.DIRECTORY_LOCAL + projectName + '/';

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
      const newFile = newPath + uuid.v4() + ext;
      fs.rename(req.files.upload.path, newFile, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            reject({
              message: 'DirectoryNotExist',
            });
          }
          reject(err);
        }
        resolve({
          path: newFile,
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

  downloadProject: (req, res) => {
    projectName = req.params.projectName;
    let filepath = process.env.PROJECT_FOLDER + projectName + process.env.UPLOAD;
    const filename = req.params.filename;
    filepath = `${filepath}/${filename}`;

    fs.stat(filepath, (err, stats) => {
      if (err) {
        return res.send({ message: `Tidak menemukan ${projectName}${process.env.UPLOAD}${filename}` });
      }
      const ext = path.extname(filename);
      let fileType = '';
      switch (ext) {
        case '.png':
          fileType = 'image/png';
          break;
        case '.docx':
          fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case '.pdf':
          fileType = 'application/pdf';
          break;
        case '.zip':
          fileType = 'application/zip';
          break;
        case '.pptx':
          fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
          break;
        default:
          throw ('EXTENSI SALAH');
      }
      res.setHeader('Content-Type', fileType);
      res.setHeader('Content-Disposition', contentDisposition(filepath));

      const stream = fs.createReadStream(filepath);
      stream.pipe(res);
      onFinished(res, (err) => {
        destroy(stream);
      });
    });
  },

  deleteProject: (req, res) => {
    projectName = req.params.projectName;
    let filepath = process.env.PROJECT_FOLDER + projectName + process.env.UPLOAD;
    const filename = req.params.filename;
    filepath = `${filepath}/${filename}`;
    console.log(filepath);

    fs.stat(filepath, (err, stats) => {
      if (err) {
        return res.send({ message: `Tidak menemukan ${projectName}${process.env.UPLOAD}${filename}` });
      }
      fs.unlink(filepath, (err) => {
        if (err) {
          return console.error(err);
        }
        res.send({
          message: `Success to Delete ${req.params.filename}`,
        });
      });
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

    const projectPath = process.env.DIRECTORY_LOCAL + projectName;
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
