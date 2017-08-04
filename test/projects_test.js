const chakram = require('chakram');
const expect = chakram.expect;
let project_name = 'folder_for_testing';
let options = 
{
    headers : {
        'Authorization' : 'Bearer PB/dRIyg0QRBNKJkZmQ3QcW/Rxn/7Vbc7vvguY5Dwh8='
    }
}
describe('Create project', () => {
    describe('Project created successfully', () => {
        it('Min 3 fulfilled', () => {
            return chakram.post('http://localhost:3300/' + project_name, {}, options)
                .then(res => {
                    expect(res).to.have.status(200);
                })
        })
    }), 
    describe('Project not created', () => {
        it('Not fulfilled', () => {
            project_name = '12';
            return chakram.post('http://localhost:3300/' + project_name, {}, options)
                .then(res => {
                    expect(res).to.have.status(400);
                })
        }), 
        it('Already exist', () => {
            return chakram.post('http://localhost:3300/' + project_name, {}, options)
                .then(res => {
                    expect(res).to.have.status(400);
                })
        }), 
        it('Not authorized', () => {
            options = {};
            return chakram.post('http://localhost:3300/' + project_name, {}, options)
                .then(res => {
                    expect(res).to.have.status(401);
                })
        })        
    })
}),
describe('Cant do anything more to this project', ()=>{
    it('only can post', () => {
        chakram.put('http://localhost:3300/' + project_name)
            .then(res => {
                res.to.have.status(405);
            });
        chakram.delete('http://localhost:3300/' + project_name)
            .then(res => {
                res.to.have.status(405);
            });
        chakram.patch('http://localhost:3300/' + project_name)
            .then(res => {
                res.to.have.status(405);
            });
        return chakram.wait();
    })
}), 

describe('Upload to project folder', () => {
    it('Fulfilled the specs', () => {
        let fs = require('fs');
        options = {
            headers:
            {
                authorization: 'Bearer PB/dRIyg0QRBNKJkZmQ3QcW/Rxn/7Vbc7vvguY5Dwh8=',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData:
            {
                upload:
                {
                    value: 'fs.createReadStream("authentication-survival-guide.pdf")',
                    options:
                    {
                        filename: 'authentication-survival-guide.pdf',
                        contentType: null
                    }
                }
            }
        }
        return chakram.request('POST', 'http://localhost:3300/' + project_name + '/upload', options)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'application/json');
            })
    }), 
    
    it('Not authorized', () => {
       let fs = require('fs');
        options = {
            headers:
            {
                authorization: 'Bearer PB/dRIyg0QRBNKJkZmQ3QcW/Rxn/7Vbc7vvguY5Dwhdsawa8=',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData:
            {
                upload:
                {
                    value: 'fs.createReadStream("authentication-survival-guide.pdf")',
                    options:
                    {
                        filename: 'authentication-survival-guide.pdf',
                        contentType: null
                    }
                }
            }
        }
        return chakram.request('POST', 'http://localhost:3300/' + project_name + '/upload', options)
            .then(res => {
                expect(res).to.have.status(401);
                expect(res).to.have.header('content-type', 'application/json');
            }) 
    }), 

    it('No directory', () => {
        let fs = require('fs');
        project_name = "tidak_ada";
        options = {
            headers:
            {
                authorization: 'Bearer PB/dRIyg0QRBNKJkZmQ3QcW/Rxn/7Vbc7vvguY5Dwh8=',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData:
            {
                upload:
                {
                    value: 'fs.createReadStream("authentication-survival-guide.pdf")',
                    options:
                    {
                        filename: 'authentication-survival-guide.pdf',
                        contentType: null
                    }
                }
            }
        }
        return chakram.request('POST', 'http://localhost:3300/' + project_name + '/upload', options)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'application/json');
            }) 
    })
    
})
