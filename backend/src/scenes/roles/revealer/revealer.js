import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { revealerAction } from './revealer.action'

export const revealer = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff`, 'revealer_kickoff2']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'revealer' && isActivePlayer(card).REVEALER) || (prefix === 'doppelganger_revealer' && isActivePlayer(card).DOPPELGANGER_REVEALER)) {
      gamestate.players[token].action_finished = false
      action = revealerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
