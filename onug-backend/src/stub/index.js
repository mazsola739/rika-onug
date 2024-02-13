const express = require('express')
const router = express.Router()

const { populateDeal } = require('./populate-deal')

// populator
router.post('/populate/deal', populateDeal)

module.exports = {
    stubRouter: router,
}