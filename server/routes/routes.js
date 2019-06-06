import express from 'express';
import signup from '../controllers/users';

const router = express.Router();

// signup
router.post('/auth/signup', signup);

export default router;
