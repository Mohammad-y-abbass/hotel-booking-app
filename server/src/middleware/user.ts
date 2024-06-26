import { check } from 'express-validator';

export const validateSignup = [
  check('firstName', 'First Name is required').isString(),
  check('lastName', 'Last Name is required').isString(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password with 6 or more characters required').isLength({
    min: 6,
  }),
];

export const validateSignin = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }),
];
