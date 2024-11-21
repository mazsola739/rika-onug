import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { cupidInteraction } from './cupid.action'

export const cupid = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['cupid_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).CUPID) {
      gamestate.players[token].action_finished = false
      action = cupidInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
