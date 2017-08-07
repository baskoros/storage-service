const chakram = require('chakram')
  , expect = chakram.expect

describe('Authorization', () => {
  describe('Authorizations Success', () => {
    it('User is authorize', () => {
      let options = {
        headers: {
          Authorization: 'Bearer 5VKFF5qQ+FuBZJZcav05NMg9tAasRUjteOdM/fsFZGY='
        }
      }
      return chakram.request('GET', 'http://localhost:3300/secret', options)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res).to.have.header('content-type','application/json')
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('Authorizations Failed', () => {
    it('User is unauthorize', () => {
      return chakram.request('GET', 'http://localhost:3300/secret')
        .then(res => {
          expect(res).to.have.status(401)
        })
        .catch(err => {
          throw err
        })
    }),
      it('Wrong or expired token', () => {
        let options = {
          headers: {
            Authorization: 'Bearer tokenSalahAtauKadaluarsa'
          }
        }
        return chakram.request('GET', 'http://localhost:3300/secret', options)
          .then(res => {
            expect(res).to.have.status(401)
          })
          .catch(err => {
            throw err
          })
      })
  })
})

describe('Get Token', () => {
  describe('Get Token Success', () => {
    it('Success to get a token', () => {
      let options = {
        headers: {
          Authorization: 'Basic YXBsaWthc2lKYWtpOnNlY3JldEpha2k=',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: { grant_type: 'client_credentials' }
      }
      return chakram.request('POST', 'http://localhost:3300/oauth/token', options)
        .then(res => {
          expect(res).to.have.status(200)
        })
        .catch(err => {
          throw err
        })
    })
  })

  describe('Get Token Failed', () => {
    it('Failed to get a token', () => {
      let options = {
        headers: {
          Authorization: 'Basic YXBsaWthc2lKYWtpOnNlY3JldEpha2=',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: { grant_type: 'client_credentials' }
      }
      return chakram.request('POST', 'http://localhost:3300/oauth/token', options)
        .then(res => {
          expect(res).to.have.status(401)
        })
    })
  })

  describe('Only Post Method', () => {
    it('Method not allowed', () => {
      let options = {
        headers: {
          Authorization: 'Basic YXBsaWthc2lKYWtpOnNlY3JldEpha2k=',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: { grant_type: 'client_credentials' }
      }
      chakram.request('GET', 'http://localhost:3300/oauth/token', options)
        .then(res => {
          expect(res).to.have.status(405)
        })
        .catch(err => {
          throw err
        })
      chakram.request('PUT', 'http://localhost:3300/oauth/token', options)
        .then(res => {
          expect(res).to.have.status(405)
        })
        .catch(err => {
          throw err
        })
      chakram.request('DELETE', 'http://localhost:3300/oauth/token', options)
        .then(res => {
          expect(res).to.have.status(405)
        })
        .catch(err => {
          throw err
        })
      chakram.request('PATCH', 'http://localhost:3300/oauth/token', options)
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