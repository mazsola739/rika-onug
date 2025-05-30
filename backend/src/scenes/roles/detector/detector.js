import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { seerAction } from '..'

export const detector = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['detector_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).DETECTOR) {
      gamestate.players[token].action_finished = false
      action = seerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
