import * as fs from 'node:fs/promises';
import path from 'node:path';

import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

import {
  getStudent,
  getStudents,
  createStudent,
  deleteStudent,
  replaceStudent,
  updateStudent,
} from '../services/students.js';

export async function getStudentsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const students = await getStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    ownerId: req.user.id,
  });

  res.send({ status: 200, data: students });
}

export async function getStudentController(req, res) {
  const { id } = req.params;

  const student = await getStudent(id);

  if (student === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  if (student.ownerId.toString() !== req.user.id.toString()) {
    // throw new createHttpError.Forbidden('Student forbidden');
    throw new createHttpError.NotFound('Student not found');
  }

  res.send({ status: 200, data: student });
}

export async function createStudentController(req, res) {
  let avatar = null;

  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);

      avatar = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'avatars', req.file.filename),
      );

      avatar = `http://localhost:9090/avatars/${req.file.filename}`;
    }
  }

  const student = {
    name: req.body.name,
    gender: req.body.gender,
    year: req.body.year,
    onDuty: req.body.onDuty,
    ownerId: req.user.id,
    avatar,
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
