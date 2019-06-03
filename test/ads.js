import { describe, it } from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

describe('Post a car a sale ad', () => {
  it('user should be able to post a car sale ad', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const carAd = {
      owner: 1,
      email: 'chris@gmail.com',
      manufacturer: 'Toyota',
      model: '2019 Toyota camry',
      price: 40000,
      state: 'new',
      status: 'available',
    };
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to post a car sale ad when he/she is not authorized', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when he/she is not in the system', (done) => {
    const user = {
      email: 'raymond@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15min' });
    const carAd = {
      owner: 1,
      email: 'fadskh@gmail.com',
      manufacturer: 'Toyota',
      model: '2019 Toyota camry',
      price: 40000,
      state: 'new',
      status: 'available',
    };
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when the owner id is not found', (done) => {
    const user = {
      email: 'raymond@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15min' });
    const carAd = {
      owner: 120,
      email: 'fadskh@gmail.com',
      manufacturer: 'Toyota',
      model: '2019 Toyota camry',
      price: 40000,
      state: 'new',
      status: 'available',
    };
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when there is a missing info', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15min' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when there is an empty info', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15min' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when there is a wrong input data type', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15min' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when he/she puts an invalid token', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, 'SECRET', { expiresIn: '15min' });
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
});
