import { Router } from 'express';
import { signup, signin } from '../controllers/users';
import { validateSignup, validateSignin } from '../middleware/user';

const router = Router();

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);

export default router;
