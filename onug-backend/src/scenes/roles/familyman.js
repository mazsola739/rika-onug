//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getPartOfGroupByToken, getRandomItemFromArray, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

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

export const familyman = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const total_players = newGameState.total_players

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

    const card = newGameState.players[token].card

    if (card.player_original_id === 78 || (card.player_role_id === 78 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = familyman_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const familyman_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const randomInstruction = newGameState.scene.narration[1]
  
  const partOfFamily = getPartOfGroupByToken(newGameState.players, token, randomInstruction)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    family: partOfFamily,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_part_of_family'],
    icon: 'family',
    uniqInformations: { family: partOfFamily, },
  })
}
