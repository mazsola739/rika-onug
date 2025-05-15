import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { masonsAction } from './masons.action'

export const masons = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['masons_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).MASONS) {
      gamestate.players[token].action_finished = false
      action = masonsAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
