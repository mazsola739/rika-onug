import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime } from '../../sceneUtils'
import { randomPsychicInstructions, psychicKeys } from './psychic.constants'
import { psychicInteraction } from './psychic.interaction'

export const psychic = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availablePsychicOptions = []

  if (total_players === 3) {
    availablePsychicOptions = randomPsychicInstructions.filter(option => !option.includes('view2'))
  }
 //todo better narration and save into constants
     /*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  const narration = [`${prefix}_kickoff_text`, getRandomItemFromArray(availablePsychicOptions), getRandomItemFromArray(psychicKeys)]
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'psychic') {
      if (card.player_original_id === 51 || (card.player_role_id === 51 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = psychicInteraction(newGamestate, token, title, randomPsychicInstructions, psychicKeys)
      }
    } else if (prefix === 'doppelganger_psychic') {
      if (card.player_role_id === 51 && card.player_original_id === 1) {
        interaction = psychicInteraction(newGamestate, token, title, randomPsychicInstructions, psychicKeys)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
