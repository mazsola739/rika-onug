import { SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from '../../../utils'

const random_joke = [
  'joke_1_text',
  'joke_2_text',
  'joke_3_text',
  'joke_4_text',
  'joke_5_text',
  'joke_6_text',
  'joke_7_text',
  'joke_8_text',
  'joke_9_text',
  'joke_10_text',
  'joke_11_text',
  'joke_12_text',
  'joke_13_text',
  'joke_14_text',
  'joke_15_text',
  'joke_16_text',
  'joke_17_text',
  'joke_18_text',
  'joke_19_text',
  'joke_20_text',
]

export const joke = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [getRandomItemFromArray(random_joke)]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
