const validator = require('../common/validator')
const {v4: uuidv4} = require("uuid")
const {generateErrorResponse, generateSuccessResponse} = require("../../util/response-generator");

const {validateCards} = validator

const createRoomController = (event) => {
    console.log(`Create-room endpoint triggered with event: ${JSON.stringify(event)}`)

    // extract settings, validate
    let {cards} = event.body
    const [cardIdsAreValid, errors] = validateCards(cards)
    if (!cardIdsAreValid) return generateErrorResponse(errors)

    // create new room
    const roomId = uuidv4()
    console.log(`room id: ${roomId}`)

    // TODO: save game setup to json in the filesystem
    // selected cards, player to card binding, etc.. will be handled here
    //const selectedCards = cards.filter((card) => selectedCardIds.includes(card.id))

    return generateSuccessResponse({
        message: `room ${roomId} successfully created`,
        roomId,
    })
}

module.exports = {
    createRoomController
}