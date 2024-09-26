import express from 'express'
const router = express.Router()
import { populateDeal } from './populate-deal'

// populator
router.post('/populate/deal', populateDeal)

export const stubRouter = router