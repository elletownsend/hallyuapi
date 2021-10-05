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
          done();
        });
    });
  });

    describe('GET /api/v1/groups?q=', () => {
    it('GET group by search (KR characters)', (done) => {
      chai
        .request(app)
        .get('/api/v1/groups?q=갓세븐')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });
});