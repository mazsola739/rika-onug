import { getPlayerNumbersByGivenConditions, getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const squireResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolf', gamestate.positions.shielded_cards)

  let action = {}

  if (selected_answer === 'yes') {
    const werewolvesWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolfWithoutShield', gamestate.positions.shielded_cards)
    const viewCards = getCardIdsByPositions(gamestate.positions.card_positions, werewolves)

    if (werewolvesWithoutShield.some(wolf => gamestate.positions.card_positions[wolf].card.id === gamestate.players[token]?.card?.player_original_id)) {
      gamestate.players[token].card.player_card_id = 87
    }

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      answer: [selected_answer[0]],
      viewed_cards: viewCards,
      werewolves
    }

    const messageIdentifiers = formatPlayerIdentifier(werewolvesWithoutShield)

    action = generateRoleAction(gamestate, token, {
      private_message: ['action_saw_card', ...messageIdentifiers, 'POINT'],
      showCards: viewCards,
      uniqueInformation: { werewolves }
    })
  } else if (selected_answer === 'no') {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      werewolves,
      answer: [selected_answer[0]]
    }

    action = generateRoleAction(gamestate, token, {
      private_message: ['action_nothing'],
      uniqueInformation: { werewolves }
    })
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
