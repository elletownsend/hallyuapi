import chai from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'

chai.use(chaiHttp)

describe('Artists ✅', () => {
  describe('GET /api/v2/artists', () => {
    it('Get All Artists', (done) => {
      chai
        .request(app)
        .get('/api/v2/artists')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1428)
          chai.assert.equal(res.body.results.length, res.body.count)
          done()
        })
    })
  })

  describe('GET /api/v2/artists/:id', () => {
    it('Get specific artist by id', (done) => {
      chai
        .request(app)
        .get('/api/v2/artists/526')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.results.Id, 526)
          chai.assert.equal(res.body.results.FullName, 'Im Jaebum')
          done()
        })
    })
  })

  describe('GET /api/v2/artists?q=', () => {
    it('Get artist by search (eng)', (done) => {
      chai
        .request(app)
        .get('/api/v2/artists?q=Im Jaebum')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1)
          chai.assert.equal(res.body.results[0].Id, 526)
          chai.assert.equal(res.body.results[0].FullName, 'Im Jaebum')
          done()
        })
    })
  })

  describe('GET /api/v2/artists?q=', () => {
    it('Get artist by search (kor)', (done) => {
      chai
        .request(app)
        .get('/api/v2/artists?q=%EC%9E%84%EC%9E%AC%EB%B2%94')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1)
          chai.assert.equal(res.body.results[0].Id, 526)
          chai.assert.equal(res.body.results[0].FullName, 'Im Jaebum')
          done()
        })
    })
  })
})

describe('Artists 🔥', () => {
  describe('GET /api/v2/artists/:id', () => {
    it('Get artist by id - out of range', (done) => {
      chai
        .request(app)
        .get('/api/v2/artists/1429')
        .then((res) => {
          chai.assert.equal(res.status, 404)
          chai.assert.equal(res.body.status, 'failed')
          done()
        })
    })
  })

  describe('GET /api/v2/artists', () => {
    it('Get artists - search criteria not met', (done) => {
      chai
        .request(app)
        .get('/api/v2/artists?q=blah')
        .then((res) => {
          chai.assert.equal(res.status, 404)
          chai.assert.equal(res.body.status, 'failed')
          done()
        })
    })
  })
})
