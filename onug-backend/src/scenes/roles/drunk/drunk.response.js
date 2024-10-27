import { SCENE } from '../../../constants'
import { getPlayerNumberWithMatchingToken, formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const drunkResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
  const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
  newGamestate.card_positions[currentPlayerNumber].card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard

  newGamestate.players[token].card.player_card_id = 0
  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
