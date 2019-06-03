import moment from 'moment';
import validatePricePrice from '../helpers/updatePrice';
import order from '../models/order';

const updatePriceOrder = (req, res) => {
  const { error } = validatePricePrice.validation(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const orderId = req.params.id;
  const orderIndex = order.findIndex(o => o.id === parseInt(orderId, 10));
  if (orderIndex > -1) {
    const originalOrder = order[orderIndex];
    if (originalOrder.status !== 'pending') {
      res.status(400).json({
        status: 400,
        error: 'you can change the price of pending purchasing orders only',
      });
      return;
    }
    const newOrder = {
      id: originalOrder.id,
      card_id: originalOrder.card_id,
      created_on: moment().format('LL'),
      status: originalOrder.status,
      old_price_offered: originalOrder.price_offered,
      new_price_offered: req.body.price_offered,
    };
    order[orderIndex] = {
      id: originalOrder.id,
      car_id: originalOrder.car_id,
      created_on: newOrder.created_on,
      status: originalOrder.status,
      price: originalOrder.price,
      price_offered: newOrder.new_price_offered,
    };
    res.status(200).json({
      status: 200,
      data: newOrder,
    });
    return;
  }
  res.status(404).json({
    status: 404,
    error: 'order not found',
  });
};

export default updatePriceOrder;
