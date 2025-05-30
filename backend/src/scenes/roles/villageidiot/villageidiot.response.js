import { moveCardsButYourOwn, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { validateAnswerSelection } from '../../validators'

export const villageidiotResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(gamestate, token, selected_answer, title)) {
    return gamestate
  }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  const updatedPlayerCards = moveCardsButYourOwn(gamestate.positions.card_positions, selected_answer, currentPlayerNumber)

  gamestate.players[token].card_or_mark_action = true

  gamestate.positions.card_positions = {
    ...gamestate.positions.card_positions,
    ...updatedPlayerCards
  }

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_moved', selected_answer === 'left' ? 'direction_left' : 'direction_right'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
