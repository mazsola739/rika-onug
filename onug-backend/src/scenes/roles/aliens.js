//@ts-check
import { alienIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getRandomItemFromArray, getSceneEndTime, pickRandomUpToThreePlayers } from '../../utils'

const randomAlienInstructions = [
  'aliens_view_text',
  'aliens_allview_text',
  'aliens_stare_text',
  'aliens_left_text',
  'aliens_right_text',
  'aliens_show_text',
  'aliens_timer_text',
  'aliens_newalien_text',
  'aliens_alienhelper_text',
]
const alienAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]
const alienAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
]

export const aliens = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['aliens_kickoff_text']
  const randomAlienInstruction = getRandomItemFromArray(randomAlienInstructions)
  let alienKey
  const actionTime = 8

  if (randomAlienInstruction.includes('view')) {
    alienKey = getRandomItemFromArray(alienAnyKeys)
    if (alienKey === 'activePlayers') {
      alienKey = pickRandomUpToThreePlayers(newGameState.total_players, 'conjunction_and')
    }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    alienKey = getRandomItemFromArray(alienAllKeys)
  }

  narration[1] = randomAlienInstruction
  narration[2] = alienKey

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (alienIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = aliens_interaction(newGameState, token, title, randomAlienInstruction, alienKey)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

//  const messageIdentifiers = formatPlayerIdentifier(aliens)

export const aliens_interaction = (gameState, token, title, randomAlienInstruction, alienKey) => {
  return {}
}

export const aliens_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []

  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
