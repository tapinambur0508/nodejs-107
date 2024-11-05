// const fs = require('node:fs');

// console.log('Before');

// // fs.readFile('read.txt', { encoding: 'utf-8' }, (err, data) => {
// //   if (err) {
// //     throw err;
// //   }

// //   console.log(data);
// // });

// fs.promises
//   .readFile('read.txt', { encoding: 'utf-8' })
//   .then((data) => console.log(data))
//   .catch((error) => {
//     throw error;
//   });

// console.log('After');

// const fs = require('node:fs').promises;
const fs = require('node:fs/promises');

fs.readFile('unknown.txt', { encoding: 'utf-8' })
  .then((data) => console.log(data))
  .catch((error) => {
    throw error;
  });
