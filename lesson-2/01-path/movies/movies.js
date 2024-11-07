import path from 'node:path';
import * as fs from 'node:fs/promises';

const FILE_PATH = path.resolve('movies', 'movies.txt');

export async function readMovies() {
  const data = await fs.readFile(FILE_PATH, { encoding: 'utf-8' });

  return data;
}
