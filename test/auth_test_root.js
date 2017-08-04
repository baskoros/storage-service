let chai = require('chai');
let chakram = require('chakram'); 
let expect = chakram.expect;

let options = {
    headers : {
        'Authorization' : 'Bearer PB/dRIyg0QRBNKJkZmQ3QcW/Rxn/7Vbc7vvguY5Dwh8='
        }
    }

describe('Authorization Testing', () => {

    describe('Root testing', ()=> {

        it('Not authorized', () => { 
            return chakram.get('http://localhost:3300/')
                .then((res) => {
                    expect(res).to.have.status(401);
                })
                .catch(err => {throw err})
        }),
        it('Authorized', () => {
            return chakram.get('http://localhost:3300/', options)
                .then((res) => {
                    expect(res).to.have.status(200);
                })
                .catch(err => { throw err});
        }),
        it('Token kadaluarsa', () => {
            options = {
                headers : {
                    'Authorization' : 'Bearer salahhhsdahkjwa'
                }
            }
            return chakram.get('http://localhost:3300/', options)
                .then((res) => {
                    expect(res).to.have.status(401);
                })
                .catch(err => { throw err });
        })        
        

    }), 

    describe('Get Token', () => {

        it('Get token properly', () => {
            let options = {
                headers:
                {
                    'content-type': 'application/x-www-form-urlencoded',
                    authorization: 'Basic Y2xpZW50MTpzZWNyZXQ='
                },
                form: { grant_type: 'client_credentials' }
            }
            return chakram.request('POST', 'http://localhost:3300/oauth/token', options)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'application/json');
                })
                .catch(err => {
                    throw err;
                })
        }),
        it('Something wrong', () => {
            let options = {
                headers:
                {
                    'content-type': 'application/x-www-form-urlencoded',
                    authorization: 'Basic Y2xpZW50MTpzZWNyZssdwa='
                },
                form: { grant_type: 'client_credentials' }
            }
            return chakram.request('POST', 'http://localhost:3300/oauth/token', options)
                .then((res) => {
                    expect(res).to.have.status(401);
                    expect(res).to.have.header('content-type', 'application/json');
                })
                .catch(err => {
                    throw err;
                })
        })

    });
});
