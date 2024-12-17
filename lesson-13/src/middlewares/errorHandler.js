import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  if (isHttpError(error) === true) {
    return res
      .status(error.statusCode)
      .send({ status: error.statusCode, message: error.message });
  }

  console.error(error);

  res.status(500).send({ status: 500, message: 'Internal server error' });
}
