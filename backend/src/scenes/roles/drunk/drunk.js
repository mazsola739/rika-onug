import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { drunkAction } from './drunk.action'

export const drunk = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['drunk_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).DRUNK) {
      gamestate.players[token].action_finished = false
      action = drunkAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
