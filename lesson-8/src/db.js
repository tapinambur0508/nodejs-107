import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;

export async function initDBConnection() {
  await mongoose.connect(DB_URI);
}
