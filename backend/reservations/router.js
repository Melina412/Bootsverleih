import express from 'express';
import multer from 'multer';
import {
  addReservation,
  findReservation,
  getReservations,
} from './controller.js';

export const router = new express.Router();
const upload = multer({ dest: './images' });

router.post('/', upload.none(), addReservation);
router.get('/', getReservations);
router.post('/populated', findReservation);
