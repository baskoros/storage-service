const chakram = require('chakram')
    , expect = chakram.expect
let projectName = 'jaki'
    , options = {
        headers: {
            Authorization: 'Bearer VeTE1v2Vgy7pSqdUCs+4U+x77IMuTvcwev3+bB9SwjU=',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },

        formData: {
            upload: {
                value: 'fs.createReadStream("/Users/fahrizal/Documents/SpiritITK/app/src/main/ic_launcher-web.png")',
                options: {
                    filename: '/Users/fahrizal/Documents/SpiritITK/app/src/main/ic_launcher-web.png',
                    contentType: null
                }
            }
        }
    }

describe('Upload File', () => {
    describe('Upload File Success', () => {
        it('Success to upload a file', () => {
            return chakram.request('POST', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(200)
                })
                .catch(err => {
                    throw err
                })
        })
    })

    describe('Upload File Failed', () => {
        it('Directory not exist', () => {
            let projectName = 'saya'
            return chakram.request('POST', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(400)
                })
                .catch(err => {
                    throw err
                })
        })

        it('User is unauthorize', () => {
            let options = {}
            return chakram.request('POST', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(401)
                })
                .catch(err => {
                    throw err
                })
        })

        it('Cannot read file', () => {
            let options = {
                headers: {
                    Authorization: 'Bearer VeTE1v2Vgy7pSqdUCs+4U+x77IMuTvcwev3+bB9SwjU=',
                    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                }
            }
            return chakram.request('POST', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(400)
                })
                .catch(err => {
                    throw err
                })
        })
    })

    describe('Only Post Method', () => {
        it('Method not allowed', () =>{
            chakram.request('GET', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(405)
                })
                .catch(err => {
                    throw err
                })
            chakram.request('DELETE', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(405)
                })
                .catch(err => {
                    throw err
                })
            chakram.request('PUT', 'http://localhost:3300/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(405)
                })
                .catch(err => {
                    throw err
                })
            chakram.request('PATCH', 'http://localhost/' + projectName + '/upload', options)
                .then(res => {
                    expect(res).to.have.status(405)
                })
                .catch(err => {
                    throw err
                })
            return chakram.wait()
        })
    })
})