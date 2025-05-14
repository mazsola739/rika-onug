import { isActivePlayer } from '../../activePlayer'
import { getAllPlayerTokens, createAndSendSceneMessage } from '../../sceneUtils'
import { doppelgangerinstantactionAction } from './doppelgangerinstantaction.action'
import { doppelgangerinstantactionNarration } from './doppelgangerinstantaction.narration'

export const doppelgangerinstantaction = (gamestate, title, selected_cards) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = doppelgangerinstantactionNarration(selected_cards)
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if (isActivePlayer(card).DOPPELGANGER) {
      gamestate.players[token].action_finished = false
      action = doppelgangerinstantactionAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
