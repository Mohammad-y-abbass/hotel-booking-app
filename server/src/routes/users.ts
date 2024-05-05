import { Router } from 'express';
import { signup } from '../controllers/users';
import { validateSignup } from '../middleware/user';

const router = Router();

router.post('/signup', validateSignup, signup);

export default router;
