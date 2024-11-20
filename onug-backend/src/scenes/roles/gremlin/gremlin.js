import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { gremlinInteraction } from './gremlin.interaction'

export const gremlin = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'gremlin' && isActivePlayer(card).GREMLIN) {
      gamestate.players[token].action_finished = false
      interaction = gremlinInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_gremlin' && isActivePlayer(card).DOPPELGÄNGER_GREMLIN) {
      gamestate.players[token].action_finished = false
      interaction = gremlinInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
