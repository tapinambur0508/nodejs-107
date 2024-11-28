import express from 'express';

import studentRoutes from './students.js';

const router = express.Router();

router.use('/students', studentRoutes);

export default router;
