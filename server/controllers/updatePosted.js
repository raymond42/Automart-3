import moment from 'moment';
import validatePostedPrice from '../helpers/postedPrice';
import ads from '../models/ads';

const updatePriceCar = (req, res) => {
  const { error } = validatePostedPrice.validation(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
    return;
  }
  const carId = req.params.id;
  const carIndex = ads.findIndex(o => o.id === parseInt(carId, 10));
  if (carIndex > -1) {
    const originalCar = ads[carIndex];
    const newCar = {
      id: originalCar.id,
      owner: originalCar.owner,
      createdOn: moment().format('LL'),
      state: originalCar.state,
      status: originalCar.status,
      price: req.body.price,
      manufacturer: originalCar.manufacturer,
      model: originalCar.model,
      body_type: originalCar.body_type,
    };
    ads[carIndex] = {
      id: originalCar.id,
      owner: originalCar.owner,
      createdOn: newCar.createdOn,
      state: originalCar.state,
      status: originalCar.status,
      price: newCar.price,
      manufacturer: originalCar.manufacturer,
      model: originalCar.model,
      body_type: originalCar.body_type,
    };
    res.status(200).json({
      status: 200,
      data: newCar,
    });
    return;
  }
  res.status(404).json({
    status: 404,
    error: 'car post not found',
  });
};
export default updatePriceCar;
