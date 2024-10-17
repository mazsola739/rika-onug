import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getPartOfGroupByToken, getRandomItemFromArray, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'

const randomFamilyman = [
  'familyman_1pleft_text',
  'familyman_1pright_text',
  'familyman_eachside_text',
  'familyman_2pleft_text',
  'familyman_2pright_text',
  'familyman_3pleft_text',
  'familyman_3pright_text',
  'familyman_4pleft_text',
  'familyman_4pright_text',
  'familyman_2eachside_text',
]

export const familyman = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availableFamilyManOptions = []

  if (total_players === 3) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  }else if (total_players >= 4 && total_players < 5) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomAvailableOption = getRandomItemFromArray(availableFamilyManOptions)

  const narration = [
    hasDoppelganger
      ? 'doppelganger_familyman_kickoff_text'
      : 'familyman_kickoff_text',
    randomAvailableOption,
    randomFamilyman.includes('1p')
      ? 'familyman_is_end_text'
      : 'familyman_are_end_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 78 || (card.player_role_id === 78 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = familymanInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const familymanInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const randomInstruction = newGamestate.scene.narration[1]
  
  const partOfFamily = getPartOfGroupByToken(newGamestate.players, token, randomInstruction)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    family: partOfFamily,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_part_of_family'],
    icon: 'family',
    uniqueInformations: { family: partOfFamily, },
  })
}
