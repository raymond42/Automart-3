import { describe, it } from 'mocha';
import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

chai.use(chaiHttp);
chai.should();
dotenv.config();

describe('updating the price purchasing order', () => {
  it('buyer should be able to update the price of purchasing order', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      price_offered: 20000,
    };
    chai.request(app)
      .patch('/api/v1/order/1/price')
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

  it('buyer should not be able to update the price of purchasing order when he/she is not authorized', (done) => {
    chai.request(app)
      .patch('/api/v1/order/1/price')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to update the price of purchasing order when the purchasing order is not in the system', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      price_offered: 20000,
    };
    chai.request(app)
      .patch('/api/v1/order/100/price')
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
  it('buyer should not be able to update the price of purchasing order when there is a missing info', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .patch('/api/v1/order/1/price')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('buyer should not be able to update the price of purchasing order when there is a wrong input data type', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      price_offered: 'jhasdhjh',
    };
    chai.request(app)
      .patch('/api/v1/order/1/price')
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
  it('buyer should not be able to update the price of purchasing order when the status is not pending', (done) => {
    const buyer = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(buyer, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const newOrder = {
      price_offered: 40000,
    };
    chai.request(app)
      .patch('/api/v1/order/2/price')
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
