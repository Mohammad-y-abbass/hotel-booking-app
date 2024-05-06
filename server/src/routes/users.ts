import { Router } from 'express';
import { signup, signin, validateToken, signout } from '../controllers/users';
import { validateSignup, validateSignin } from '../middleware/user';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);
router.get('/validate-token', verifyToken, validateToken);
router.post('/signout', signout);

export default router;
