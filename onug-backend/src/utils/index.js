const { selectCard, deselectCard } = require('./card')
const { determineTotalPlayers } = require('./player')
const { randomPlayerName } = require('./name-generator')
const { sanitize, truncate } = require('./sanitizer')

module.exports = {
    selectCard,
    deselectCard,
    determineTotalPlayers,
    randomPlayerName,
    sanitize,
    truncate,
}