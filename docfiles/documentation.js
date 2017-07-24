/**
 * @api {post} /oauth/token Gets authentication token (OAuth2)
 * @apiName Authentication
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiDescription Gets authentication token (OAuth2). Only supports client_credentials grant.
 *
 * @apiExample Example usage:
 * localhost:3000/oauth/token
 *
 * @apiParam {String} grant_type OAuth2 grant type. MUST be filled with client_credentials
 *
 * @apiSuccess {String} access_token OAuth2 token.
 * @apiSuccess {String} token_tupe Token type. Will always be Bearer.
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 {
     "access_token": "X1GKSJwgpmPcqoMqyd6pHdO/WFQrZ64n1HAEcQJxL+I=",
     "token_type": "Bearer"
 }
*/

/**
 * @api {post} /:projectName/upload Request to upload file
 * @apiName UploadFile
 * @apiGroup Files
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiDescription Uploads file
 * 
 * @apiExample Example usage:
 * localhost:3000/jaki/upload
 * 
 * @apiParam {String} projectName projectName The Name of Project
 * 
 * @apiSuccess {String} url URL of created file
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 {
     "url": "localhost:3300/test/58bccec7-988c-42a0-b446-7d483660ce1b.png"
 }
 * 
 * @apiError DirectoryNotExist The project does not exist
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 {
     "message": "DirectoryNotExist"
 }
 */

/**
 * @api {get} /:url Downloads file
 * @apiName DownloadFile
 * @apiGroup Files
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiDescription Downloads a file
 * 
 * @apiExample Example usage:
 * localhost:3300/test/b0e6231b-c3cf-4fc5-a228-10bd84653a13.png
 * 
 * @apiParam {String} url URL of file
 *
 * @apiError ResourceNotFound File cannot be found
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 404 Resource Not Found
 {
     "code": "ResourceNotFound",
     "message": "/test/58bccec7-988c-42a0-b446-7d483660ce1b.pngs"
 }
*/

/**
 * @api {post} /:projectName Create directory/project
 * @apiName CreateProject
 * @apiGroup Project
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiDescription Creates a new project which then creates a directory
 * 
 * @apiExample Example Usage:
 * localhost:3300/jaki
 * 
 * @apiParam {String} projectName Project name
 * 
 * @apiSuccess {String} message Status
 * 
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200 Ok
 {
     "message": "DirectoryCreated"
 }
 * 
 * @apiError DirectoryExists The directory/project already exists
 * 
 * @apiErrorExample Error Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  "error": "DirectoryExists"
 * }
 */
