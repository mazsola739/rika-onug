import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const seerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  let showCards = []

  const playerCards = selected_card_positions.some(pos => pos.includes('player'))
  const centerCards = selected_card_positions.some(pos => pos.includes('center'))
  const playerHistory = newGamestate.players[token].player_history[title].selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_card_positions[0])) {
    showCards = getCardIdsByPositions(newGamestate?.card_positions, [selected_card_positions[0]])
  } else if (centerCards && !playerCards && selected_card_positions.every(position => playerHistory.includes(position))) {
    showCards = getCardIdsByPositions(newGamestate?.card_positions, selected_card_positions.slice(0, 2))
  } else {
    return newGamestate
  }

  if (showCards.some(card => newGamestate.players[token].card.player_original_id === card.id)) {
    newGamestate.players[token].card.player_card_id = 87
  }

  newGamestate.players[token].card_or_mark_action = true

  /*TODO const viewedCards = showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0] */

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards,
    scene_end: true
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length > 1 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
