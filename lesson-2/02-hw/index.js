import path from 'node:path';
import * as fs from 'node:fs/promises';

const FILE_PATH = path.resolve('db.json');

/**
 * @returns {Promise<Array<{ id: string, name: string, email: string, phone: string, job: string}>>}
 */
async function readTodos() {
  const data = await fs.readFile(FILE_PATH, { encoding: 'utf-8' });
  const todos = JSON.parse(data);

  return todos; // .length, .push
}

/**
 * @param {Array<{ id: string, name: string, email: string, phone: string, job: string}>} todos
 */
async function writeTodos(todos) {
  await fs.writeFile(FILE_PATH, JSON.stringify(todos, undefined, 2));
}

// readTodos().catch(error => console.error(error));

writeTodos([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@mail.com',
    phone: '+380660001122',
    job: 'CEO',
  },
]).catch((error) => console.error(error));
