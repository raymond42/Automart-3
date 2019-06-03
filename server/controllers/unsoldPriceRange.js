/* eslint-disable max-len */
import cars from '../models/cars';
import validateRange from '../helpers/priceRange';

const getUnsoldCarsWithinPriceRange = (req, res) => {
  const { error } = validateRange.validation(req.query);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const Price = {
    min_price: req.query.min_price,
    max_price: req.query.max_price,
  };
  const unsoldCars = cars.filter(car => car.status === 'available');
  const PriceRange = unsoldCars.filter(p => p.price >= Price.min_price && p.price <= Price.max_price);
  if (!PriceRange.length) {
    res.status(404).json({
      status: 404,
      error: 'there are no cars within that price range not found',
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: PriceRange,
  });
};
export default getUnsoldCarsWithinPriceRange;
