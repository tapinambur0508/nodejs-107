import createHttpError from 'http-errors';

import { getStudent, getStudents } from '../services/students.js';

export async function getStudentsController(req, res) {
  const students = await getStudents();

  res.send({ status: 200, data: students });
}

export async function getStudentController(req, res) {
  const { id } = req.params;

  const student = await getStudent(id);

  if (student === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.send({ status: 200, data: student });
}
