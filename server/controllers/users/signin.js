import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import validateUserSignin from '../../helpers/signin';
import pool from '../../config/db';

dotenv.config();

const signin = async (req, res) => {
  try {
    // Validate user inputs
    const { error } = validateUserSignin.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

    // Check if the entered email exists
    const findUser = 'SELECT * FROM users WHERE email = $1';
    const values = req.body.email.trim().toLowerCase();
    const user = await pool.query(findUser, [values]);

    //   if user doesn't exist
    if (!user.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'Incorrect email or password',
      });
      return;
    }

    // Check if the entered password is correct
    const password = bcrypt.compareSync(req.body.password.trim(), user.rows[0].password);
    //   if password is Incorrect
    if (!password) {
      res.status(404).json({
        status: 404,
        error: 'Incorrect email or password',
      });
      return;
    }

    // if everything is correct
    // generate token
    const payload = {
      email: user.rows[0].email,
      first_name: user.rows[0].first_name,
      last_name: user.rows[0].last_name,
      address: user.rows[0].address,
      is_admin: user.rows[0].is_admin,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });

    res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.rows[0].id,
        first_name: user.rows[0].first_name,
        last_name: user.rows[0].last_name,
        email: user.rows[0].email,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};

export default signin;
