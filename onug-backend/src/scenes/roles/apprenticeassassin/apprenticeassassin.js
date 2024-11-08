import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { apprenticeassassinInteraction } from './apprenticeassassin.interaction'

export const apprenticeassassin = (gamestate, title, hasAssassin, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, hasAssassin ? 'apprenticeassassin_assassin_text' : 'apprenticeassassin_alone_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'apprenticeassassin' && isActivePlayer(card).APPRENTICE_ASSASSIN) {
      newGamestate.players[token].action_finished = false
      interaction = apprenticeassassinInteraction(newGamestate, token, title)
    } else if (prefix === 'doppelganger_apprenticeassassin' && isActivePlayer(card).DOPPELGÄNGER_APPRENTICE_ASSASSIN) {
      newGamestate.players[token].action_finished = false
      interaction = apprenticeassassinInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
