import express from 'express'
import { populateDeal } from './populateDeal'
const router = express.Router()

// populator
router.post('/populate/deal', populateDeal)

export const stubRouter = router
