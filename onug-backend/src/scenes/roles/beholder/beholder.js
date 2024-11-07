import { ALL_COPY_PLAYER } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { beholderInteraction } from './beholder.interaction'

export const beholder = (gamestate, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger ? 'doppelganger_beholder_kickoff_text' : 'beholder_seer_kickoff_text',
    hasSeer && hasApprenticeSeer ? 'beholder_seer_apprenticeseer_kickoff_text' : hasSeer ? 'beholder_seer_kickoff_text' : 'beholder_apprenticeseer_kickoff_text'
  ]

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 73 || (card.player_role_id === 73 && ALL_COPY_PLAYER.includes(card.player_original_id))) {
      newGamestate.players[token].action_finished = false
      interaction = beholderInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
