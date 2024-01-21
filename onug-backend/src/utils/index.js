const { toogleCard } = require('./card')
const { determineTotalPlayers, getBoard } = require('./player')
const { randomPlayerName } = require('./name-generator')
const { sanitize, truncate } = require('./sanitizer')
const { isGameTableClosed, isGamePlayStopped } = require('./game-state')

module.exports = {
    toogleCard,
    determineTotalPlayers,
    randomPlayerName,
    sanitize,
    truncate,
    isGameTableClosed,
    isGamePlayStopped,
    getBoard,
}