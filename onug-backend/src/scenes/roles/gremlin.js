//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection, isValidMarkSelection } from '../validate-response-data'

const createGremlin = prefix => [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']

export const gremlin = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createGremlin(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'gremlin') {
      if (card.player_original_id === 33 || (card.player_role_id === 33 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = gremlin_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_gremlin') {
      if (card.player_role_id === 33 && card.player_original_id === 1) {
        interaction = gremlin_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const gremlin_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 },
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_two_any'],
    icon: 'swap',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 2 } },
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 } },
  })
}

export const gremlin_response = (gameState, token, selected_card_positions, selected_mark_positions, title) => {
  if (selected_card_positions && selected_card_positions.length > 0) {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
      return gameState
    }

    const newGameState = { ...gameState }
    const scene = []

    const [position1, position2] = selected_card_positions
    const playerOneCard = { ...newGameState.card_positions[position1].card }
    const playerTwoCard = { ...newGameState.card_positions[position2].card }

    newGameState.card_positions[position1].card = playerTwoCard
    newGameState.card_positions[position2].card = playerOneCard

    newGameState.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

    if (currentPlayerNumber === selected_card_positions[0] || currentPlayerNumber === selected_card_positions[1]) {
      newGameState.players[token].card.player_card_id = 0
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      swapped_cards: [position1, position2],
    }

    const messageIdentifiers = formatPlayerIdentifier([position1, position2])

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      icon: 'gremlin',
      uniqInformations: { swapped_cards: [position1, position2] },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

    return newGameState

  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
      return gameState
    }

    const newGameState = { ...gameState }
    const scene = []

    const [position1, position2] = selected_mark_positions
    const playerOneMark = { ...newGameState.card_positions[position1].mark }
    const playerTwoMark = { ...newGameState.card_positions[position2].mark }

    newGameState.card_positions[position1].mark = playerTwoMark
    newGameState.card_positions[position2].mark = playerOneMark

    newGameState.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

    if (currentPlayerNumber === selected_mark_positions[0] || currentPlayerNumber === selected_mark_positions[1]) {
      newGameState.players[token].card.player_mark = ''
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      swapped_marks: [selected_mark_positions[0], selected_mark_positions[1]],
    }

    const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_swapped_marks', ...messageIdentifiers],
      icon: 'gremlin',
      uniqInformations: { swapped_marks: [selected_mark_positions[0], selected_mark_positions[1]] },
    })

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

    return newGameState
  }
}
