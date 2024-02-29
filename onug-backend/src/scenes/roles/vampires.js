//@ts-check
import { HYDRATE_VOTES, MESSAGE, SCENE, vampireIds } from '../../constant'
import { countPlayersVoted, findMostVotedPlayer, getAllPlayerTokens, getNonVampirePlayerNumbersByRoleIds, getPlayerNumbersWhoGotVoted, getVampirePlayerNumbersByRoleIds, getVampireTokensByRoleIds } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const vampires = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (vampireIds.some((id) => newGameState.players[token].card.player_role_id === id)) {
      interaction = vampires_interaction(newGameState, token, title)
    }

    newGameState.players[token].player_history.scene_title = title
    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const vampires_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const vampires = getVampirePlayerNumbersByRoleIds(newGameState.players)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGameState.players)

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

export const vampires_response = (gameState, token, selected_mark_positions, title, ws) => {
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
      ws.send(
        JSON.stringify({ type: HYDRATE_VOTES, votes: playerNumbersWhoGotVoted })
      )
    })
  } else if (alreadyVoted === vampireTokens.length) {
    newGameState.players[token].card_or_mark_action = true

    const mostVotedPlayer = findMostVotedPlayer(newGameState)
    console.log(mostVotedPlayer)
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    mark_of_vampire: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_diseased', selected_mark_positions[0]],
    icon: 'diseased',
    uniqInformations: { mark_of_disease: [selected_mark_positions[0]] },
  })

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
