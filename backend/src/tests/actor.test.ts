import chai from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'

chai.use(chaiHttp)

describe('Actors ✅', () => {
  describe('GET /api/v2/actors', () => {
    it('Get All Actors', (done) => {
      chai
        .request(app)
        .get('/api/v2/actors')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 310)
          chai.assert.equal(res.body.results.length, res.body.count)
          done()
        })
    })
  })

  describe('GET /api/v2/actors/:id', () => {
    it('Get specific actors by id', (done) => {
      chai
        .request(app)
        .get('/api/v2/actors/1896')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.results.Id, 1896)
          chai.assert.equal(res.body.results.FullName, 'Park Hyung Sik')
          done()
        })
    })
  })

  describe('GET /api/v2/actors?q=', () => {
    it('Get actor by search (eng)', (done) => {
      chai
        .request(app)
        .get('/api/v2/actors?q=Park Hyung Sik')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1)
          chai.assert.equal(res.body.results[0].Id, 1896)
          chai.assert.equal(res.body.results[0].FullName, 'Park Hyung Sik')
          done()
        })
    })
  })

  describe('GET /api/v2/actors?q=', () => {
    it('Get actor by search (kor)', (done) => {
      chai
        .request(app)
        .get('/api/v2/actors?q=%EA%B0%95%ED%95%98%EB%8A%98')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1)
          chai.assert.equal(res.body.results[0].Id, 1829)
          chai.assert.equal(res.body.results[0].FullName, 'Kang Haneul')
          done()
        })
    })
  })
})

describe('Actors 🔥', () => {
  describe('GET /api/v2/actors/:id', () => {
    it('Get actors by id - out of range', (done) => {
      chai
        .request(app)
        .get('/api/v2/actors/2091')
        .then((res) => {
          chai.assert.equal(res.status, 404)
          chai.assert.equal(res.body.status, 'failed')
          done()
        })
    })
  })

  describe('GET /api/v2/actors', () => {
    it('Get actors - search criteria not met', (done) => {
      chai
        .request(app)
        .get('/api/v2/actors?q=GOT7')
        .then((res) => {
          chai.assert.equal(res.status, 404)
          chai.assert.equal(res.body.status, 'failed')
          done()
        })
    })
  })
})
