const supertest = reuqire('supertest')
const should = require('should')

describe('jaki2', () => {
    let api = supertest('http://localhost:3000')
    it('returns a 200 for known user', (done) => {
        api.get('/search?email=homer@thesimpsons.com')
            .expect(200, done)
    })
})