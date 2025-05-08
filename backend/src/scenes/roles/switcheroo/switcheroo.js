import { troublemakerAction } from '..'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'

export const switcheroo = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['switcheroo_kickoff']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SWITCHEROO) {
      gamestate.players[token].action_finished = false

      action = troublemakerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
