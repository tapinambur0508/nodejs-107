import createHttpError from 'http-errors';

import {
  getStudent,
  getStudents,
  createStudent,
  deleteStudent,
  replaceStudent,
  updateStudent,
} from '../services/students.js';

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

export async function createStudentController(req, res) {
  const student = {
    name: req.body.name,
    gender: req.body.gender,
    year: req.body.year,
    onDuty: req.body.onDuty,
  };

  const result = await createStudent(student);

  res.status(201).send({
    status: 201,
    message: 'Student created successfully',
    data: result,
  });
}

export async function deleteStudentController(req, res) {
  const { id } = req.params;

  const result = await deleteStudent(id);

  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.send({
    status: 200,
    message: 'Student deleted successfully',
    data: result,
  });
}

export async function replaceStudentController(req, res) {
  const { id } = req.params;

  const student = {
    name: req.body.name,
    gender: req.body.gender,
    year: req.body.year,
    onDuty: req.body.onDuty,
  };

  const result = await replaceStudent(id, student);

  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  if (result.isNew === true) {
    return res.status(201).send({
      status: 201,
      message: 'Student created successfully',
      data: result.student,
    });
  }

  res.send({
    status: 200,
    message: 'Student updated successfully',
    data: result.student,
  });
}

export async function updateStudentController(req, res) {
  const { id } = req.params;

  const student = {
    name: req.body.name,
    gender: req.body.gender,
    year: req.body.year,
    onDuty: req.body.onDuty,
  };

  const result = await updateStudent(id, student);

  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.send({
    status: 200,
    message: 'Student updated successfully',
    data: result,
  });
}
