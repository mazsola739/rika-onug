import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../../sceneUtils'
import { witchAction } from './witch.action'

export const witch = (ws, gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['witch_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).WITCH) {
      gamestate.players[token].action_finished = false

      action = witchAction(gamestate, token, title)
    }

    createAndSendSceneMessage(ws, gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
