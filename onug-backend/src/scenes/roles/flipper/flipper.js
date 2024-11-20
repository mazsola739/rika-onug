import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { flipperInteraction } from './flipper.interaction'

export const flipper = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'flipper_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'flipper' && isActivePlayer(card).FLIPPER) {
      gamestate.players[token].action_finished = false
      interaction = flipperInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_flipper' && isActivePlayer(card).DOPPELGÄNGER_FLIPPER) {
      gamestate.players[token].action_finished = false
      interaction = flipperInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
