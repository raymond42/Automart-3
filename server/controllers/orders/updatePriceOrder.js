import moment from 'moment';
import validatePricePrice from '../../helpers/updatePrice';
import pool from '../../config/db';
import Utils from '../../models/utils';

const updatePriceOrder = async (req, res) => {
  try {
    const { error } = validatePricePrice.validation(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
      return;
    }

    const idFound = await Utils.util('orders', 'id', parseInt(req.params.id, 10));
    if (!idFound.thing.rows.length) {
      res.status(404).json({
        status: 404,
        error: 'order not found',
      });
      return;
    }

    if (idFound.thing.rows[0].buyer !== req.user.id) {
      res.status(403).json({
        status: 403,
        error: 'You can only update your car order',
      });
      return;
    }

    if (idFound.thing.rows[0].status !== 'pending') {
      res.status(403).json({
        status: 403,
        error: 'sorry, the price of this order can not be changed',
      });
      return;
    }

    const newPrice = 'UPDATE orders SET amount = $1 WHERE id = $2';
    const values = [req.body.price_offered, idFound.value];
    await pool.query(newPrice, values);

    const findCar = 'SELECT * FROM cars WHERE id = $1';
    const carValue = parseInt(req.params.id, 10);
    const car = await pool.query(findCar, [carValue]);

    const newOrder = {
      id: idFound.thing.rows[0].id,
      card_id: idFound.thing.rows[0].card_id,
      created_on: moment().format('LL'),
      status: idFound.thing.rows[0].status,
      price: car.rows[0].price,
      old_price_offered: idFound.thing.rows[0].amount,
      new_price_offered: req.body.price_offered,
    };

    res.status(200).json({
      status: 200,
      data: newOrder,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Server error',
    });
  }
};

export default updatePriceOrder;
