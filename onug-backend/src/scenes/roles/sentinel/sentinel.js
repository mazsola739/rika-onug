import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { sentinelInteraction } from './sentinel.interaction'

export const sentinel = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['sentinel_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 25 || (card.player_role_id === 25 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = sentinelInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.scene = scene

  return newGamestate
}
