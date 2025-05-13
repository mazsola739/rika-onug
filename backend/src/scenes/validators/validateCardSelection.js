import { logTrace } from '../../log'

export const validateCardSelection = (selected_card_positions, gamestate, token, title) => {
  logTrace(`validateCardSelection called when actual scene is: ${title}`)

  const player_history = gamestate.players[token]?.player_history[title]
  const playerHistorySelectableCards = player_history.selectable_cards || []
  const selectableCardLimit = player_history.selectable_card_limit || {}

  if (selected_card_positions.length === 0 || !selected_card_positions.every(position => playerHistorySelectableCards.includes(position))) {
    logTrace(`Invalid selected positions: ${selected_card_positions}`)
    return false
  }

  const hasPlayerPositions = selected_card_positions.some(position => position.startsWith('player_'))
  const hasCenterPositions = selected_card_positions.some(position => position.startsWith('center_'))

  if ((hasPlayerPositions && hasCenterPositions) || selected_card_positions.length !== selectableCardLimit[hasPlayerPositions ? 'player' : 'center']) {
    logTrace(`Invalid selection mix or limit exceeded: ${selected_card_positions}`)
    return false
  }

  gamestate.players[token].player_history[title].selected_card_positions = selected_card_positions

  logTrace(`validateCardSelection finished successfully for scene: ${title}`)
  return true
}
