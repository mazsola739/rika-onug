import { witchAction } from '..'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'

export const voodoolou = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['voodoolou_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).VOODOO_LOU) {
      gamestate.players[token].action_finished = false
      action = witchAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
