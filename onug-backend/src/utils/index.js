const { toogleCard } = require('./card')
const { determineTotalPlayers, getPlayersReadyState } = require('./player')
const { randomPlayerName } = require('./name-generator')
const { sanitize, truncate } = require('./sanitizer')
const { isGameTableClosed } = require('./game-state')

module.exports = {
    toogleCard,
    determineTotalPlayers,
    randomPlayerName,
    sanitize,
    truncate,
    isGameTableClosed,
    getPlayersReadyState,
}