import express from 'express';
import Users from '../controllers/users/users';
import Cars from '../controllers/cars/cars';
import auth from '../middleware/auth';
import Order from '../controllers/orders/order';
import updatePriceOrder from '../controllers/orders/updatePriceOrder';

const router = express.Router();

// signup
router.post('/auth/signup', Users.signup);

// signin
router.post('/auth/signin', Users.signin);

// post a car ad
router.post('/car', auth, Cars.ads);

// purchasing order
router.post('/order', auth, Order);

// updating the price of purchasing order
router.patch('/order/:id/price', auth, updatePriceOrder);

// mark a posted car ad as sold
router.patch('/car/:id/status', auth, Cars.markCar);

// update the price of a posted car ad
router.patch('/car/:id/price', auth, Cars.updatePriceCar);

// get a specific car
router.get('/car/:id', auth, Cars.getSpecificCar);

// get available cars
router.get('/car', auth, Cars.getUnsoldCars);

// get available cars within a price range
router.get('/cars', auth, Cars.unsoldCarsWithinRange);

// delete a car post
router.delete('/car/:id', auth, Cars.deleteCar);

// get all cars
router.get('/cars/getAll', auth, Cars.getAllCars);

// get all used or new unsold cars
router.get('/all', auth, Cars.getUnsoldState);

// flag a car
router.post('/flag', auth, Cars.flagCar);

export default router;
