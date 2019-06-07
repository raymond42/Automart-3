import moment from 'moment';
import validateOrder from '../../helpers/order';
import pool from '../../config/db';

const Order = async (req, res) => {
  try {
    const { error } = validateOrder.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

    const newOrder = {
      buyer: req.body.buyer,
      car_id: req.body.car_id,
      amount: req.body.amount,
      status: req.body.status || 'pending',
    };

    const findBuyerId = 'SELECT * FROM users WHERE id = $1';
    const value = newOrder.buyer;
    const buyerId = await pool.query(findBuyerId, [value]);

    if (!buyerId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'buyer id not found',
      });
      return;
    }

    const findCarId = 'SELECT * FROM cars WHERE id = $1';
    const carValue = newOrder.car_id;
    const carId = await pool.query(findCarId, [carValue]);

    if (!carId.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'car ordered not found',
      });
      return;
    }
    const insertOrder = 'INSERT INTO orders(buyer, car_id, amount, status) VALUES($1, $2, $3, $4) RETURNING *';
    const results = await pool.query(insertOrder,
      [
        newOrder.buyer,
        newOrder.car_id,
        newOrder.amount,
        newOrder.status,
      ]);

    res.status(201).json({
      status: 201,
      data: {
        id: results.rows[0].id,
        car_id: results.rows[0].car_id,
        created_on: moment().format('LL'),
        status: results.rows[0].status,
        price: carId.rows[0].price,
        price_offered: results.rows[0].amount,
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

export default Order;
