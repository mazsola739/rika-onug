import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { everyonemarkInteraction } from './everyonemark.interaction'

export const everyonemark = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['everyone_mark_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).EVERYONE_MARK) {
      gamestate.players[token].action_finished = false
      interaction = everyonemarkInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
