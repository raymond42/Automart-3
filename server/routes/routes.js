import express from 'express';
import signup from '../controllers/users/signup';
import signin from '../controllers/users/signin';
import Ads from '../controllers/cars/ads';
import auth from '../middleware/auth';
import Order from '../controllers/orders/order';
import updatePriceOrder from '../controllers/orders/updatePriceOrder';
import markadsold from '../controllers/cars/markCar';
import updatePriceCar from '../controllers/cars/updatePriceCar';
import getCar from '../controllers/cars/specific';
import getUnsoldCars from '../controllers/cars/unsold';
import getUnsoldCarsWithinPriceRange from '../controllers/cars/unsoldPriceRange';
import deletePosted from '../controllers/cars/delete';
import allposted from '../controllers/cars/allPosted';
import getUsedUnsoldCars from '../controllers/cars/viewUsedUnsold';

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

// mark a posted car ad as sold
router.patch('/car/:id/status', auth, markadsold);

// update the price of a posted car ad
router.patch('/car/:id/price', auth, updatePriceCar);

// get a specific car
router.get('/car/:id', auth, getCar);

// get available cars
router.get('/car', auth, getUnsoldCars);

// get available cars within a price range
router.get('/cars', auth, getUnsoldCarsWithinPriceRange);

// delete a car post
router.delete('/car/:id', auth, deletePosted);

// get all cars
router.get('/cars/all', auth, allposted);

// get all used or new unsold cars
router.get('/all', auth, getUsedUnsoldCars);

export default router;
