import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { cupidAction } from './cupid.action'

export const cupid = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['cupid_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).CUPID) {
      gamestate.players[token].action_finished = false
      action = cupidAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
