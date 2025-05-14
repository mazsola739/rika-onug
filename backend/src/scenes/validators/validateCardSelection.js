import { logTrace } from '../../log'

export const validateCardSelection = async (gamestate, token, selected_card_positions, title) => {
  logTrace(`validateCardSelection called when actual scene is: ${title}`)

  const player_history = gamestate.players[token].player_history[title]

  if (selected_card_positions.length === 0 || !selected_card_positions.every(position => player_history.selectable_cards.includes(position))) {
    return false
  }

  const hasPlayerPositions = selected_card_positions.some(position => position.startsWith('player_'))
  const hasCenterPositions = selected_card_positions.some(position => position.startsWith('center_'))

  if ((hasPlayerPositions && hasCenterPositions) || selected_card_positions.length !== player_history.selectable_card_limit[hasPlayerPositions ? 'player' : 'center']) {
    return false
  }

  gamestate.players[token].player_history[title].selected_card_positions = selected_card_positions

  logTrace(`validateCardSelection finished successfully for scene: ${title}`)
  return true
}
