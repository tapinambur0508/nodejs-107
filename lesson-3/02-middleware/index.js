import express from 'express';

const app = express();

function middleware1(req, res, next) {
  console.log('Middleware 1');
  next();
}

function middleware2(req, res, next) {
  console.log('Middleware 2');
  next();
}

function middleware3(req, res, next) {
  console.log('Middleware 3');

  if (req.method === 'GET' && req.path === '/') {
    return res.status(400).send('Bad request');
  }

  next();
}

// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
// app.use(middleware1);
app.use(middleware2);

app.get(
  '/',
  middleware1,
  middleware1,
  middleware1,
  middleware1,
  (req, res, next) => {
    next(new Error('Pamilka'));
    res.send('Hello Express');
  },
);

// Handle 404 Error
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Handle Server Error
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).send('Internal Server Error');
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
