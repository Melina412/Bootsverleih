import express from 'express';
import multer from 'multer';
import { addBoat, deleteBoat, getBoats } from './controller.js';

export const router = new express.Router();
const upload = multer({ dest: './images' });

router.post('/', upload.none(), addBoat);
router.get('/', getBoats);
router.delete('/', deleteBoat);
