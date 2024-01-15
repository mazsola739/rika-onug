const { validateCards } = require('./card-validator')
const { validatePlayer } = require('./player-validator')
const { validateRoom } = require('./room-validator')

module.exports = {
    validateCards,
    validateRoom,
    validatePlayer,
}