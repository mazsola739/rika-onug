import express from 'express'
const router = express.Router()

import { lobby } from './lobby'
export { internalServerError, pageNotFoundError } from './error'

router.get('/lobby', lobby)

export const apiRouter = router
