import { getPlayerNumbersByGivenConditions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const squireResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolf', gamestate.positions.shielded_cards)

  let action = {}

  if (selected_answer === 'yes') {
    const werewolvesWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolfWithoutShield', gamestate.positions.shielded_cards)
    const showCards = sawCards(gamestate, werewolvesWithoutShield, token)

    const messageIdentifiers = formatPlayerIdentifier(werewolvesWithoutShield)

    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_saw_card', ...messageIdentifiers, 'POINT'],
      showCards,
      uniqueInformation: { werewolves, answer: [selected_answer[0]] }
    })
  } else if (selected_answer === 'no') {
    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_nothing'],
      uniqueInformation: { werewolves, answer: [selected_answer[0]] }
    })
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
