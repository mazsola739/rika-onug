import { SCENE } from '../../../constants'
import { getAllPlayerTokens } from '../../sceneUtils'
import { everyonemarkInteraction } from './everyonemark.interaction'

export const everyonemark = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['everyone_mark_text']

  tokens.forEach((token) => {
    let interaction = {}

    interaction = everyonemarkInteraction(newGamestate, token, title)

    newGamestate.players[token].player_history[title].scene_title = title
    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
