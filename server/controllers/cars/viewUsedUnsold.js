import pool from '../../config/db';

const getUsedUnsoldCars = async (req, res) => {
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
};

export default getUsedUnsoldCars;
