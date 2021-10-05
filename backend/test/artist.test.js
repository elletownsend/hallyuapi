const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../app');

chai.use(chaiHttp);

describe('Artists - Happy Path Tests', () => {
  describe('GET /api/v1/artists', () => {
    it('GET All Artists', (done) => {
      chai
        .request(app)
        .get('/api/v1/artists')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  describe('GET /api/v1/artists/:id', () => {
    it('GET specific artist by id', (done) => {
      chai
        .request(app)
        .get('/api/v1/artists/526')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  describe('GET /api/v1/artists?q=', () => {
    it('GET artists by search (Eng characters)', (done) => {
      chai
        .request(app)
        .get('/api/v1/artists?q=Im Jaebum')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

    describe('GET /api/v1/artists?q=', () => {
    it('GET artist by search (KR characters)', (done) => {
      const uri = encodeURI('/api/v1/artists?q=임재범');
      chai
        .request(app)
        .get(uri)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });
});