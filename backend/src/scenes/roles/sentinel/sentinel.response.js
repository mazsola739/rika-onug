import { getPlayerTokensByPlayerNumber, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const sentinelResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
    return gamestate
  }

  const shieldedPlayerToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])

  if (shieldedPlayerToken) {
    gamestate.positions.shielded_cards.push(selected_card_positions[0])
    gamestate.players[shieldedPlayerToken[0]].shield = true
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_placed_shield', ...formatPlayerIdentifier([selected_card_positions[0]])],
    uniqueInformation: { new_shield_card: [selected_card_positions[0]] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
