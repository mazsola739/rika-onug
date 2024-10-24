import { SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { copycatInteraction } from './copycat.interaction'

//TODO if oracle is oracle team
export const copycat = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['copycat_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 30) {
      interaction = copycatInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.scene = scene

  return newGamestate
}
