import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { gremlinAction } from './gremlin.action'

export const gremlin = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff`, 'gremlin_kickoff2']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'gremlin' && isActivePlayer(card).GREMLIN) || (prefix === 'doppelganger_gremlin' && isActivePlayer(card).DOPPELGANGER_GREMLIN)) {
      gamestate.players[token].action_finished = false
      action = gremlinAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
