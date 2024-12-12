import express from 'express';

import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestResetPasswordController,
  resetPasswordController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  registerSchema,
  loginSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post(
  '/request-reset-password',
  jsonParser,
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetPasswordController),
);

router.post(
  '/reset-password',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
