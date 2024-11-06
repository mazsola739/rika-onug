import {
  generateRoleInteraction,
  getNarrationByTitle,
  getPlayerNumberWithMatchingToken,
} from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateAnswerSelection } from '../../validators'
import { moveCardsButYourOwn } from './villageidiot.utils'

export const villageidiotResponse = (
  gamestate,
  token,
  selected_answer,
  title
) => {
  if (
    !validateAnswerSelection(
      selected_answer,
      gamestate.players[token].player_history,
      title
    )
  ) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const currentPlayer = getPlayerNumberWithMatchingToken(
    newGamestate.players,
    token
  )
  const updatedPlayerCards = moveCardsButYourOwn(
    newGamestate.card_positions,
    selected_answer,
    currentPlayer
  )

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.card_positions = {
    ...newGamestate.card_positions,
    ...updatedPlayerCards,
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    direction: selected_answer,
    scene_end: true,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: [
      'interaction_moved',
      selected_answer === 'left' ? 'direction_left' : 'direction_right',
    ],
    scene_end: true,
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
