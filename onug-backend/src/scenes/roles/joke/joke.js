import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { random_joke } from './joke.constants'

export const joke = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [getRandomItemFromArray(random_joke)]

  tokens.forEach((token) => {
    let interaction = {}

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
