import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();

describe('Get a welcome message', () => {
  it('user should be able to get a welcome message', (done) => {
    chai.request(app)
      .get('/api/v2/auth/signup')
      .end((err, res) => {
        res.should.have.status(405);
        res.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
