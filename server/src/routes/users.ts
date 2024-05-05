import { Router } from 'express';
import { signup, signup } from '../controllers/users';

const router = Router();

router.post('/signup', signup);
