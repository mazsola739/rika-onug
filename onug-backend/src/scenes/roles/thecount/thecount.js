import { COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { thecountInteraction } from './thecount.interaction'

export const thecount = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'thecount') {
      if (card.player_original_id === 39 || (card.player_role_id === 39 && COPY_PLAYER.includes(card.player_original_id))) {
        newGamestate.players[token].action_finished = false
        interaction = thecountInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (card.player_role_id === 39 && card.player_original_id === 1) {
        newGamestate.players[token].action_finished = false
        interaction = thecountInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
