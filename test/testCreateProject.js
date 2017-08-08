const chakram = require('chakram')
    , expect = chakram.expect
let projectName = 'jaki'
    , options = {
        headers: {
            Authorization: 'Bearer 5VKFF5qQ+FuBZJZcav05NMg9tAasRUjteOdM/fsFZGY='
        }
    }

describe('Create Project', () => {
    describe('Create Project Success', () => {
        it('Project name at least has 3 characters', () => {
            return chakram.request('POST', 'http://localhost:3300/' + projectName, options)
                .then(res => {
                    expect(res).to.have.status(200)
                })
                .catch(err => {
                    throw err
                })
        })
    })

    describe('Create Project Failed', () => {
        let projectName = 'as'
        it('Project name less then 3 characters', () => {
            return chakram.request('POST', 'http://localhost:3300/' + projectName, options)
                .then(res => {
                    expect(res).to.have.status(400)
                })
                .catch(err => {
                    throw err
                })
        })

        it('Project name already Exist', () => {
            return chakram.request('POST', 'http://localhost:3300/' + projectName, options)
                .then(res => {
                    expect(res).to.have.status(400)
                })
                .catch(err => {
                    throw err
                })
        })

        it('User is Unauthorized', () => {
            let options = {}
            return chakram.request('POST', 'http://localhost:3300/' + projectName, options)
                .then(res => {
                    expect(res).to.have.status(401)
                })
                .catch(err => {
                    throw err
                })
        })
    })
    describe('Only Post Method', () => {
        it('Method not allowed', () => {
            chakram.request('GET', 'http://localhost:3300/' + projectName)
                .then(res => {
                    expect(res).to.have.status(404)
                })
                .catch(err => {
                    throw err
                })
            chakram.request('DELETE', 'http://localhost:3300/' + projectName)
                .then(res => {
                    expect(res).to.have.status(405)
                })
                .catch(err => {
                    throw err
                })
            chakram.request('PUT', 'http://localhost:3300/' + projectName)
                .then(res => {
                    expect(res).to.have.status(405)
                })
                .catch(err => {
                    throw err
                })
            chakram.request('PATCH', 'http://localhost:3300/' + projectName)
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