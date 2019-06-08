import pool from '../../config/db';
import validateUnsold from '../../helpers/unsold';

const getUnsoldCars = async (req, res) => {
  try {
    const { error } = validateUnsold.validation(req.query);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }
    const findUnsoldCars = 'SELECT * FROM cars WHERE status = $1';
    const value = req.query.status;
    const unsoldCars = await pool.query(findUnsoldCars, [value]);

    if (!unsoldCars.rows[0]) {
      res.status(404).json({
        status: 404,
        error: 'No available car found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: unsoldCars.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'server error',
    });
  }
};
export default getUnsoldCars;
