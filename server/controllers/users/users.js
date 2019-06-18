/* eslint-disable object-curly-newline */
/* eslint-disable indent */
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

class Users {
  // signup
  static async signup(req, res) {
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

      const hash = bcrypt.hashSync(req.body.password.trim(), 10);

      const is_admin = false;

      const newUser = {
        email: req.body.email.toLowerCase().trim(),
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
        password: hash,
        address: req.body.address.trim(),
      };
      const insertUser = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const results = await pool.query(insertUser,
        [
          newUser.email,
          newUser.first_name,
          newUser.last_name,
          newUser.password,
          newUser.address,
          is_admin,
        ]);

      const { id, email, first_name, last_name, address } = results.rows[0];
      const payload = {
        id,
        email,
        first_name,
        last_name,
        address,
        is_admin,
      };
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
     res.status(500).json({
       status: 500,
       error,
     });
    }
  }

  // login
  static async signin(req, res) {
    try {
      const findUser = 'SELECT * FROM users WHERE email = $1';
      const values = req.body.email.trim().toLowerCase();
      const { rows } = await pool.query(findUser, [values]);

      if (!rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'Incorrect email or password',
        });
        return;
      }

      const password = bcrypt.compareSync(req.body.password.trim(), rows[0].password);
      if (!password) {
        res.status(404).json({
          status: 404,
          error: 'Incorrect email or password',
        });
        return;
      }

      const { id, email, first_name, last_name, address, is_admin } = rows[0];
      const payload = {
        id,
        email,
        first_name,
        last_name,
        address,
        is_admin,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });

      res.status(200).json({
        status: 200,
        data: {
          token,
          id,
          first_name,
          last_name,
          email,
        },
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default Users;
