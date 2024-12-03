import express from 'express';

import { registerController, loginController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { registerSchema, loginSchema } from '../validation/auth.js';

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

export default router;
