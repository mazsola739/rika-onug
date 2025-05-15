import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { bodysnatcherAction } from './bodysnatcher.action'
import { bodysnatcherNarration } from './bodysnatcher.narration'

export const bodysnatcher = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = bodysnatcherNarration(gamestate, prefix)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'bodysnatcher' && isActivePlayer(card).BODY_SNATCHER) || (prefix === 'doppelganger_bodysnatcher' && isActivePlayer(card).DOPPELGANGER_BODY_SNATCHER)) {
      gamestate.players[token].action_finished = false
      action = bodysnatcherAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
