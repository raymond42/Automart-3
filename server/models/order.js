const order = [];

const order1 = {
  id: 1,
  car_id: 1,
  createdOn: '01/01/2019',
  status: 'pending',
  price: 40000,
  price_offered: 35000,
};

const order2 = {
  id: 2,
  car_id: 2,
  createdOn: '01/01/2019',
  status: 'rejected',
  price: 45000,
  price_offered: 42000,
};

order.push(order1, order2);
export default order;
