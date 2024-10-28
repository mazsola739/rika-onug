import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { everyonemarkInteraction } from '../everyonemark/everyonemark.interaction'
import { random_easteregg_nobadguys, random_easteregg_nogoodguys } from './epicbattle.constants'

export const epicbattle = (gamestate, title, hasEasterEgg, hasEpicBattle, totalPlayers, nogoodguys, nobadguys) => {
  if (hasEpicBattle) {
    return ['everyone_epic_intro_text']
  }
  
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = []

  if (hasEasterEgg) {
    if (totalPlayers === 12) {
      narration.push('easteregg_really_text', 'easteregg_whatever_text')
    } else if (nobadguys) {
      narration.push(getRandomItemFromArray(random_easteregg_nobadguys), 'easteregg_whatever_text')
    } else if (nogoodguys) {
      narration.push(getRandomItemFromArray(random_easteregg_nogoodguys), 'easteregg_whatever_text')
    }
  }

  tokens.forEach((token) => {
    let interaction = {}

    interaction = everyonemarkInteraction(newGamestate, token, title)

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
