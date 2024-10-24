import { SCENE } from '../../../constants'
import { getPlayerTokensByPlayerNumber, generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const sentinelResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const shieldedPlayerToken = getPlayerTokensByPlayerNumber(newGamestate.players, selected_card_positions[0])

  if (shieldedPlayerToken) {
    newGamestate.shield.push(selected_card_positions[0])
    newGamestate.players[shieldedPlayerToken[0]].shield = true
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    new_shield_card: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_placed_shield', formatPlayerIdentifier(selected_card_positions)[0]],
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
