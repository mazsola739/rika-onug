import { getPlayerNumbersByGivenConditions, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, sawCards } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const beholderResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate, token, title)) {
    return gamestate
  }

  let action = {}

  if (selected_answer === 'yes') {
    const seers = getPlayerNumbersByGivenConditions(gamestate, 'anySeerWithoutShield')
    const showCards = sawCards(gamestate, seers, token)

    const messageIdentifiers = formatPlayerIdentifier(seers)

    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_saw_card', ...messageIdentifiers],
      showCards,
      uniqueInformation: { seers },
      scene_end: true
    })
  } else if (selected_answer === 'no') {
    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_nothing'],
      scene_end: true
    })
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
