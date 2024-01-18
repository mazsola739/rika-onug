const { toogleCard } = require('./card')
const { determineTotalPlayers } = require('./player')
const { randomPlayerName } = require('./name-generator')
const { sanitize, truncate } = require('./sanitizer')

module.exports = {
    toogleCard,
    determineTotalPlayers,
    randomPlayerName,
    sanitize,
    truncate,
}