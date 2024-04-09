//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, pickRandomUpToThreePlayers, getAllPlayerTokens, getSceneEndTime } from '../../utils'

const empathAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]

const randomEmpathInstructions = [
  'empath_action1_text',
  'empath_action2_text',
  'empath_action3_text',
  'empath_action4_text',
  'empath_action5_text',
  'empath_action6_text',
  'empath_action7_text',
  'empath_action8_text',
  'empath_action9_text',
  'empath_action10_text',
  'empath_action11_text',
  'empath_action12_text',
  'empath_action13_text',
  'empath_action14_text',
]

const empathKey = getRandomItemFromArray(empathAllKeys)
const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
const createEmpath = (prefix, totalPlayers) =>  [`${prefix}_kickoff_text`, 'empath_kickoff2_text', randomEmpathInstruction === 'activePlayers' ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and') : empathKey, randomEmpathInstruction]

export const empath = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)  
  const total_players = newGameState.total_players
  const narration = createEmpath(prefix, total_players)
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card
    //TODO is not the empath here who get this, but empathAllKeys
    if (prefix === 'empath') {
      if (card.player_original_id === 77 || (card.player_role_id === 77 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = empath_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_empath') {
      if (card.player_role_id === 77 && card.player_original_id === 1) {
        interaction = empath_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const empath_interaction = (gameState, token, title) => {
  return {}
}

export const empath_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const empath_vote = (gameState, title) => {}