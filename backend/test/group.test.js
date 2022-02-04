const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../app');

chai.use(chaiHttp);

describe('Groups - Happy Path Tests', () => {
  describe('GET /api/v1/groups', () => {
    it('GET All Groups', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.count, 352);
          assert.equal(res.body.results.length, res.body.count);
          done();
        });
    });
  });

  describe('GET /api/v1/groups/:id', () => {
    it('GET specific artist by id', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups/1493')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.results.Id, 1493);
          assert.equal(res.body.results.Name, 'GOT7');
          done();
        });
    });
  });

  describe('GET /api/v1/groups?q=', () => {
    it('GET groups by search (Eng characters)', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups?q=GOT7')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.count, 1);
          assert.equal(res.body.results[0].Id, 1493);
          assert.equal(res.body.results[0].Name, 'GOT7');
          done();
        });
    });
  });

  describe('GET /api/v1/groups?q=', () => {
    it('GET group by search (KR characters)', (done) => {
      const uri = encodeURI('/api/v1/groups?q=%EA%B0%93%EC%84%B8%EB%B8%90');
      chai
        .request(app)
        .get(uri)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.status, 'success');
          assert.equal(res.body.count, 1);
          assert.equal(res.body.results[0].Id, 1493);
          assert.equal(res.body.results[0].Name, 'GOT7');
          done();
        });
    });
  });
});

describe('Groups - Unhappy Path Tests', () => {
  describe('GET /api/v1/groups/:id', () => {
    it('GET Groups Id out of range', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups/1781')
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          done();
        });
    });
  });

  describe('GET /api/v1/groups', () => {
    it('GET Groups search criteria not met', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups?q=blah')
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          done();
        });
    });
  });
});
