import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { vampiresAction } from './vampires.action'

export const vampires = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['vampires_kickoff', 'vampires_vote']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).VAMPIRES) {
      gamestate.players[token].action_finished = false
      action = vampiresAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
