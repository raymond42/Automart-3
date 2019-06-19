/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import moment from 'moment';
import validateAd from '../../helpers/ads';
import pool from '../../config/db';
import validateUpdateStatus from '../../helpers/markCar';
import validatingRange from '../../helpers/priceRange';
import validatePostedPrice from '../../helpers/postedPrice';


class Cars {
  // post a car ad
  static async ads(req, res) {
    try {
      const { error } = validateAd.validation(req.body);
      if (error) {
        res.status(400).json({
          status: 400, error: error.details[0].message,
        });
        return;
      }

      const { manufacturer, model, price, state } = req.body;
      const created_on = moment().format('LL');
      const body_type = req.body.body_type || 'car';
      const owner = req.user.id;
      const status = 'available';

      const insertCar = 'INSERT INTO cars(created_on, owner, manufacturer, model, price, state, status, body_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      const results = await pool.query(insertCar,
        [
          created_on,
          owner,
          manufacturer,
          model,
          price,
          state,
          status,
          body_type,
        ]);

      res.status(201).json({
        status: 201,
        data: {
          id: results.rows[0].id,
          created_on,
          email: req.user.email,
          manufacturer,
          model,
          price,
          state,
          status,
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

  // mark a posted car as sold or available
  static async markCar(req, res) {
    try {
      const { error } = validateUpdateStatus.validation(req.body);
      if (error) {
        res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
        return;
      }
      const findCarId = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const car = await pool.query(findCarId, [value]);

      if (!car.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'car post not found',
          data: [],
        });
        return;
      }

      if (car.rows[0].status === req.body.status) {
        res.status(400).json({
          status: 400,
          error: `The car is already marked as ${car.rows[0].status}`,
        });
        return;
      }

      const carStatus = 'UPDATE cars SET status = $1 WHERE id = $2';
      const values = [req.body.status, value];
      await pool.query(carStatus, values);
      const { id, owner, manufacturer, model, price, state } = car.rows[0];
      const newCar = {
        id,
        owner,
        createdOn: moment().format('LL'),
        manufacturer,
        model,
        price,
        state,
        status: req.body.status,
      };

      res.status(200).json({
        status: 200,
        data: newCar,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  // get specific car
  static async getSpecificCar(req, res) {
    try {
      const findCar = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const car = await pool.query(findCar, [value]);

      if (!car.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'car not found',
          data: [],
        });
      } else {
        res.status(200).json({
          status: 200,
          data: car.rows[0],
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  // get all cars
  static async getAllCars(req, res) {
    try {
      const findCars = 'SELECT * FROM cars';
      const cars = await pool.query(findCars);
      if (!cars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'no car found',
          data: [],
        });
      }
      res.status(200).json({
        status: 200,
        data: cars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }

  // get unsold cars
  static async getUnsoldCars(req, res) {
    try {
      const findUnsoldCars = 'SELECT * FROM cars WHERE status = $1';
      const value = req.query.status;
      const unsoldCars = await pool.query(findUnsoldCars, [value]);

      if (!unsoldCars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'No available car found',
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: unsoldCars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
  }

  // get unsold cars within a price range
  static async unsoldCarsWithinRange(req, res) {
    try {
      const { error } = validatingRange.validation(req.query);
      if (error) {
        res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
        return;
      }

      const findPrice = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3';
      const values = [req.query.status, req.query.min_price, req.query.max_price];
      const range = await pool.query(findPrice, values);

      if (!range.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'can not find car within that range',
          data: [],
        });
      } else {
        res.status(200).json({
          status: 200,
          data: range.rows,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
  }

  // update the price of the car
  static async updatePriceCar(req, res) {
    try {
      const { error } = validatePostedPrice.validation(req.body);
      if (error) {
        res.status(400).json({
          status: 400,
          error: error.details[0].message,
        });
        return;
      }
      const findCarId = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const carId = await pool.query(findCarId, [value]);

      if (!carId.rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'Car post not found',
        });
        return;
      }
      const updateCar = 'UPDATE cars SET price = $1  WHERE id = $2';
      const values = [req.body.price, value];
      await pool.query(updateCar, values);

      const { id, owner, state, status, manufacturer, model, body_type } = carId.rows[0];
      res.status(200).json({
        status: 200,
        data: {
          id,
          owner,
          createdOn: moment().format('LL'),
          state,
          status,
          price: req.body.price,
          manufacturer,
          model,
          body_type,
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

  // get used or new unsold cars
  static async getUnsoldState(req, res) {
    try {
      const findUsedUnsoldCars = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
      const values = [req.query.status, req.query.state];
      const usedUnsoldCars = await pool.query(findUsedUnsoldCars, values);

      if (!usedUnsoldCars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: `no ${req.query.state} ${req.query.status} car found`,
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: usedUnsoldCars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }

  // delete a car
  static async deleteCar(req, res) {
    try {
      const findCar = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const car = await pool.query(findCar, [value]);
      if (!car.rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'Car Ad not found',
        });
        return;
      }

      if (car.rows[0].owner !== req.user.id && req.user.email !== 'admin@gmail.com') {
        res.status(403).json({
          status: 403,
          error: 'Sorry, you can not delete this car',
        });
        return;
      }
      const deleteCar = 'DELETE FROM cars WHERE id = $1';
      await pool.query(deleteCar, [value]);

      res.status(200).send({
        status: 200,
        data: 'Car Ad successfully deleted',
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }
}

export default Cars;
