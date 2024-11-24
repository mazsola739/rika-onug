import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { gremlinAction } from './gremlin.action'

export const gremlin = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'gremlin' && isActivePlayer(card).GREMLIN) || (prefix === 'doppelganger_gremlin' && isActivePlayer(card).DOPPELGÄNGER_GREMLIN)) {
      gamestate.players[token].action_finished = false

      action = gremlinAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
