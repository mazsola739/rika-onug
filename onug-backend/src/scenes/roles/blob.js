import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, getPartOfGroupByToken, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

const randomBlobKickoffText = [
  'blob_1pleft_text',
  'blob_1pright_text',
  'blob_eachside_text',
  'blob_2pleft_text',
  'blob_2pright_text',
  'blob_3pleft_text',
  'blob_3pright_text',
  'blob_4pleft_text',
  'blob_4pright_text',
  'blob_2eachside_text',
]

export const blob = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const total_players = newGamestate.total_players

  let availableBlobOptions = []

  if (total_players === 3) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomKickoff = getRandomItemFromArray(availableBlobOptions)
  const narration = [
    randomKickoff,
    randomKickoff.includes('1p') 
      ? 'blob_is_end_text' 
      : 'blob_are_end_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 44 || (card.player_role_id === 44 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = blob_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const blob_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const randomInstruction = newGamestate.scene.narration[0]
  
  const partOfBlob = getPartOfGroupByToken(newGamestate.players, token, randomInstruction)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    blob: partOfBlob,
  }

  const messageIdentifiers = formatPlayerIdentifier(partOfBlob)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_part_of_blob', ...messageIdentifiers],
    icon: 'blob',
    uniqueInformations: { blob: partOfBlob },
  })
}
