import express from 'express'
const router = express.Router()
import { populateDeal } from './populateDeal'

// populator
router.post('/populate/deal', populateDeal)

export const stubRouter = router