import { getPlayerNumbersByGivenConditions, getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateAnswerSelection } from '../../../validators'

export const beholderResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  let action = {}

  if (selected_answer === 'yes') {
    const seers = getPlayerNumbersByGivenConditions(gamestate.players, 'anySeerWithoutShield', gamestate.shielded_cards)
    const viewCards = getCardIdsByPositions(gamestate.card_positions, seers)

    if (seers.some(seer => gamestate.card_positions[seer].card.id === gamestate.players[token]?.card?.player_original_id)) {
      gamestate.players[token].card.player_card_id = 87
    }

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_cards: seers
    }

    const messageIdentifiers = formatPlayerIdentifier(seers)

    action = generateRoleAction(gamestate, token, {
      private_message: ['action_saw_card', ...messageIdentifiers],
      showCards: viewCards,
      uniqueInformation: { seers },
      scene_end: true
    })
  } else if (selected_answer === 'no') {
    action = generateRoleAction(gamestate, token, {
      private_message: ['action_nothing'],
      scene_end: true
    })
  }

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
