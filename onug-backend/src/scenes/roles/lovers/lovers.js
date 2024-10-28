import { SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { loversInteraction } from './lovers.interaction'

export const lovers = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['lovers_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const player = newGamestate.players[token]

    if (player.player_mark === 'mark_of_love') {
      interaction = loversInteraction(newGamestate, token, title)
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
