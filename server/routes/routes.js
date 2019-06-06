import express from 'express';
import signup from '../controllers/users/signup';
import signin from '../controllers/users/signin';
import Ads from '../controllers/cars/ads';

const router = express.Router();

// signup
router.post('/auth/signup', signup);

// signin
router.post('/auth/signin', signin);

// post a car ad
router.post('/car', Ads);


export default router;
