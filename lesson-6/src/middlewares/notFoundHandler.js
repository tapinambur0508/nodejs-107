export function notFoundHandler(req, res, next) {
  res.status(404).send({ status: 404, message: 'Route not found' });
}
