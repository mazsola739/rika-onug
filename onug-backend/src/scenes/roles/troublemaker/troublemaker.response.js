import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const troublemakerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const [position1, position2] = selected_card_positions.slice(0, 2)
  const playerOneCard = { ...newGamestate.card_positions[position1].card }
  const playerTwoCard = { ...newGamestate.card_positions[position2].card }

  newGamestate.card_positions[position1].card = playerTwoCard
  newGamestate.card_positions[position2].card = playerOneCard

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [position1, position2],
  }

  const messageIdentifiers = formatPlayerIdentifier([position1, position2])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
  })

  scene.push({ [token]: { interaction } })
  newGamestate.scene[title] = scene

  return newGamestate
}
