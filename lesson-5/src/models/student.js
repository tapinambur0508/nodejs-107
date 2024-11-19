import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    onDuty: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Student = mongoose.model('Student', studentSchema); // students
