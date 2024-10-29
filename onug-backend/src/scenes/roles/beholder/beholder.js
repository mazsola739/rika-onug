import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { beholderInteraction } from './beholder.interaction'

export const beholder = (gamestate, title, hasSeer, hasApprenticeSeer, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_beholder_kickoff_text'
      : 'beholder_seer_kickoff_text',
    hasSeer && hasApprenticeSeer
      ? 'beholder_seer_apprenticeseer_kickoff_text'
      : hasSeer
      ? 'beholder_seer_kickoff_text'
      : 'beholder_apprenticeseer_kickoff_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 73 || (card.player_role_id === 73 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = beholderInteraction(newGamestate, token, title)
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction, narration })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
