import { SCENE } from '../../../constants'
import { getCardIdsByPositions, generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const seerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
 
  const newGamestate = { ...gamestate }
  const scene = []

  let showCards = []

  const playerCards = selected_card_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_card_positions.some((pos) => pos.includes('center'))
  const playerHistory = newGamestate.players[token].player_history[title].selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_card_positions[0])) {
    showCards = getCardIdsByPositions(newGamestate?.card_positions, [selected_card_positions[0]])
  } else if (centerCards && !playerCards && selected_card_positions.every((position) => playerHistory.includes(position))) {
    showCards = getCardIdsByPositions(newGamestate?.card_positions, selected_card_positions.slice(0, 2))
  } else {
    return newGamestate
  }

  if (showCards.some((card) => newGamestate.players[token].card.player_original_id === card.id)) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  const viewedCards = showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0]

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards,
    uniqueInformations: { seer: title === 'SEER' ? viewedCards : [], detector: title === 'DETECTOR' ? viewedCards : []},
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
