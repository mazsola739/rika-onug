import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { cowInteraction } from './cow.interaction'

//TODO aliens can see cow
export const cow = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger 
      ? 'doppelganger_cow_kickoff_text' 
      : 'cow_kickoff_text',
    'cow_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 45 || (card.player_role_id === 45 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = cowInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
