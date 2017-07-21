const uploadModel = require('../models/models.upload');
require('dotenv').config();
var fs = require('fs')
var contentDisposition = require('content-disposition')
var destroy = require('destroy')
var onFinished = require('on-finished')
var fs = require('fs')
var path = require('path')
var projectName = ''


const upload = {
    addUpload : (req, res) => {
        projectName = req.params.project
        var filepath = './project/' + projectName + '/upload'
        console.log(filepath)


        // fs.stat(filepath, function(err, stats){
        //     if(err){
        //         fs.readdir('./upload', (err, list) => {
        //         if(err)
        //             throw (err)
        //         list.forEach(function(file){
        //             if(path.extname(file)){
        //                 console.log(file)
        //                 fs.unlink(filepath + file, function(err){
        //                     if(err)
        //                         console.log(err)
        //                 })
        //             }
        //         })
        //     })

        //         return res.send({message : 'Tidak menemukan ' + projectName + '/upload'})
        //     }
        //     fs.readdir('./upload', (err, list) => {
        //         if(err)
        //             throw (err)
        //         list.forEach(function(file){
        //             if(path.extname(file)){
        //                 console.log(file)
        //                 fs.rename('/Users/fahrizal/Desktop/upload_download/upload/' + file, '/Users/fahrizal/Desktop/upload_download/project/' + projectName + '/upload/' + file, function(err){
        //                 if(err)
        //                     console.log(err)
        //                 })
        //             }
        //         })
        //     })
        //     uploadModel.addUpload(req.files.upload)
        //     .then(result => {
        //         res.json(200, result);
        //     })
        //     .catch(error => {
        //         res.json(400, error);
        //     });


        // })




        if(fs.existsSync(filepath)){
            fs.readdir('./upload', (err, list) => {
                if(err)
                    throw (err)
                list.forEach(function(file){
                    if(path.extname(file)){
                        console.log(file)
                        fs.rename('/Users/fahrizal/Desktop/upload_download/upload/' + file, '/Users/fahrizal/Desktop/upload_download/project/' + projectName + '/upload/' + file, function(err){
                        if(err)
                            console.log(err)
                        })
                    }
                })
            })
            uploadModel.addUpload(req.files.upload)
            .then(result => {
                res.json(200, result);
            })
            .catch(error => {
                res.json(400, error);
            });
        } else {
            fs.readdir('./upload', (err, list) => {
                if(err)
                    throw (err)
                list.forEach(function(file){
                    if(path.extname(file)){
                        console.log(file)
                        fs.unlink('/Users/fahrizal/Desktop/upload_download/upload/' + file, function(err){
                            if(err)
                                console.log(err)
                        })
                    }
                })
            })
            res.send(404, "DIRECTORY TIDAK DITEMUKAN")
        }

        uploadModel.addUpload(req.files.upload)
            .then(result => {
                res.json(200, result);
            })
            .catch(error => {
                res.json(400, error);
            });
    },

    // getDownload : (req, res) => {
        
    //     var filename = req.params.filename
    //     console.log(filename)
    //     filepath = filepath + filename

    //     if(path.extname(filename) == '.png'){
    //         res.setHeader('Content-Type', 'image/png')
    //     }
    //     else if(path.extname(filename) == '.docx'){
    //         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    //     }
    //     else if(path.extname(filename) == '.pdf'){
    //         res.setHeader('Content-Type', 'application/pdf')
    //     }

    //     else if(path.extname(filename) == '.zip'){
    //         res.setHeader('Content-Type', 'application/zip')
    //     }

    //     else if(path.extname(filename) == '.pptx'){
    //         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    //     }

    //     res.setHeader('Content-Disposition', contentDisposition(filepath))

    //     var stream = fs.createReadStream(filepath)
    //     stream.pipe(res)
    //     onFinished(res, function(err){
    //         destroy(stream)
    //     })
    // },

    downloadProject : (req, res) => {
        projectName = req.params.project
        var filepath = './project/' + projectName + '/upload'
        var filename = req.params.filename
            filepath = filepath + '/' + filename
        console.log(filepath)

        fs.stat(filepath, function(err, stats){
            if(err){
                return res.send({message : 'Tidak menemukan ' + projectName + '/upload/' + filename})
            }
            var ext = path.extname(filename)
            var fileType = ''
            switch(ext){
                case '.png':
                    fileType = 'image/png'
                    break
                case '.docx':
                    fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    break
                case '.pdf':
                    fileType = 'application/pdf'
                    break
                case '.zip':
                    fileType = 'application/zip'
                    break
                case '.pptx':
                    fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                    break
                default:
                    throw ("EXTENSI SALAH")
            }
            res.setHeader('Content-Type', fileType)
            res.setHeader('Content-Disposition', contentDisposition(filepath))

            var stream = fs.createReadStream(filepath)
            stream.pipe(res)
            onFinished(res, function(err){
                destroy(stream)
                console.log("SUCCESS")
            })
        })

        // if(fs.existsSync(filepath)){

        //     var ext = path.extname(filename)
        //     var fileType = ''
        //     switch(ext){
        //         case '.png':
        //             fileType = 'image/png'
        //             break
        //         case '.docx':
        //             fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        //             break
        //         case '.pdf':
        //             fileType = 'application/pdf'
        //             break
        //         case '.zip':
        //             fileType = 'application/zip'
        //             break
        //         case '.pptx':
        //             fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        //             break
        //         default:
        //             throw ("EXTENSI SALAH")
        //     }
        //     res.setHeader('Content-Type', fileType)
        //     res.setHeader('Content-Disposition', contentDisposition(filepath))

        //     var stream = fs.createReadStream(filepath)
        //     stream.pipe(res)
        //     onFinished(res, function(err){
        //         destroy(stream)
        //         console.log("SUCCESS")
        //     })
        // } else{
        //     res.send(404, "DIRECTORY TIDAK DITEMUKAN")
        // }
    },


    deleteProject : (req, res) => {
        projectName = req.params.project
        var filepath = './project/' + projectName + '/upload'
        var filename = req.params.filename
            filepath = filepath + '/' + filename
        console.log(filepath)

        fs.stat(filepath, function(err, stats){
            if(err){
                return res.send({message : 'Tidak menemukan ' + projectName + '/upload/' + filename})
            }
            fs.unlink(filepath, function(err){
                if(err){
                    return console.error(err)
                }
                res.send({
                    status : req.params.filename + "Delete Success"
                })
            })
        })

    }


};

module.exports = upload;

exports.projectName = projectName
