const cars = [];

const car1 = {
  id: 1,
  owner: 1,
  createdOn: '01/01/2019',
  state: 'used',
  status: 'available',
  price: 40000,
  manufacturer: 'Toyota',
  model: '2019 Toyota camry',
  body_type: 'car',
};
const car2 = {
  id: 2,
  owner: 2,
  createdOn: '01/01/2019',
  state: 'used',
  status: 'sold',
  price: 40000,
  manufacturer: 'Toyota',
  model: '2019 Toyota camry',
  body_type: 'car',
};

const car3 = {
  id: 3,
  owner: 3,
  createdOn: '01/01/2019',
  state: 'new',
  status: 'available',
  price: 45000,
  manufacturer: 'Chevrolet',
  model: '2019 Chevrolet Silverado',
  body_type: 'car',
};
const car4 = {
  id: 4,
  owner: 4,
  createdOn: '01/01/2019',
  state: 'new',
  status: 'sold',
  price: 45000,
  manufacturer: 'Chevrolet',
  model: '2019 Chevrolet Silverado',
  body_type: 'car',
};

cars.push(car1, car2, car3, car4);
export default cars;
