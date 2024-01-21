const { logTrace } = require("../log")
const { getCardPositionNamesForPlayers, cardIdToTokenBuilder } = require("../utils")

const generateInteractionScene = (gameState, scene_number) => {
  const playerTokenForDoppleganger = gameState.cards[cardIdToTokenBuilder(1)]
  const actualPlayerNumber = gameState.players[playerTokenForDoppleganger]?.player_number
  logTrace(`actualPlayerNumber: ${actualPlayerNumber} playerTokenForDoppleganger: ${playerTokenForDoppleganger}`)

  // doppleganger
  if (scene_number === 0 && playerTokenForDoppleganger) {

    logTrace(`actualPlayerNumber: ${actualPlayerNumber} playerTokenForDoppleganger: ${playerTokenForDoppleganger}`)
    return {
      type: 'CHOOSE_CARD',
      token: playerTokenForDoppleganger,
      scene: 'Choose another player\'s card, and let the shapeshifting happen',
      board: {
        cardPositions: getCardPositionNamesForPlayers(gameState, actualPlayerNumber)
      }
    }
  }
}

const interactionSceneBuilder = gameState => {
  const scene_number = gameState.scene_number
  logTrace(`interaction scene builder called scene_number: [${scene_number}]. gameState.interactionScenes[scene_number]: [${gameState.interactionScenes[scene_number]}]`)
  if (gameState.interactionScenes[scene_number]) return

  logTrace(`generate interaction scene for scene_number: [${scene_number}]`)

  gameState.interactionScenes[scene_number] = generateInteractionScene(gameState, scene_number)
  
  return gameState
}

module.exports = {
  interactionSceneBuilder
}