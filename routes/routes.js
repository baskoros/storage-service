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

  server.post(':projectName/upload', isAuthorized, uploadController.addUpload);
  server.get('/secret', isAuthorized, function(req, res){
        res.send('mengakses file secret')
    })
  server.get(/\/?.*/, restify.serveStatic({
    directory: './upload',
    default: 'index.html',
  }));
  server.post(':projectName', isAuthorized, uploadController.makeDirectory);
};
