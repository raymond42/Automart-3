import moment from 'moment';
import ads from '../models/ads';
import users from '../models/users';
import validateAd from '../helpers/ads';

const Ads = (req, res) => {
  const { error } = validateAd.validation(req.body);
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }

  const id = parseInt(ads.length + 1, 10);
  const newAd = {
    id,
    createdOn: moment().format('LL'),
    owner: req.body.owner,
    email: req.body.email,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    price: req.body.price,
    state: req.body.state,
    status: req.body.status,
  };
  const userId = users.find(o => o.id === parseInt(newAd.owner, 10));
  if (!userId) {
    return res.status(404).json({
      status: 404,
      error: 'owner not found',
    });
  }
  const user = users.find(e => e.email === newAd.email);
  if (!user) {
    return res.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }

  ads.push(newAd);
  return res.status(201).json({
    status: 201,
    data: {
      id,
      createdOn: moment().format('LL'),
      email: req.body.email,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      price: req.body.price,
      state: req.body.state,
      status: req.body.status,
    },
  });
};

export default Ads;
