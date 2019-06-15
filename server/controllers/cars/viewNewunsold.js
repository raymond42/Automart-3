import cars from '../models/cars';

const getNewUnsoldCars = (req, res) => {
  const newUnsoldCars = cars.filter(c => c.status === 'available' && c.state === 'new');
  res.status(200).json({
    status: 200,
    data: newUnsoldCars,
  });
};

export default getNewUnsoldCars;
