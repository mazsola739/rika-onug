import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { sentinelAction } from './sentinel.action'

export const sentinel = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['sentinel_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).SENTINEL) {
      gamestate.players[token].action_finished = false
      action = sentinelAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
