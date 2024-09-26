import { ALL_VAMPIRE_IDS, ALL_COPY_PLAYER_IDS, SCENE, VOTE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getVampirePlayerNumbersByRoleIds, getNonVampirePlayerNumbersByRoleIds, addVote, findMostVoted, formatPlayerIdentifier, removeVote, getPlayerTokensByPlayerNumber } from '../../utils'
import { webSocketServerConnectionsPerRoom } from '../../websocket/connections'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const vampires = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGamestate.players)
  const scene = []
  const actionTime = 12

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (ALL_VAMPIRE_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = vampires_interaction(newGamestate, token, title)
    }

    newGamestate.players[token].player_history[title].scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const vampires_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
    vampires,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vampires', 'interaction_must_one_any_non_vampire'],
    icon: 'vampire',
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vampires },
  })
}

export const vampires_response = (gamestate, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const votes = addVote(newGamestate.players[token].player_number, selected_mark_positions[0], newGamestate.vampire_votes)

  newGamestate.players[token].vampire_vote = selected_mark_positions[0]
  newGamestate.vampire_votes = votes

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const vampireTokens = getPlayerTokensByPlayerNumber(newGamestate.players, vampires)

  vampireTokens.forEach((vampireToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][vampireToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    vampires,
    vampire_vote: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'vampire',
    uniqueInformations: { vampires },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

export const vampires_vote = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const narration = ['vampires_vote_result_text']
  const tokens = getAllPlayerTokens(newGamestate.players)
  const scene = []
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (ALL_VAMPIRE_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = vampires_vote_result(newGamestate, token, title)
    }

    newGamestate.players[token].player_history[title].scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const vampires_vote_result = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  newGamestate.players[token].card_or_mark_action = true

  const mostVotedPlayer = findMostVoted(newGamestate.vampire_votes)

  const vampirePosition = newGamestate.mark_positions.vampire
  const selectedPosition = newGamestate.card_positions[mostVotedPlayer[0]].mark

  newGamestate.mark_positions.vampire = selectedPosition
  newGamestate.card_positions[mostVotedPlayer[0]].mark = vampirePosition

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_vampire: [mostVotedPlayer[0]],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier(mostVotedPlayer)[0]],
    icon: 'fang',
    uniqueInformations: { mark_of_vampire: [mostVotedPlayer[0]] },
  })
}
