import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { apprenticeassassinAction } from './apprenticeassassin.action'

export const apprenticeassassin = (gamestate, title, hasAssassin, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff`, hasAssassin ? 'apprenticeassassin_assassin' : 'apprenticeassassin_alone']
  gamestate.scenes.narration.push({ [title]: narration })

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'apprenticeassassin' && isActivePlayer(card).APPRENTICE_ASSASSIN) || (prefix === 'doppelganger_apprenticeassassin' && isActivePlayer(card).DOPPELGANGER_APPRENTICE_ASSASSIN)) {
      gamestate.players[token].action_finished = false
      action = apprenticeassassinAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  return gamestate
}
