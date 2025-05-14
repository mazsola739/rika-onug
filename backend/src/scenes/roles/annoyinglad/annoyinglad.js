import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { thingAction } from '..'

export const annoyinglad = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['annoyinglad_kickoff']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ANNOYING_LAD) {
      gamestate.players[token].action_finished = false
      action = thingAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
