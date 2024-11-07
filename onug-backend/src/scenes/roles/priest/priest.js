import { COPY_PLAYER } from '../../../constants'
import { createAndSendSceneMessage, getAllPlayerTokens } from '../../sceneUtils'
import { priestInteraction } from './priest.interaction'

export const priest = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'priest') {
      if (card.player_original_id === 37 || (card.player_role_id === 37 && COPY_PLAYER.includes(card.player_original_id))) {
        newGamestate.players[token].action_finished = false
        interaction = priestInteraction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (card.player_role_id === 37 && card.player_original_id === 1) {
        newGamestate.players[token].action_finished = false
        interaction = priestInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
