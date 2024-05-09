import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import hotelsRouter from './routes/hotels';
import cookieParser from 'cookie-parser';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase.config';

const connect_to_db = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
connect_to_db();

const firebaseApp = initializeApp(firebaseConfig);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
