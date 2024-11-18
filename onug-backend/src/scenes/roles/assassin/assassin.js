import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { assassinInteraction } from './assassin.interaction'

export const assassin = (gamestate, title, hasApprenticeAssassin, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'assassin_kickoff2_text', hasApprenticeAssassin && 'assassin_appassassin_assassin_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'assassin' && isActivePlayer(card).ASSASSIN) {
      newGamestate.players[token].action_finished = false
      interaction = assassinInteraction(newGamestate, token, title)
    } else if (prefix === 'doppelganger_assassin' && isActivePlayer(card).DOPPELGÄNGER_ASSASSIN) {
      newGamestate.players[token].action_finished = false
      interaction = assassinInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
