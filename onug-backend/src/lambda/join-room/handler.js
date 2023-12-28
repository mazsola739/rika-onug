const {generateSuccessResponse, generateErrorResponse} = require("../../util/response-generator");
const validator = require("../common/validator");
const {randomPlayerName} = require("../common/name-generator");
const {validateRoom} = validator
const repositoryType = process.env.REPOSITORY_TYPE || 'local'
const repositoryPath = `../repository/${repositoryType}-repository`
console.log(`repositoryPath: ${repositoryPath}`)
const {upsertRoomState} = require(repositoryPath);


const joinRoomController = async (event) => {
    console.log(`Join-room endpoint triggered with event: ${JSON.stringify(event)}`)
    let {roomId, playerName} = event.body

    const [roomIdValid, gameState, errors] = await validateRoom(roomId)
    if (!roomIdValid) return generateErrorResponse(errors)


    const playerId = playerName || randomPlayerName(gameState.players)
    const newGameState = {...gameState}
    newGameState.players.push({
        name: playerId,
        admin: false
    })
    upsertRoomState(newGameState)

    return generateSuccessResponse({
        message: `successfully joined`,
        roomId,
        playerId
    })
}

module.exports = {
    joinRoomController
}