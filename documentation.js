/**
 * @api {post} /:projectName/upload Request to upload file
 * @apiName UploadFile
 * @apiGroup Files
 * @apiVersion 0.1.0
 * @apiPermission user
 * @apiDescription This function use to upload a file
 * 
 * @apiExample Example usage:
 * localhost:3000/jaki/upload
 * 
 * @apiParam {String} projectName The Name of Project
 * 
 * @apiParamExample {json} Request Example
 * {
 *  projectName = 'jaki'
 * }
 * 
 * @apiSuccess {String} projectName The name of project
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 * {
 *  "message": "Success to upload"
 *  "filename": 'filename'
 *  "path": 'path'
 * }
 * 
 * @apiError ProjectNameError The project name was wrong
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  error: "Tidak menemukan jak/upload"
 * }
 */



/**
 * @api {get} /:projectName/download/:filename Request to download file
 * @apiName DownloadFile
 * @apiGroup Files
 * @apiVersion 0.1.0
 * @apiPermission user
 * @apiDescription This function use to download a file
 * 
 * @apiExample Example usage:
 * localhost:3000/jaki/download/gambar.png
 * 
 * @apiParam {String} projectName The Name of Project
 * @apiParam {String} filename The Name of file
 * 
 * @apiParamExample {json} Request Example
 * {
 *  projectName = 'jaki'
 *  filename = 'gambar.png'
 * }
 * 
 * @apiSuccess {String} filename The name of file
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 * {
 *  "message": "Success to download gambar.png"
 * }
 * 
 * @apiError ProjectNameError The project name was wrong
 * @apiError FileNameError The file name was wrong
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  error: "Tidak menemukan jak/download/gamba.png"
 * }
*/



/**
 * @api {del} /:projectName/delete/:filename Request to delete file
 * @apiName DeleteFile
 * @apiGroup Files
 * @apiVersion 0.1.0
 * @apiPermission user
 * @apiDescription This function use to delete a file
 * 
 * @apiExample Example usage:
 * localhost:3000/jaki/delete/gambar.png
 * 
 * @apiParam {String} projectName The Name of Project
 * @apiParam {String} filename The Name of file
 * 
 * @apiParamExample {json} Request Example
 * {
 *  projectName = 'jaki'
 *  filename = 'gambar.png'
 * }
 * 
 * @apiSuccess {String} filename The name of file
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 * {
 *  "message": Success to Delete gambar.png
 * }
 * 
 * @apiError ProjectNameError The project name was wrong
 * @apiError FileNameError The file name was wrong
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  error: "Tidak menemukan jak/delete/gamba.png"
 * }
*/




/**
 * @api {get} :projectName/../.. Request to get projectName
 * @apiName projectName
 * @apiGroup Path
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiDescription This function use to get path projectName from parameter
 * 
 * @apiExample Example Usage:
 * localhost:3000/jaki/../..
 * 
 * @apiParam {String} projectName Project name from user
 * 
 * @apiParamExample {json} Request Example
 * {
 *  projectName = 'jaki'
 * }
 * 
 * @apiSuccess {String} projectName Get user's project name
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 * {
 *  projectName = 'jaki'
 * }
 * 
 * @apiError ProjectNameError The project name was wrong
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  "error": "Tidak menemukan projectName"
 * }
 */




/**
 * @api {get} ../../:filename Request to get filename
 * @apiName fileName
 * @apiGroup Path
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiDescription This function use to get path filename from parameter
 * 
 * @apiExample Example Usage:
 * localhost:3000/../../gambar.png
 * 
 * @apiParam {String} filename File name from user
 * 
 * @apiParamExample {json} Request Example
 * {
 *  filename = 'gambar.png'
 * }
 * 
 * @apiSuccess {String} filename Get user's file name
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 * {
 *  filename = 'gambar.png'
 * }
 * 
 * @apiError FileNameError The file name was wrong
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  "error": "Tidak menemukan filename"
 * }
 */




/**
 * @api {post} ../:projectName Post to make directory
 * @apiName dirPorojectName
 * @apiGroup Project
 * @apiVersion 0.1.0
 * @apiPermission admin
 * @apiDescription This function use to make a directory projectName
 * 
 * @apiExample Example Usage:
 * localhost:3000/jaki
 * 
 * @apiParam {String} projectName project name from user
 * 
 * @apiParamExample {json} Request Example
 * {
 *  projectName = 'jaki'
 * }
 * 
 * @apiSuccess {String} projectName Make directory 'projectName'
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 * {
 *  "message" : "Success to make a directory"
 * }
 * 
 * @apiError ProjecNameError The project name has already
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  "error": "Directory has already"
 * }
 */