import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { loversAction } from './lovers.action'

export const lovers = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['lovers_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).LOVERS) {
      gamestate.players[token].action_finished = false
      action = loversAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
