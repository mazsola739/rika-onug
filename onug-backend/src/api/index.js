import express from 'express'
const router = express.Router()

import { rooms } from './rooms'
export { internalServerError, pageNotFoundError } from './error'

router.get('/rooms', rooms)

export const apiRouter = router