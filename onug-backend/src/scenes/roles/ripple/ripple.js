import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { rippleAction } from './ripple.action'

export const ripple = (gamestate, title) => {
  if (!gamestate.ripple.force) return gamestate

  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = gamestate.ripple.narration

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).RIPPLE) {
      gamestate.players[token].action_finished = false

      action = rippleAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
