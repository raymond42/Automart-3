import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server/server';

dotenv.config();

chai.use(chaiHttp);
chai.should();

// signup
describe('signup', () => {
  it('user should be able to signup', (done) => {
    const user = {
      email: 'raye@gmail.com',
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

  it('user should not be able to signup when there is incorrect data type', (done) => {
    const user = {
      email: 'raye@gmail.com',
      first_name: 1,
      last_name: 'Gakwaya',
      password: 'Asdfg1',
      address: 'Rwanda',
      is_admin: false,
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when the email is already registered', (done) => {
    const user = {
      email: 'raye@gmail.com',
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      password: 'Asdfg1',
      address: 'Rwanda',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when email is not entered', (done) => {
    const user = {
      first_name: 'Raymond',
      last_name: 'Gakwaya',
      password: 'Asdfg1',
      address: 'Rwanda',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

// signin
describe('signin', () => {
  it('user should be able to signin', (done) => {
    const user = {
      email: 'raye@gmail.com',
      password: 'Asdfg1',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to signin when the email is not registered', (done) => {
    const user = {
      email: 'afhdsfd@gmail.com',
      password: 'Asdfg1',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to signin on wrong email', (done) => {
    const user = {
      email: 'admin@gmail.com',
      password: 'Asdfg1',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});
