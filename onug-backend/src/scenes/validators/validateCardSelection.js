import { logTrace } from '../../log'

export const validateCardSelection = (selected_card_positions, player_history, title) => {
  logTrace(`validateCardSelection called when actual scene is: ${title}`)

  if (selected_card_positions.length === 0 || !selected_card_positions.every(position => player_history[title]?.selectable_cards.includes(position))) {
    return false
  }

  const hasPlayerPositions = selected_card_positions.some(position => position.startsWith('player_'))
  const hasCenterPositions = selected_card_positions.some(position => position.startsWith('center_'))

  if ((hasPlayerPositions && hasCenterPositions) || selected_card_positions.length !== player_history[title]?.selectable_card_limit[hasPlayerPositions ? 'player' : 'center']) {
    return false
  }
  logTrace(`validateCardSelection finished and everything all right: ${title}`)
  return true
}
