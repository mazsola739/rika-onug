import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { thecountInteraction } from './thecount.interaction'

export const thecount = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'thecount' && isActivePlayer(card).THE_COUNT) {
      gamestate.players[token].action_finished = false
      interaction = thecountInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_thecount' && isActivePlayer(card).DOPPELGÄNGER_THE_COUNT) {
      gamestate.players[token].action_finished = false
      interaction = thecountInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
