const express = require('express')
const router = express.Router()

const { action } = require('./action')
const { hydrate } = require('./hydrate')
const { ready } = require('./ready')
const { rooms } = require('./rooms')
const { cards } = require('./cards')
const { artifacts } = require('./artifacts')
const { marks } = require('./marks')
const { pageNotFoundError, internalServerError } = require('./error')


router.get('/rooms', rooms)
router.get('/cards', cards)
router.get('/artifacts', artifacts)
router.get('/marks', marks)
router.post('/hydrate', hydrate)
router.post('/action', action)
router.post('/ready', ready)

module.exports = {
    apiRouter: router,
    pageNotFoundError,
    internalServerError
}