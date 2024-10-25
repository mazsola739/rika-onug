import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { renfieldInteraction } from './renfield.interaction'

//TODO no vampire he is villager
export const renfield = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_renfield_kickoff_text'
      : 'renfield_kickoff_text',
    'renfield_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 38 || (card.player_role_id === 38 && IDS.ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = renfieldInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
