import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { copycatAction } from '..'

export const mirrorman = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['mirrorman_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).MIRROR_MAN) {
      gamestate.players[token].action_finished = false
      action = copycatAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
