/* eslint-disable max-len */
import pool from '../../config/db';
import validatingRange from '../../helpers/priceRange';

const getUnsoldCarsWithinPriceRange = async (req, res) => {
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
};
export default getUnsoldCarsWithinPriceRange;
