/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../config/db';

dotenv.config();

const admin = {
  first_name: 'Raymond',
  last_name: 'Gakwaya',
  email: process.env.email,
  password: bcrypt.hashSync(JSON.stringify(process.env.password), 10),
  address: 'Kigali',
  is_admin: true,
};

const adAdmin = 'INSERT INTO users(email, first_name, last_name, password, address, is_admin) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING';
pool.query(adAdmin,
  [
    admin.email,
    admin.first_name,
    admin.last_name,
    admin.password,
    admin.address,
    admin.is_admin,
  ])
  .then(() => {
    console.log('Admin created');
  }).catch((error) => {
    console.log(error);
  });
