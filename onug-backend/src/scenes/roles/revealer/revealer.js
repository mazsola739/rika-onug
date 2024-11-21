import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { revealerInteraction } from './revealer.action'

export const revealer = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'revealer_kickoff2_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'revealer' && isActivePlayer(card).REVEALER) {
      gamestate.players[token].action_finished = false
      action = revealerInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_revealer' && isActivePlayer(card).DOPPELGÄNGER_REVEALER) {
      gamestate.players[token].action_finished = false
      action = revealerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
