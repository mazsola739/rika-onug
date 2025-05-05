import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { rippleAction } from './ripple.action'
import { ripple_random, ripple_sure_repeat } from './ripple.constants'

//TODO fix ripple

export const ripple = (gamestate, title) => {
  const isOracleRipple = gamestate.ripple.force

  if (!gamestate.ripple.force) return gamestate

  const randomRipple = isOracleRipple ? getRandomItemFromArray(ripple_sure_repeat) : getRandomItemFromArray(ripple_random)

  if (randomRipple === 'random_ripple_none') {
    return gamestate
  }

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

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
