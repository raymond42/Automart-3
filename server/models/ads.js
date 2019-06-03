const ads = [];

const ad1 = {
  id: 1,
  email: 'chris@gmail.com',
  createdOn: '01/01/2019',
  manufacturer: 'Toyota',
  model: '2019 Toyota camry',
  price: 40000,
  state: 'new',
  status: 'sold',
};
ads.push(ad1);

const ad2 = {
  id: 2,
  email: 'chris@gmail.com',
  createdOn: '01/01/2019',
  manufacturer: 'Chevrolet',
  model: '2019 Chevrolet Silverado',
  price: 40000,
  state: 'used',
  status: 'available',
};
const ad3 = {
  id: 3,
  email: 'chris@gmail.com',
  createdOn: '01/01/2019',
  manufacturer: 'Benz',
  model: 'Mercedenz Benz',
  price: 40000,
  state: 'new',
  status: 'sold',
};

const ad4 = {
  id: 4,
  email: 'chris@gmail.com',
  createdOn: '01/01/2019',
  manufacturer: 'Range Rover',
  model: '2019 Range Rover',
  price: 40000,
  state: 'used',
  status: 'available',
};

ads.push(ad1, ad2, ad3, ad4);
export default ads;
