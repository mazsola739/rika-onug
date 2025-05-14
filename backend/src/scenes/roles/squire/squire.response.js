import { getPlayerNumbersByGivenConditions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const squireResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(gamestate, token, selected_answer, title)) {
    return gamestate
  }

  const werewolves = getPlayerNumbersByGivenConditions(gamestate, 'werewolfAndDreamwolf')

  let action = {}

  if (selected_answer === 'yes') {
    const werewolvesWithoutShield = getPlayerNumbersByGivenConditions(gamestate, 'werewolfAndDreamwolfWithoutShield')
    const showCards = sawCards(gamestate, werewolvesWithoutShield, token)

    const messageIdentifiers = formatPlayerIdentifier(werewolvesWithoutShield)

    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_saw_card', ...messageIdentifiers, 'POINT'],
      showCards,
      uniqueInformation: { werewolves }
    })
  } else if (selected_answer === 'no') {
    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_nothing'],
      uniqueInformation: { werewolves }
    })
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
