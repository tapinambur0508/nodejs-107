import express from 'express';

import authRoutes from './auth.js';
import studentRoutes from './students.js';

import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', auth, studentRoutes);

export default router;
