import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { robberAction } from './robber.action'

export const robber = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['robber_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ROBBER) {
      gamestate.players[token].action_finished = false
      action = robberAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
