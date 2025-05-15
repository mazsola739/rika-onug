import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { aliensNarration } from './aliens.narration'
import { aliensAction } from './aliens.action'

export const aliens = (gamestate, title, selected_cards) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = aliensNarration(gamestate, selected_cards)

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).ALIENS) {
      gamestate.players[token].action_finished = false
      action = aliensAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
