//@ts-check
import { vampireIds, allCopyPlayerIds, SCENE, HYDRATE_VOTES } from '../../constant'
import { getAllPlayerTokens, getVampirePlayerNumbersByRoleIds, getNonVampirePlayerNumbersByRoleIds, getVampireTokensByRoleIds, countPlayersVoted, getPlayerNumbersWhoGotVoted, findMostVotedPlayer } from '../../utils'
import { websocketServerConnectionsPerRoom } from '../../websocket/connections'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const vampires = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (vampireIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = vampires_interaction(newGameState, token, title)
    }

    newGameState.players[token].player_history.scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

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
    private_message: ['interaction_vampires', 'interaction_must_one_any_other'],
    icon: 'vampire',
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqInformations: { vampires },
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
  const playerNumbersWhoGotVoted = getPlayerNumbersWhoGotVoted(newGameState.players)

  if (alreadyVoted < vampireTokens.length) {
    vampireTokens.forEach((token) => {
      websocketServerConnectionsPerRoom[newGameState.room_id][token].send(JSON.stringify({
        type: HYDRATE_VOTES,
        votes: playerNumbersWhoGotVoted,
      }))
    })
  } else if (alreadyVoted === vampireTokens.length) {
    newGameState.players[token].card_or_mark_action = true

    const mostVotedPlayer = findMostVotedPlayer(newGameState)
//TODO fix
/*       const vampirePosition = newGameState.mark_positions.vampire
      const selectedPosition = newGameState.card_positions[mostVotedPlayer[0]].mark
  
      newGameState.mark_positions.vampire = selectedPosition
      newGameState.card_positions[mostVotedPlayer[0]].mark = vampirePosition
    
  
    newGameState.players[token].card_or_mark_action = true */
  
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      mark_of_fear: [selected_mark_positions[0]],
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      mark_of_vampire: [mostVotedPlayer],
    }

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_mark_of_vampire', mostVotedPlayer],
      icon: 'fang',
      uniqInformations: { mark_of_vampire: [mostVotedPlayer] },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

  }

  return newGameState
}
