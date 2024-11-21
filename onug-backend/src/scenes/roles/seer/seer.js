import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { seerAction } from './seer.action'

export const seer = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['seer_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SEER) {
      gamestate.players[token].action_finished = false
      action = seerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
