import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { revealerInteraction } from './revealer.interaction'

export const revealer = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'revealer_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'revealer' && isActivePlayer(card).REVEALER) {
      newGamestate.players[token].action_finished = false
      interaction = revealerInteraction(newGamestate, token, title)
    } else if (prefix === 'doppelganger_revealer' && isActivePlayer(card).DOPPELGÄNGER_REVEALER) {
      newGamestate.players[token].action_finished = false
      interaction = revealerInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
