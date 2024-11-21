import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { everyonemarkInteraction } from './everyonemark.action'

export const everyonemark = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['everyone_mark_text']

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).EVERYONE_MARK) {
      gamestate.players[token].action_finished = false
      action = everyonemarkInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
