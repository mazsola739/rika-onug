//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, pickRandomUpToThreePlayers, getAllPlayerTokens, getSceneEndTime } from '../../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'

const empathKeys = [
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


export const empath = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)  
  const totalPlayers = newGameState.total_players
  const empathKey = getRandomItemFromArray(empathKeys)
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration =  [`${prefix}_kickoff_text`, 'empath_kickoff2_text', randomEmpathInstruction === 'activePlayers' ? pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and') : empathKey, randomEmpathInstruction]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card
    //TODO is not the empath here who get this, but empathKeys
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

/* export const alien_vote = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['aliens_vote_result_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (alienIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = alien_vote_result(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const alien_vote_result = (gameState, token, title) => {
  const newGameState = { ...gameState }

  newGameState.players[token].card_or_mark_action = true

  const mostVotedPlayer = findMostVoted(newGameState.alien_votes)

  //TODO alien helper or new alien || view card
  const selectedPosition = newGameState.card_positions[mostVotedPlayer[0]]
  newGameState.mark_positions.alien = selectedPosition

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    babyalien: [mostVotedPlayer[0]],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_alien', formatPlayerIdentifier(mostVotedPlayer)[0]],
    icon: 'alienhand',
    uniqueInformations: { babyalien: [mostVotedPlayer[0]] },
  })
}
 */