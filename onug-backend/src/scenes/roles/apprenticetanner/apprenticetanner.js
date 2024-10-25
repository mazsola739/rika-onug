import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { apprenticetannerInteraction } from './apprenticetanner.interaction'

export const apprenticetanner = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_apprenticetanner_kickoff_text'
      : 'apprenticetanner_kickoff_text',
    'apprenticetanner_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 71 || (card.player_role_id === 71 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = apprenticetannerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
