import { getPlayerTokensByPlayerNumber, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const sentinelResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const shieldedPlayerToken = getPlayerTokensByPlayerNumber(gamestate.players, [selected_card_positions[0]])

  if (shieldedPlayerToken) {
    gamestate.positions.shielded_cards.push(selected_card_positions[0])
    gamestate.players[shieldedPlayerToken[0]].shield = true
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    new_shield_card: [selected_card_positions[0]],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_placed_shield', formatPlayerIdentifier(selected_card_positions)[0]],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
