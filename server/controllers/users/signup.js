/* eslint-disable camelcase */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../../config/db';
import validateUserSignup from '../../helpers/users';


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

    const hash = bcrypt.hashSync(req.body.password.trim(), 10);

    if (req.body.email.trim().toLowerCase() !== 'admin@gmail.com') {
      user.admin = false;
    } else {
      user.admin = true;
    }

    const is_admin = user.admin;

    const newUser = {
      email: req.body.email.toLowerCase().trim(),
      first_name: req.body.first_name.trim(),
      last_name: req.body.last_name.trim(),
      password: hash,
      address: req.body.address.trim(),
      is_admin,
    };
    const insertUser = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const results = await pool.query(insertUser,
      [
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.address,
        newUser.is_admin,
      ]);


    const payload = {
      id: results.rows[0].id,
      email: results.rows[0].email,
      firstName: results.rows[0].firstName,
      lastName: results.rows[0].lastName,
      address: results.rows[0].address,
      isAdmin: results.rows[0].isAdmin,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });

    res.status(201).json({
      status: 201,
      data: {
        token,
        id: results.rows[0].id,
        firstName: results.rows[0].firstName,
        lastName: results.rows[0].lastName,
        email: results.rows[0].email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
};

export default signup;
