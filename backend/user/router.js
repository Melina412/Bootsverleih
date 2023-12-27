import express from 'express';
import { authenticate } from '../middleware/basicAuth.js';
import { userLogin } from './controller.js';

export const router = new express.Router();

router.post('/', authenticate, userLogin);
