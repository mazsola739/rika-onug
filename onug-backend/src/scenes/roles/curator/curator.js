import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { curatorInteraction } from './curator.action'

export const curator = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'curator_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'curator' && isActivePlayer(card).CURATOR) {
      gamestate.players[token].action_finished = false
      action = curatorInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_curator' && isActivePlayer(card).DOPPELGÄNGER_CURATOR) {
      gamestate.players[token].action_finished = false
      action = curatorInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
