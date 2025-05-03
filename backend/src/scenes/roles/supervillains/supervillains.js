import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { supervillainsAction } from './supervillains.action'

//TODO fix supervillains to see eachother's actions

export const supervillains = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['supervillains_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).SUPER_VILLAINS) {
      gamestate.players[token].action_finished = false

      action = supervillainsAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
