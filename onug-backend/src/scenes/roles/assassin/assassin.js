import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { assassinInteraction } from './assassin.interaction'

export const assassin = (gamestate, title, hasApprenticeAssassin, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'assassin_kickoff2_text', hasApprenticeAssassin && 'assassin_appassassin_assassin_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'assassin' && isActivePlayer(card).ASSASSIN) {
      gamestate.players[token].action_finished = false
      interaction = assassinInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_assassin' && isActivePlayer(card).DOPPELGÄNGER_ASSASSIN) {
      gamestate.players[token].action_finished = false
      interaction = assassinInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
