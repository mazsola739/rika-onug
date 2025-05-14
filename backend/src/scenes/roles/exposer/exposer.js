import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { exposerAction } from './exposer.action'
import { exposerNarration } from './exposer.narration'

export const exposer = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = exposerNarration(gamestate, prefix)
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'exposer' && isActivePlayer(card).EXPOSER) || (prefix === 'doppelganger_exposer' && isActivePlayer(card).DOPPELGANGER_EXPOSER)) {
      gamestate.players[token].action_finished = false
      action = exposerAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
