import moment from 'moment';
import validatePostedPrice from '../../helpers/postedPrice';
import pool from '../../config/db';

const updatePriceCar = async (req, res) => {
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

    const carUpdated = {
      id: carId.rows[0].id,
      owner: carId.rows[0].owner,
      createdOn: moment().format('LL'),
      state: carId.rows[0].state,
      status: carId.rows[0].status,
      price: req.body.price,
      manufacturer: carId.rows[0].manufacturer,
      model: carId.rows[0].model,
      body_type: carId.rows[0].body_type,
    };

    res.status(200).json({
      status: 200,
      data: carUpdated,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default updatePriceCar;
