import { mysticwolfAction } from '..'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'

export const drpeeker = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['drpeeker_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).DR_PEEKER) {
      gamestate.players[token].action_finished = false
      action = mysticwolfAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
