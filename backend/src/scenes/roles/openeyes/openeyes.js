import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { openeyesAction } from './openeyes.action'
//TODO
export const openeyes = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).OPENEYES) {
      gamestate.players[token].action_finished = false

      action = openeyesAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
