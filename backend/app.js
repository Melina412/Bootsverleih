import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import 'dotenv/config';
import morgan from 'morgan';

import { router as boatRouter } from './boats/router.js';
import { router as resRouter } from './reservations/router.js';
import { router as userRouter } from './user/router.js';

await mongoose.connect(process.env.MONGODB);

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use('images', express.static('./images')); // wenn ich bild hochladen will
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/boats', boatRouter);
app.use('/api/reservations', resRouter);
app.use('/api/login', userRouter);

app.listen(process.env.PORT, () =>
  console.log('express läuft auf port:', process.env.PORT)
);
