import { Student } from '../models/student.js';

export function getStudents() {
  return Student.find();
}

export function getStudent(studentId) {
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
