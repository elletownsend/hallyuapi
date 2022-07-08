import chai from 'chai'
import chaiHttp from 'chai-http'

import app from '../app'

chai.use(chaiHttp)

describe('Groups ✅', () => {
  describe('GET /api/v2/groups', () => {
    it('Get All Groups', (done) => {
      chai
        .request(app)
        .get('/api/v2/groups')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 352)
          chai.assert.equal(res.body.results.length, res.body.count)
          done()
        })
    })
  })

  describe('GET /api/v2/groups/:id', () => {
    it('Get specific group by id', (done) => {
      chai
        .request(app)
        .get('/api/v2/groups/1493')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.results.Id, 1493)
          chai.assert.equal(res.body.results.Name, 'GOT7')
          done()
        })
    })
  })

  describe('GET /api/v2/groups?q=', () => {
    it('Get group by search (eng)', (done) => {
      chai
        .request(app)
        .get('/api/v2/groups?q=GOT7')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1)
          chai.assert.equal(res.body.results[0].Id, 1493)
          chai.assert.equal(res.body.results[0].Name, 'GOT7')
          done()
        })
    })
  })

  describe('GET /api/v2/groups?q=', () => {
    it('Get group by search (kor)', (done) => {
      chai
        .request(app)
        .get('/api/v2/groups?q=%EA%B0%93%EC%84%B8%EB%B8%90')
        .then((res) => {
          chai.assert.equal(res.status, 200)
          chai.assert.equal(res.body.status, 'success')
          chai.assert.equal(res.body.count, 1)
          chai.assert.equal(res.body.results[0].Id, 1493)
          chai.assert.equal(res.body.results[0].Name, 'GOT7')
          done()
        })
    })
  })
})

describe('Groups 🔥', () => {
  describe('GET /api/v2/groups/:id', () => {
    it('Get group by id - out of range', (done) => {
      chai
        .request(app)
        .get('/api/v2/groups/1781')
        .then((res) => {
          chai.assert.equal(res.status, 404)
          chai.assert.equal(res.body.status, 'failed')
          done()
        })
    })
  })

  describe('GET /api/v2/groups', () => {
    it('Get groups - search criteria not met', (done) => {
      chai
        .request(app)
        .get('/api/v2/groups?q=blah')
        .then((res) => {
          chai.assert.equal(res.status, 404)
          chai.assert.equal(res.body.status, 'failed')
          done()
        })
    })
  })
})
