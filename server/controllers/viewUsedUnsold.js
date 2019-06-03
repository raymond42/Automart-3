import cars from '../models/cars';

const getUsedUnsoldCars = (req, res) => {
  const usedUnsoldCars = cars.filter(c => c.status === 'available' && c.state === 'used');
  res.status(200).json({
    status: 200,
    data: usedUnsoldCars,
  });
};

export default getUsedUnsoldCars;
