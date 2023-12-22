import express from 'express';
import multer from 'multer';
import {
  addReservation,
  findBoatsWithoutReservations,
  populateReservation,
  getReservations,
  populateAllReservations,
} from './controller.js';

export const router = new express.Router();
const upload = multer({ dest: './images' });

router.post('/', upload.none(), addReservation);
router.get('/', getReservations);
router.post('/details', populateReservation);
router.post('/unreserved', findBoatsWithoutReservations);
router.post('/allpopulated', populateAllReservations);
