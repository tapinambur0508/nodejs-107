import express from 'express';

import {
  getStudentController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  replaceStudentController,
  updateStudentController,
} from '../controllers/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getStudentsController)); // /api/students/

router.get('/:id', ctrlWrapper(getStudentController)); // /api/students/:id

router.post('/', jsonParser, ctrlWrapper(createStudentController)); // /api/students

router.delete('/:id', ctrlWrapper(deleteStudentController)); // /api/students/:id

router.put('/:id', jsonParser, ctrlWrapper(replaceStudentController)); // /api/students/:id

router.patch('/:id', jsonParser, ctrlWrapper(updateStudentController)); // /api/students/:id

export default router;
