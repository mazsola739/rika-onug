//@ts-check
import express from 'express';
const router = express.Router()

import { rooms } from './rooms';
export { pageNotFoundError, internalServerError } from './error';

router.get("/rooms", rooms)

export const apiRouter = router