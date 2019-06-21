import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

dotenv.config();
chai.use(chaiHttp);
chai.should();

describe('Purchasing order', () => {
  it('post a car sale first', (done) => {
    const payload = {
      id: 2,
      email: 'ray@gmail.com',
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      address: 'Rwanda',
      is_admin: false,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .post('/api/v2/car')
      .set('Authorization', token)
      .send({
        manufacturer: 'Toyota',
        model: '2019 Toyota camry',
        price: 40000,
        state: 'new',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('buyer should be able to make a purchasing order', (done) => {
    const payload = {
      id: 1,
      email: 'ray@gmail.com',
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      address: 'Rwanda',
      is_admin: false,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      car_id: 2,
      amount: 32000,
    };
    chai.request(app)
      .post('/api/v2/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('buyer should not be able to make a purchasing order when he/she is not authorized', (done) => {
    chai.request(app)
      .post('/api/v2/order')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('buyer should not be able to make a purchasing order when the car id is not found', (done) => {
    const buyer = {
      email: 'raymond@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      car_id: 10,
      amount: 20000,
    };
    chai.request(app)
      .post('/api/v2/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to make a purchasing order when there is a missing info', (done) => {
    const buyer = {
      email: 'raymond@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .post('/api/v2/order')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('buyer should not be able to make a purchasing order when there is a wrong input data type', (done) => {
    const buyer = {
      email: 'raymond@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      buyer: 1,
      car_id: 10,
      amount: 'two',
    };
    chai.request(app)
      .post('/api/v2/order')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
