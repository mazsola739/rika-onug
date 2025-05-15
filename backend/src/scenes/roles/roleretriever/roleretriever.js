import { robberAction } from '..'
import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'

export const roleretriever = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['roleretriever_kickoff']

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ROLE_RETRIEVER) {
      gamestate.players[token].action_finished = false
      action = robberAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
