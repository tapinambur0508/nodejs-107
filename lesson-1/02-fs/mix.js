const fs = require('node:fs/promises');

const FILE_PATH = 'mix.txt';

// fs.readFile(FILE_PATH, {encoding: "utf-8"})
//   .then(data => data.toUpperCase())
//   .then(data => fs.writeFile(FILE_PATH, data))
//   .then(() => console.log("Done"))
//   .catch(error => console.error(error));

async function mix() {
  const data = await fs.readFile(FILE_PATH, { encoding: 'utf-8' });

  const transformedData = data.toUpperCase();

  await fs.writeFile(FILE_PATH, transformedData);
}

mix()
  .then(() => console.log('Done'))
  .catch((error) => console.error(error));
