import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { drunkInteraction } from './drunk.action'

export const drunk = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['drunk_kickoff_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).DRUNK) {
      gamestate.players[token].action_finished = false
      action = drunkInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
