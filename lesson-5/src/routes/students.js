import express from 'express';

import {
  getStudentController,
  getStudentsController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getStudentsController)); // /api/students/

router.get('/:id', ctrlWrapper(getStudentController)); // /api/students/:id

export default router;
