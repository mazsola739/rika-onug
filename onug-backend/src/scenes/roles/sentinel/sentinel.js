import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { sentinelInteraction } from './sentinel.action'

export const sentinel = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['sentinel_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SENTINEL) {
      gamestate.players[token].action_finished = false
      action = sentinelInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
