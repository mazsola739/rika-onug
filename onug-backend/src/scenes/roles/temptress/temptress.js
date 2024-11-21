import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { temptressInteraction } from './temptress.action'

export const temptress = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['temptress_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).TEMPTRESS) {
      gamestate.players[token].action_finished = false
      action = temptressInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
