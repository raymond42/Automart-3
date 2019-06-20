import { describe, it } from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

describe('View used unsold cars', () => {
  it('user should be able to view used or new unsold cars', (done) => {
    const buyer = {
      email: 'ray@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v2/all?status=available&state=new')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});
