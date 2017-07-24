const uploadController = require('../controllers/controllers.upload');
require('dotenv').config();
const restify = require('restify');

module.exports = (server) => {
  const isAuthorized = (req, res, next) => {
    if (req.passport === true) {
      next();
    } else {
      res.send(401, { message: 'User is Unauthorized' });
    }
  };

  server.get('/secret', isAuthorized, (req, res) => {
    res.send('mengakses file secret');
  });
  server.post(':projectName/upload', isAuthorized, uploadController.addUpload);
  server.get(/\/?.*/, restify.serveStatic({
    directory: './upload',
    default: 'index.html',
  }));
  server.del(':projectName/delete/:filename', isAuthorized, uploadController.deleteProject);
  server.post(':projectName', isAuthorized , uploadController.makeDirectory);
};
