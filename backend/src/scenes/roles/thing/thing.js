import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { thingAction } from './thing.action'

export const thing = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['thing_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).THING) {
      gamestate.players[token].action_finished = false
      action = thingAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
