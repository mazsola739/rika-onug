import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { priestInteraction } from './priest.interaction'

export const priest = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'priest' && isActivePlayer(card).PRIEST) {
      gamestate.players[token].action_finished = false
      interaction = priestInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_priest' && isActivePlayer(card).DOPPELGÄNGER_PRIEST) {
      gamestate.players[token].action_finished = false
      interaction = priestInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
