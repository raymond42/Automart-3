import cars from '../models/cars';

const getCar = (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id, 10));
  if (!car) {
    res.status(404).json({
      status: 404,
      error: 'car not found',
    });
  } else {
    res.status(200).json({
      status: 200,
      data: car,
    });
  }
};

export default getCar;
