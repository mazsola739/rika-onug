import { getPlayerNumbersByGivenConditions, getCardIdsByPositions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from "../../sceneUtils"
import { validateAnswerSelection } from "../../validators"

export const squireResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  let action = {}

  if (selected_answer === 'yes') {
    const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolfWithoutShield', gamestate.shielded_cards)
    const viewCards = getCardIdsByPositions(gamestate.card_positions, werewolves)

    if (werewolves.some(wolf => gamestate.card_positions[wolf].card.id === gamestate.players[token]?.card?.original_id)) {
      gamestate.players[token].card.player_card_id = 87
    }

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      answer: [selected_answer[0]],
      viewed_cards: werewolves
    }

    const messageIdentifiers = formatPlayerIdentifier(werewolves)

    action = generateRoleAction(gamestate, token, {
      private_message: ['action_saw_card', ...messageIdentifiers],
      showCards: viewCards,
      uniqueInformation: { werewolves }
    })
  } else if (selected_answer === 'no') {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      answer: [selected_answer[0]]
    }

    action = generateRoleAction(gamestate, token, {
      private_message: ['action_nothing']
    })
  }

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
