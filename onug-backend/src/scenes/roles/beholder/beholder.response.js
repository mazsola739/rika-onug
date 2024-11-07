import { formatPlayerIdentifier, generateRoleInteraction, getAnySeerPlayerNumbersByRoleIdsWithNoShield, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateAnswerSelection } from '../../validators'

export const beholderResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  let interaction = {}

  if (selected_answer === 'yes') {
    const seers = getAnySeerPlayerNumbersByRoleIdsWithNoShield(newGamestate.players)
    const viewCards = getCardIdsByPositions(newGamestate.card_positions, seers)

    if (seers.some(seer => newGamestate.card_positions[seer].card.id === newGamestate.players[token]?.card?.original_id)) {
      newGamestate.players[token].card.player_card_id = 87
    }

    newGamestate.players[token].card_or_mark_action = true

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: seers
    }

    const messageIdentifiers = formatPlayerIdentifier(seers)

    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', ...messageIdentifiers],
      showCards: viewCards,
      uniqueInformations: { seers },
      scene_end: true
    })
  } else if (selected_answer === 'no') {
    interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_nothing'],
      scene_end: true
    })
  }

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
