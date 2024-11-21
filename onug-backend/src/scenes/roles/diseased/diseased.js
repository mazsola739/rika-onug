import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { diseasedAction } from './diseased.action'

export const diseased = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['diseased_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DISEASED) {
      gamestate.players[token].action_finished = false
      action = diseasedAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
