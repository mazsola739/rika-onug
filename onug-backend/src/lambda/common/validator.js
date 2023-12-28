const {validate} = require("uuid");
const repositoryType = process.env.REPOSITORY_TYPE || 'local'
const repositoryPath = `../repository/${repositoryType}-repository`
console.log(`repositoryPath: ${repositoryPath}`)
const {readGameState} = require(repositoryPath);


const validCardIds = [1, 86]

const CARDS_ARE_NOT_AN_ARRAY = 'cards were not provided as an array'
const CARD_IDS_NOT_IN_VALID_RANGE = 'card ids were notin the right id range'
const DUPLICATED_CARD_IDS = 'card ids were duplicated.'

const validateCards = cards => {
    const errors = []

    const cardsStructIsArray = Array.isArray(cards)
    if (!cardsStructIsArray) {
        errors.push(CARDS_ARE_NOT_AN_ARRAY)
        return [false, errors]
    }

    const cardsAreInTheRightIdRange = cards.every(card => card >= validCardIds[0] && card <= validCardIds[1])
    if (!cardsAreInTheRightIdRange) errors.push(CARD_IDS_NOT_IN_VALID_RANGE)

    const duplicates = new Set(cards).size !== cards.length
    if (duplicates) errors.push(`${DUPLICATED_CARD_IDS} Ids: ${cards}`)

    const validity = errors.length === 0
    if (!validity) console.log(`validation errors: ${errors}`)

    return [validity, errors]
}

const validateRoom = async (roomId) => {
    const errors = []

    const roomIdExists = !!roomId
    if (!roomIdExists) {
        errors.push("room id does not exist")
        return [false, {}, errors]
    }

    const roomIdValidUUID = validate(roomId)
    if (!roomIdValidUUID) {
        errors.push("room id is not a valid uuid")
    }

    const gameState = await readGameState(roomId)
    if (!gameState) {
        errors.push("Room does not exists")
    }

    const closed = gameState?.closed
    if (closed) {
        errors.push("Gamestate is already closed for that room id")
    }

    const playersFull = gameState?.players?.length === 12
    if (playersFull) {
        errors.push("Room is already full")
    }

    const validity = errors.length === 0
    if (!validity) console.log(`validation errors: ${errors}`)

    return [validity, gameState, errors]
}

module.exports = {
    validateCards,
    validateRoom,
}