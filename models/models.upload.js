const db = require('../config/database/config.database.app');
const path = require('path')

const upload = {
    addUpload : (payload) => {
        // console.log(payload)
        return new Promise((resolve, reject) => {
            const uploadObject = {
                nama_file: payload.name,
                filename: path.basename(payload.path),
                path: payload.path
            };
            db.insert(uploadObject)
                .into('file')
                .then(() => {
                    resolve({
                        message: "Success to upload",
                        filename : path.basename(payload.path),
                        path: payload.path,
                        // filename :  payload.path.split('upload/'),
                        resource_file: payload.nama_file
                    });
                })
                .catch(error => {
                    reject({
                        message: "Failed to upload",
                        error: '\'' + error + '\''
                    });
                });
        });
    }
};


module.exports = upload;


// upload(req, res, function(err) {
// 	var bitmap = fs.readFileSync('./uploads/' + req.file.filename).toString('hex', 0, 4)
// 	if (!checkMagicNumbers(bitmap)) {
// 		fs.unlinkSync('./uploads/' + req.file.filename)
// 		res.end('File is no valid')
// 	}
// 	res.end('File is uploaded')
// })