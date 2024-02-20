import express from 'express';
const router = express.Router()

import { rooms } from './rooms';
import { pageNotFoundError, internalServerError } from './error';

router.get("/rooms", rooms)

export default {
  apiRouter: router,
  pageNotFoundError,
  internalServerError,
};
