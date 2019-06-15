import { describe, it } from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

describe('View all unsold cars within a price  range', () => {
  it('user should be able to view all unsold cars within a price  range', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v2/cars?status=available&min_price=0&max_price=300000')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to view all unsold cars within a price range when there is none', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v2/cars?status=available&min_price=0&max_price=30')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to view all unsold cars within a price range when he/she did not precise the price range', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .get('/api/v2/cars?status=available&min_price&max_price')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
