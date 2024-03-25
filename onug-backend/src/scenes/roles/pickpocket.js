//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens, getPlayerNumberWithMatchingToken, getMarksByPositions, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

const createPickpocket = prefix => [`${prefix}_kickoff_text`, 'pickpocket_kickoff2_text']

export const pickpocket = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createPickpocket(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'pickpocket') {
      if (card.player_original_id === 36 || (card.player_role_id === 36 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = pickpocket_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_pickpocket') {
      if (card.player_role_id === 36 && card.player_original_id === 1) {
        interaction = pickpocket_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const pickpocket_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'robber',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
  })
}

export const pickpocket_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerMark = newGameState.card_positions[currentPlayerNumber].mark 
  const selectedMark = newGameState.card_positions[selected_mark_positions[0]].mark 
  newGameState.card_positions[currentPlayerNumber].mark = selectedMark
  newGameState.card_positions[selected_mark_positions[0]].mark = currentPlayerMark

  newGameState.players[token].card.player_mark = newGameState.card_positions[currentPlayerNumber].mark

  const viewMarks = getMarksByPositions(newGameState.card_positions, [currentPlayerNumber])

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_marks: [currentPlayerNumber, selected_mark_positions[0]],
    viewed_marks: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_mark_positions[0]])

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_marks', ...messageIdentifiers, 'interaction_own_mark'],
    icon: 'robber',
    showMarks: viewMarks,
    uniqInformations: { swapped_marks: [currentPlayerNumber, selected_mark_positions[0]], viewed_marks: [currentPlayerNumber] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
