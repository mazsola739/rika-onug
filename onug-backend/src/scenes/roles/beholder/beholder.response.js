import { formatPlayerIdentifier, generateRoleInteraction, getAnySeerPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateAnswerSelection } from '../../validators'

export const beholderResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  let interaction = {}

  if (selected_answer === 'yes') {
    const seers = getAnySeerPlayerNumbersByRoleIdsWithNoShield(gamestate.players)
    const viewCards = getCardIdsByPositions(gamestate.card_positions, seers)

    if (seers.some(seer => gamestate.card_positions[seer].card.id === gamestate.players[token]?.card?.original_id)) {
      gamestate.players[token].card.player_card_id = 87
    }

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_cards: seers
    }

    const messageIdentifiers = formatPlayerIdentifier(seers)

    interaction = generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_saw_card', ...messageIdentifiers],
      showCards: viewCards,
      uniqueInformations: { seers },
      scene_end: true
    })
  } else if (selected_answer === 'no') {
    interaction = generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_nothing'],
      scene_end: true
    })
  }

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
