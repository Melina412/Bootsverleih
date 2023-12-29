import express from 'express';
import multer from 'multer';
import { addBoat, deleteBoat, getBoats } from './controller.js';
import { authenticate } from '../middleware/basicAuth.js';

export const router = new express.Router();
const upload = multer({ dest: './images' }); //! multer brauche ich für das verarbeiten der form data

router.post('/', upload.none(), authenticate, addBoat); //#hier wird die auth middleware ergänzt
router.get('/', getBoats);
router.delete('/', deleteBoat);
