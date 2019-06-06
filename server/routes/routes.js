import express from 'express';
import signup from '../controllers/users/signup';
import signin from '../controllers/users/signin';

const router = express.Router();

// signup
router.post('/auth/signup', signup);

// signin
router.post('/auth/signin', signin);


export default router;
