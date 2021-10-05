const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../app');

chai.use(chaiHttp);

describe('Actors - Happy Path Tests', () => {
  describe('GET /api/v1/actors', () => {
    it('GET All Actors', (done) => {
      chai
        .request(app)
        .get('/api/v1/actors')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  describe('GET /api/v1/actors/:id', () => {
    it('GET specific actor by id', (done) => {
      chai
        .request(app)
        .get('/api/v1/actors/1896')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  describe('GET /api/v1/actors?q=', () => {
    it('GET actor by search (Eng characters)', (done) => {
      chai
        .request(app)
        .get('/api/v1/actors?q=Park Hyung Sik')
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

    describe('GET /api/v1/actors?q=', () => {
    it('GET actor by search (KR characters)', (done) => {
      const uri = encodeURI('/api/v1/actors?q=강하늘'); 
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

describe('Actors - Unhappy Path Tests', () => {

  describe('GET /api/v1/actors/:id', () => {
    it('GET Actors Id out of range', (done) => {
      chai
        .request(app)
        .get('/api/v1/actors/2091')
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          done();
        });
    });
  });

    describe('GET /api/v1/actors', () => {
    it('GET Actors search criteria not met', (done) => {
      chai
        .request(app)
        .get('/api/v1/actors?q=GOT7')
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          done();
        });
    });
  });
});