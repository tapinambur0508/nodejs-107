import createHttpError from 'http-errors';

import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await User.findById(session.userId);

  if (user === null) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = { id: user._id, name: user.name };

  next();
}
