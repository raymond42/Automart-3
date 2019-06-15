/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../../config/db';
import validateUserSignup from '../../helpers/users';
import '@babel/polyfill';


dotenv.config();

// signup
const signup = async (req, res) => {
  try {
    const { error } = validateUserSignup.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

    const findUser = 'SELECT * FROM users WHERE email = $1';
    const values = req.body.email.toLowerCase();
    const user = await pool.query(findUser, [values]);

    if (user.rows[0]) {
      res.status(403).json({
        status: 403,
        error: 'Sorry the email you have entered already exists in the system, try another one!',
      });
      return;
    }

    const password = bcrypt.hashSync(req.body.password.trim(), 10);

    if (req.body.email.trim().toLowerCase() !== 'admin@gmail.com') {
      user.admin = false;
    } else {
      user.admin = true;
    }

    const is_admin = user.admin;
    const {
      first_name, last_name, email, address,
    } = req.body;
    const insertUser = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const results = await pool.query(insertUser, [
      email,
      first_name,
      last_name,
      password,
      address,
      is_admin,
    ]);

    const payload = {
      email,
      first_name,
      last_name,
      password,
      address,
      is_admin,
    };
    const { id } = results.rows[0];
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });
    res.status(201).json({
      status: 201,
      data: {
        token,
        id,
        first_name,
        last_name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default signup;
