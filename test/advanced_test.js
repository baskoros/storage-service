const chakram = require('chakram');
const expect = chakram.expect;
const async = require('async');
let project_name = 'folder_for_testing';
let options = 
{
    headers : {
        'Authorization' : 'Bearer PB/dRIyg0QRBNKJkZmQ3QcW/Rxn/7Vbc7vvguY5Dwh8='
    }
}

// masih ada yang kurang
describe('Advanced testing for storage service', () => {
    describe('Multi POST request', () => {

        it('I dont know what will happen so.. ', () => {
            
            return chakram.all([
                chakram.post('http://localhost:3300/' + project_name, {}, options)
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    throw err;
                }),
                chakram.post('http://localhost:3300/' + project_name, {}, options)
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(err => {
                    throw err;
                }) 
            ])
            .then(result => {
                return chakram.wait();
            })
                               
        })
    })
})