import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { apprenticeassassinInteraction } from './apprenticeassassin.interaction'

export const apprenticeassassin = (gamestate, title, hasAssassin, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, hasAssassin ? 'apprenticeassassin_assassin_text' : 'apprenticeassassin_alone_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'apprenticeassassin' && isActivePlayer(card).APPRENTICE_ASSASSIN) {
      gamestate.players[token].action_finished = false
      interaction = apprenticeassassinInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_apprenticeassassin' && isActivePlayer(card).DOPPELGÄNGER_APPRENTICE_ASSASSIN) {
      gamestate.players[token].action_finished = false
      interaction = apprenticeassassinInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
