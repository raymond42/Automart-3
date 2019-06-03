import express from 'express';
import ads from '../controllers/ads';
import auth from '../middleware/auth';
import signup from '../controllers/users';
import signin from '../controllers/signin';
import markCarSold from '../controllers/markCar';
import getCar from '../controllers/specific';
import deletePosted from '../controllers/delete';
import getUnsoldCarsWithinPriceRange from '../controllers/unsoldPriceRange';
import allposted from '../controllers/allPosted';
import getUsedUnsoldCars from '../controllers/viewUsedUnsold';
import order from '../controllers/order';
import getUnsoldCars from '../controllers/unsold';
import updatePriceOrder from '../controllers/updatePriceOrder';
import getNewUnsoldCars from '../controllers/viewNewunsold';
import updatePriceCar from '../controllers/updatePosted';

const router = express.Router();

// signup
router.post('/auth/signup', signup);

// signin
router.post('/auth/signin', signin);

// post a car sale Ad
router.post('/car', auth, ads);

// create a purchase order
router.post('/order', auth, order);

// update the price of purchase order
router.patch('/order/:id/price', auth, updatePriceOrder);

// mark car post as sold
router.patch('/car/:id/status', auth, markCarSold);

// update the price of a car post
router.patch('/car/:id/price', auth, updatePriceCar);

// get a specific car
router.get('/car/:id', auth, getCar);

// get all unsold cars
router.get('/car', auth, getUnsoldCars);

// get cars within price range
router.get('/cars', getUnsoldCarsWithinPriceRange);

// delete a car ad
router.delete('/car/:id', deletePosted);

// get all posted car ads
router.get('/cars/posted', auth, allposted);

// get all used unsold cars
router.get('/cars/used', auth, getUsedUnsoldCars);

// get all new unsold cars
router.get('/cars/new', auth, getNewUnsoldCars);

export default router;
