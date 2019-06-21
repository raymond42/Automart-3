import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

describe('updating the price posted car ad', () => {
  it('first user should signup', (done) => {
    const user = {
      email: 'raymundo@gmail.com',
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      password: 'Asdfg1',
      address: 'Rwanda',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('post a car sale first', (done) => {
    const payload = {
      id: 2,
      email: 'raymundo@gmail.com',
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
  it('seller should be able to update the price of posted car ad', (done) => {
    const seller = {
      id: 2,
      email: 'raymundo@gmail.com',
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      address: 'Rwanda',
      is_admin: false,
    };
    const token = jwt.sign(seller, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      price: 20000,
    };
    chai.request(app)
      .patch('/api/v2/car/4/price')
      .set('Authorization', token)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('seller should not be able to update the price of posted car ad when he is not authorized', (done) => {
    chai.request(app)
      .patch('/api/v2/car/2/price')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('seller should not be able to update the price of posted car ad when there is wrong input or not input at all', (done) => {
    const seller = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(seller, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .patch('/api/v2/car/2/price')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('seller should not be able to update the price of posted car ad when the car id is not found', (done) => {
    const seller = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(seller, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      price: 20000,
    };
    chai.request(app)
      .patch('/api/v2/car/20/price')
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
});
