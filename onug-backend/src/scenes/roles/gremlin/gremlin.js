import { IDS } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { gremlinInteraction } from './gremlin.interaction'

export const gremlin = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'gremlin') {
      if (card.player_original_id === 33 || (card.player_role_id === 33 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        newGamestate.players[token].action_finished = false
        interaction = gremlinInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_gremlin') {
      if (card.player_role_id === 33 && card.player_original_id === 1) {
        newGamestate.players[token].action_finished = false
        interaction = gremlinInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
