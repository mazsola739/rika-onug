import { generateRoleInteraction, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateAnswerSelection } from '../../validators'
import { moveCardsButYourOwn } from './villageidiot.utils'

export const villageidiotResponse = (gamestate, token, selected_answer, title) => {
  if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const currentPlayer = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const updatedPlayerCards = moveCardsButYourOwn(gamestate.card_positions, selected_answer, currentPlayer)

  gamestate.players[token].card_or_mark_action = true

  gamestate.card_positions = {
    ...gamestate.card_positions,
    ...updatedPlayerCards
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    direction: selected_answer,
    scene_end: true
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_moved', selected_answer === 'left' ? 'direction_left' : 'direction_right'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
