import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server/server';

dotenv.config();
chai.use(chaiHttp);
chai.should();

describe('Marking the posted car ad as sold', () => {
  it('first user should be able to post a car sale ad', (done) => {
    const payload = {
      id: 2,
      email: 'raymond@gmail.com',
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
        status: 'available',
        body_type: 'car',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should be able to mark a posted car ad as sold', (done) => {
    const payload = {
      id: 2,
      email: 'raymond@gmail.com',
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      address: 'Rwanda',
      is_admin: false,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v2/car/2/status')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to mark a posted car ad as sold when he/she is not authorized', (done) => {
    chai.request(app)
      .patch('/api/v2/car/1/status')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to mark a posted car ad as sold when the car is not in the system', (done) => {
    const user = {
      email: 'raymond@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const status = {
      status: 'sold',
    };
    chai.request(app)
      .patch('/api/v2/car/100/status')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message');
        done();
      });
  });
  it('user should not be able to mark a posted car ad as sold when there is a missing info', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    chai.request(app)
      .patch('/api/v2/car/2/status')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to mark a posted car ad as sold when there is a wrong input data', (done) => {
    const user = {
      email: 'chris@gmail.com',
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    const status = {
      status: 6,
    };
    chai.request(app)
      .patch('/api/v2/car/2/status')
      .set('Authorization', token)
      .send(status)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
