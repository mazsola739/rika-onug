import { SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { doppelgangerInteraction } from './doppelganger.interaction'

//TODO if oracle is oracle team
export const doppelganger = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['doppelganger_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 1) {
      interaction = doppelgangerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.scene = scene

  return newGamestate
}
