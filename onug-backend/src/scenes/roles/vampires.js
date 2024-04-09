//@ts-check
import { vampireIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getVampirePlayerNumbersByRoleIds, getNonVampirePlayerNumbersByRoleIds, collectVotes, findMostVoted, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const vampires = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (vampireIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = vampires_interaction(newGameState, token, title)
    }

    newGameState.players[token].player_history.scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const vampires_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const vampires = getVampirePlayerNumbersByRoleIds(newGameState.players)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGameState)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
    vampires,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_vampires', 'interaction_must_one_any_non_vampire'],
    icon: 'vampire',
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vampires },
  })
}

export const vampires_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const vampires = getVampirePlayerNumbersByRoleIds(newGameState.players)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGameState)
  newGameState.players[token].vampire_vote = selected_mark_positions[0]

  const votes = collectVotes(newGameState.players[token].player_number, selected_mark_positions[0], newGameState.vampire_votes)
  newGameState.vampire_votes = votes

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
    vampires, votes,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_vampires', 'interaction_must_one_any_non_vampire'],
    icon: 'vampire',
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vampires, votes, },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

export const vampires_vote = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_vote_result_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []
  const actionTime = 5

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (vampireIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = vampires_vote_result(newGameState, token, title)
    }

    newGameState.players[token].player_history.scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const vampires_vote_result = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const scene = []

  newGameState.players[token].card_or_mark_action = true

  const mostVotedPlayer = findMostVoted(newGameState.vampire_votes)

  const vampirePosition = newGameState.mark_positions.vampire
  const selectedPosition = newGameState.card_positions[mostVotedPlayer[0]].mark

  newGameState.mark_positions.vampire = selectedPosition
  newGameState.card_positions[mostVotedPlayer[0]].mark = vampirePosition

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    mark_of_vampire: [mostVotedPlayer[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier(mostVotedPlayer)[0]],
    icon: 'fang',
    uniqueInformations: { mark_of_vampire: [mostVotedPlayer[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
