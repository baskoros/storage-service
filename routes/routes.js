
const uploadController = require('../controllers/controllers.upload')
const restify = require('restify');
require('dotenv').config();
module.exports = (server) => {

// let dir;
// if (process.env.ENVIRONMENT == 'local'){
//     dir = process.env.DIRECTORY_LOCAL
// } else if (process.env.ENVIRONMENT == 'prod'){
//     dir = process.env.DIRECTORY_PROD
// } else if (process.env.ENVIRONMENT == 'dev'){
//     dir = process.env.DIRECTORY_DEV
// }
// console.log(dir)
// let bodyParser = restify.bodyParser({    
//     maxBodySize: 0,
//     mapParams: false,
//     mapFiles: false,
//     overrideParams: false,
//     keepExtensions: true,
//     uploadDir: dir,
//     multiples: false,
//     hash: 'sha1'
//  });

    function isAutorized(req, res, next){
        if(req.passport == true){
            next()
        } else {
            res.send(401, {message: 'User is Unauthorized'})
        }
    }

    server.get('/secret', isAutorized, function(req, res){
        res.send('mengakses file secret')
    })
    server.post(':projectName/upload', isAutorized, uploadController.addUpload);
    server.get(':projectName/download/:filename', isAutorized, uploadController.downloadProject);    
    server.del(':projectName/delete/:filename', isAutorized, uploadController.deleteProject);
    server.post(':projectName', isAutorized ,uploadController.makeDirectory)
}