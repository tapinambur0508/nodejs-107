import cors from 'cors';
import express from 'express';

import { initDBConnection } from './db.js';
import { Student } from './models/student.js';

const app = express();

app.use(cors());

app.get('/students', async (req, res) => {
  const students = await Student.find();

  res.send({ status: 200, data: students });
});

app.get('/students/:id', async (req, res) => {
  const { id } = req.params;

  const student = await Student.findById(id);

  if (student === null) {
    return res.status(404).send({ status: 404, message: 'Student not found' });
  }

  res.send({ status: 200, data: student });
});

app.use((req, res, next) => {
  res.status(404).send({ status: 404, message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({ status: 500, message: 'Internal server error' });
});

async function bootstrap() {
  try {
    await initDBConnection();

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
