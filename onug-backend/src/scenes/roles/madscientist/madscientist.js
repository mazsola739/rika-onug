import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { random_madscientist_intro, random_madscientist_therefore, random_madscientist_result, random_madscientist_transition } from './madscientist.constants'

export const madscientist = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    'madscientist_kickoff_text',
    getRandomItemFromArray(random_madscientist_intro),
    getRandomItemFromArray(random_madscientist_therefore),
    getRandomItemFromArray(random_madscientist_result),
    getRandomItemFromArray(random_madscientist_transition),
    'madscientist_close_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    scene.push({ [token]: { interaction } })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene[title] = scene

  return newGamestate
}
