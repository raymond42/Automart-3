import express from 'express';
import signup from '../controllers/users/signup';
import signin from '../controllers/users/signin';
import Ads from '../controllers/cars/ads';
import auth from '../middleware/auth';
import Order from '../controllers/orders/order';
import updatePriceOrder from '../controllers/orders/updatePriceOrder';

const router = express.Router();

// signup
router.post('/auth/signup', signup);

// signin
router.post('/auth/signin', signin);

// post a car ad
router.post('/car', auth, Ads);

// purchasing order
router.post('/order', auth, Order);

// updating the price of purchasing order
router.patch('/order/:id/price', auth, updatePriceOrder);


export default router;
