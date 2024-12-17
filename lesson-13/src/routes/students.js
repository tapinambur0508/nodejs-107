import express from 'express';

import {
  getStudentController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  replaceStudentController,
  updateStudentController,
} from '../controllers/students.js';

import { upload } from '../middlewares/upload.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { studentSchema, replaceStudentSchema } from '../validation/student.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getStudentsController)); // /api/students/

router.get('/:id', isValidId, ctrlWrapper(getStudentController)); // /api/students/:id

router.post(
  '/',
  upload.single('avatar'),
  jsonParser,
  validateBody(studentSchema),
  ctrlWrapper(createStudentController),
); // /api/students

router.delete('/:id', isValidId, ctrlWrapper(deleteStudentController)); // /api/students/:id

router.put(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(studentSchema),
  ctrlWrapper(replaceStudentController),
); // /api/students/:id

router.patch(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(replaceStudentSchema),
  ctrlWrapper(updateStudentController),
); // /api/students/:id

export default router;
