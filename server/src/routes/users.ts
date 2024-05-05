import { Router } from 'express';
import { signup } from '../controllers/users';

const router = Router();

router.post('/signup', signup);
