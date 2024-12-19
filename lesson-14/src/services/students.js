import { Student } from '../models/student.js';

export async function getStudents({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  ownerId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const studentQuery = Student.find({ ownerId });

  if (typeof filter.minYear !== 'undefined') {
    studentQuery.where('year').gte(filter.minYear);
  }

  if (typeof filter.maxYear !== 'undefined') {
    studentQuery.where('year').lte(filter.maxYear);
  }

  const [total, students] = await Promise.all([
    Student.countDocuments(studentQuery),
    studentQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    students,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
}

export function getStudent(studentId, ownerId) {
  return Student.findById(studentId); // findOne({ _id: studentId })
}

export function createStudent(student) {
  return Student.create(student);
}

export function deleteStudent(studentId) {
  return Student.findByIdAndDelete(studentId); // findOneAndDelete({ _id: studentId })
}

export async function replaceStudent(studentId, student) {
  const rawResult = await Student.findByIdAndUpdate(studentId, student, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
}

export function updateStudent(studentId, student) {
  return Student.findByIdAndUpdate(studentId, student, { new: true });
}
