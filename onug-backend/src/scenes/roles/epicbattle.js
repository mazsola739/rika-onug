import { SCENE } from '../../constants'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../utils'

const random_easteregg_nobadguys = [
  'easteregg_nobadguys_text_1',
  'easteregg_nobadguys_text_2',
  'easteregg_nobadguys_text_3',
  'easteregg_nobadguys_text_4',
  'easteregg_nobadguys_text_5',
  'easteregg_nobadguys_text_6',
  'easteregg_nobadguys_text_7',
  'easteregg_nobadguys_text_8',
  'easteregg_nobadguys_text_9',
  'easteregg_nobadguys_text_10',
]
const random_easteregg_nogoodguys = [
  'easteregg_nogoodguys_text_1',
  'easteregg_nogoodguys_text_2',
  'easteregg_nogoodguys_text_3',
  'easteregg_nogoodguys_text_4',
  'easteregg_nogoodguys_text_5',
  'easteregg_nogoodguys_text_6',
  'easteregg_nogoodguys_text_7',
  'easteregg_nogoodguys_text_8',
  'easteregg_nogoodguys_text_9',
  'easteregg_nogoodguys_text_10',
]

//TODO FIX IT

/* export const epicbattle = (gamestate, title, hasEasterEgg, hasEpicBattle, totalPlayers, nogoodguys, nobadguys) => {
  if (hasEpicBattle) {
    return ['everyone_epic_intro_text']
  }
  
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = []
  const actionTime = 8

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

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
} */
