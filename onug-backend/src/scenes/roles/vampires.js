//@ts-check
import { vampireIds, allCopyPlayerIds, SCENE, VOTE } from '../../constant'
import { getAllPlayerTokens, getVampirePlayerNumbersByRoleIds, getNonVampirePlayerNumbersByRoleIds, getVampireTokensByRoleIds, countPlayersVoted, formatPlayerIdentifier, getRandomItemsFromArray, getSceneEndTime, collectVotes, findMostVoted } from '../../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const vampires = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []
  const actionTime = 15

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

  const privateMessage = ['interaction_vampires', 'interaction_must_one_any_non_vampire']
  const requiredMarkSelection = getRandomItemsFromArray(nonVampires, 1)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
    vampires,
    required_mark_selection: requiredMarkSelection, private_message: privateMessage,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
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

  const vampireTokens = getVampireTokensByRoleIds(newGameState.players)
  newGameState.players[token].vampire_vote = selected_mark_positions[0]

  const alreadyVoted = countPlayersVoted(newGameState.players)
  const votes = collectVotes(newGameState.players[token].player_number, selected_mark_positions[0], newGameState.vampire_votes)

  newGameState.vampire_votes = votes
  
  //TODO why not working?
  if (alreadyVoted < vampireTokens.length) {
    vampireTokens.forEach((token) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][token].send(JSON.stringify({
        type: VOTE,
        votes,
        message: ['vote_vampire_votes']
      }))
    })
  } else if (alreadyVoted === vampireTokens.length) {
    newGameState.players[token].card_or_mark_action = true

    const mostVotedPlayer = findMostVoted(votes)

    const vampirePosition = newGameState.mark_positions.vampire
    const selectedPosition = newGameState.card_positions[mostVotedPlayer[0]].mark
  
    newGameState.mark_positions.vampire = selectedPosition
    newGameState.card_positions[mostVotedPlayer[0]].mark = vampirePosition

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      mark_of_vampire: [mostVotedPlayer[0]],
    }

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier(mostVotedPlayer)[0]],
      icon: 'fang',
      uniqueInformations: { mark_of_vampire: [mostVotedPlayer[0]] },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene
  }

  return newGameState
}
