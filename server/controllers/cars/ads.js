import moment from 'moment';
import validateAd from '../../helpers/ads';
import pool from '../../config/db';

const Ads = async (req, res) => {
  try {
    const { error } = validateAd.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400, error: error.details[0].message,
      });
      return;
    }

    const newAd = {
      created_on: moment().format('LL'),
      owner: req.body.owner,
      email: req.body.email.trim().toLowerCase(),
      manufacturer: req.body.manufacturer.trim(),
      model: req.body.model.trim(),
      price: req.body.price,
      state: req.body.state.trim(),
      status: req.body.status.trim(),
      body_type: req.body.body_type || 'car',
    };
    const findOwnerId = 'SELECT * FROM users WHERE id = $1';
    const values = newAd.owner;
    const ownerId = await pool.query(findOwnerId, [values]);

    if (!ownerId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'owner not found',
      });
      return;
    }

    const findEmail = 'SELECT * FROM users WHERE email = $1';
    const value = newAd.email;
    const user = await pool.query(findEmail, [value]);
    if (!user.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'Incorrect email',
      });
      return;
    }
    const insertCar = 'INSERT INTO cars(created_on, owner, manufacturer, model, price, state, status, body_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const results = await pool.query(insertCar,
      [
        newAd.created_on,
        newAd.owner,
        newAd.manufacturer,
        newAd.model,
        newAd.price,
        newAd.state,
        newAd.status,
        newAd.body_type,
      ]);
    res.status(201).json({
      status: 201,
      data: {
        id: results.rows[0].id,
        created_on: results.rows[0].created_on,
        email: newAd.email,
        manufacturer: results.rows[0].manufacturer,
        model: results.rows[0].model,
        price: results.rows[0].price,
        state: results.rows[0].state,
        status: results.rows[0].status,
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

export default Ads;
