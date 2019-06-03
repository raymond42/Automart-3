import bcrypt from 'bcrypt';

const users = [];

const password = bcrypt.hashSync('Asdfg1', 10);
const user1 = {
  id: 1,
  email: 'admin@gmail.com',
  firstName: 'Raymond',
  lastName: 'Gakwaya',
  password,
  address: 'Rwanda',
  isAdmin: 'true',
};

users.push(user1);
const user2 = {
  id: 2,
  email: 'chris@gmail.com',
  firstName: 'Christian',
  lastName: 'Habineza',
  password,
  address: 'Rwanda',
  isAdmin: 'false',
};
users.push(user2);
export default users;
