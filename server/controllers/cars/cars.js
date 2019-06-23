/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import moment from 'moment';
import validateAd from '../../helpers/ads';
import pool from '../../config/db';
import validateUpdateStatus from '../../helpers/markCar';
import validatingRange from '../../helpers/priceRange';
import validatePostedPrice from '../../helpers/postedPrice';
import validateUnsold from '../../helpers/unsold';
import Utils from '../../models/utils';


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
          status: res.statusCode,
          error: error.details[0].message,
        });
        return;
      }

      const car = await Utils.util('cars', 'id', parseInt(req.params.id, 10));
      if (!car.thing.rows[0]) {
        res.status(404).json({
          status: res.statusCode,
          message: 'car post not found',
          data: [],
        });
        return;
      }

      if (car.thing.rows[0].status === req.body.status) {
        res.status(400).json({
          status: res.statusCode,
          error: `The car is already marked as ${car.thing.rows[0].status}`,
        });
        return;
      }

      const carStatus = 'UPDATE cars SET status = $1 WHERE id = $2';
      const values = [req.body.status, car.value];
      await pool.query(carStatus, values);
      const { id, owner, manufacturer, model, price, state } = car.thing.rows[0];
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
        status: res.statusCode,
        data: newCar,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }

  // get specific car
  static async getSpecificCar(req, res) {
    try {
      const car = await Utils.util('cars', 'id', parseInt(req.params.id, 10));

      if (!car.thing.rows[0]) {
        res.status(404).json({
          status: res.statusCode,
          message: 'car not found',
        });
      } else {
        res.status(200).json({
          status: res.statusCode,
          data: car.thing.rows,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
        error: 'Server error',
      });
    }
  }

  // get all cars
  static async getAllCars(req, res) {
    try {
      if (req.user.email !== 'admin@gmail.com') {
        res.status(403).json({
          status: res.statusCode,
          error: 'Sorry this service is strictly for the right person',
        });
        return;
      }

      const findCars = 'SELECT * FROM cars';
      const cars = await pool.query(findCars);
      if (!cars.rows[0]) {
        res.status(404).json({
          status: res.statusCode,
          message: 'no car found',
          data: [],
        });
        return;
      }

      res.status(200).json({
        status: res.statusCode,
        data: cars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
        error: 'Server error',
      });
    }
  }

  // get unsold cars
  static async getUnsoldCars(req, res) {
    try {
      const { error } = validateUnsold.validation(req.query);
      if (error) {
        res.status(400).json({
          status: res.statusCode,
          error: error.details[0].message,
        });
        return;
      }

      const unsoldCars = await Utils.util('cars', 'status', req.query.status);

      if (!unsoldCars.thing.rows[0]) {
        res.status(404).json({
          status: res.statusCode,
          message: `No ${unsoldCars.value} cars found`,
        });
        return;
      }
      res.status(200).json({
        status: res.statusCode,
        data: unsoldCars.thing.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
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
          status: res.statusCode,
          error: error.details[0].message,
        });
        return;
      }

      const range = await Utils.priceRange('cars', 'status', req.query.status, 'price', req.query.min_price, req.query.max_price);

      if (!range.thing.rows[0]) {
        res.status(404).json({
          status: res.statusCode,
          message: 'can not find car within that range',
          data: [],
        });
      } else {
        res.status(200).json({
          status: res.statusCode,
          data: range.thing.rows,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
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
          status: res.statusCode,
          error: error.details[0].message,
        });
        return;
      }
      const carId = await Utils.util('cars', 'id', parseInt(req.params.id, 10));
      if (!carId.rows.length) {
        res.status(404).json({
          status: res.statusCode,
          error: 'Car post not found',
        });
        return;
      }

      if (carId.rows[0].owner !== req.user.id) {
        res.status(403).json({
          status: res.statusCode,
          error: 'Sorry, you can only update your car post',
        });
        return;
      }
      const updateCar = 'UPDATE cars SET price = $1  WHERE id = $2';
      const values = [req.body.price, carId.value];
      await pool.query(updateCar, values);

      const { id, owner, state, status, manufacturer, model, body_type } = carId.rows[0];
      res.status(200).json({
        status: res.statusCode,
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
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
        error: 'Server error',
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
          status: res.statusCode,
          message: `no ${req.query.state} ${req.query.status} car found`,
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: res.statusCode,
        data: usedUnsoldCars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
        error: 'Server error',
      });
    }
  }

  // delete a car
  static async deleteCar(req, res) {
    try {
      const car = await Utils.util('cars', 'id', parseInt(req.params.id, 10));
      if (!car.thing.rows[0]) {
        res.status(404).json({
          status: res.statusCode,
          error: 'Car Ad not found',
        });
        return;
      }

      if (car.thing.rows[0].owner !== req.user.id && req.user.email !== 'admin@gmail.com') {
        res.status(403).json({
          status: res.statusCode,
          error: 'Sorry, you can not delete this car',
        });
        return;
      }
      const deleteCar = 'DELETE FROM cars WHERE id = $1';
      await pool.query(deleteCar, [car.value]);

      res.status(200).send({
        status: res.statusCode,
        data: 'Car Ad successfully deleted',
      });
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
        error: 'Server error',
      });
    }
  }
}

export default Cars;
