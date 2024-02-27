//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection, isValidMarkSelection } from '../validate-response-data'

const createGremlin = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'gremlin_kickoff2_text']

export const gremlin = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createGremlin(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 33 || (newGameState.players[token].card.player_role_id === 33 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 33 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = gremlin_interaction(newGameState, token, title)
    }

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
    private_message: ["interaction_must_two_any"],
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
    const playerOneCard = { ...newGameState.card_positions[position1] }
    const playerTwoCard = { ...newGameState.card_positions[position2] }

    newGameState.card_positions[position1] = playerTwoCard
    newGameState.card_positions[position2] = playerOneCard

    newGameState.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

    if (currentPlayerNumber[0] === selected_card_positions[0] || currentPlayerNumber[0] === selected_card_positions[1]) {
      newGameState.players[token].card.player_card_id = 0
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      swapped_cards: [position1, position2],
    }

    const interaction = generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_swapped_cards', position1, position2],
      icon: 'swap',
      uniqInformations: { swapped_cards: [position1, position2] },
    })

    scene.push({
      type: SCENE,
      title,
      token,
      interaction,
    })
    newGameState.scene = scene

    return newGameState

  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
      return gameState
    }

    console.log("mark")

    const newGameState = { ...gameState }
    const scene = []

    const viewMarks = getMarksByPositions(newGameState.card_positions, [selected_mark_positions[0]])
    const selectedPositionMark = newGameState.card_positions[selected_mark_positions[0]].mark
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

    if (currentPlayerNumber[0] === selected_mark_positions[0]) {
      newGameState.players[token].card.player_mark = selectedPositionMark
    }

    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      viewed_marks: [selected_mark_positions[0]],
    }

    let interaction = {}
    if (newGameState.players[token].player_history.viewed_cards) {
      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_saw_mark', selected_mark_positions[0]],
        icon: 'target',
        showMarks: viewMarks,
        uniqInformations: { viewed_marks: [selected_mark_positions[0]] },
      })
    } else {
      let selectableCards = newGameState.players[token].player_history.selectable_cards
      const indexToRemove = selectableCards.indexOf(selected_mark_positions[0])
      if (indexToRemove !== -1) {
        selectableCards.splice(indexToRemove, 1)
      }

      newGameState.players[token].player_history.selectable_cards = selectableCards
      newGameState.players[token].player_history.selectable_card_limit = { player: 1, center: 0 }

      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_saw_mark', selected_mark_positions[0], "interaction_must_one_any"],
        icon: 'target',
        showMarks: viewMarks,
        selectableCards: { selectable_cards: selectableCards, selectable_card_limit: { player: 1, center: 0 } },
        uniqInformations: { viewed_marks: [selected_mark_positions[0]] },
      })
    }

    scene.push({
      type: SCENE,
      title,
      token,
      interaction,
    })
    newGameState.scene = scene

    return newGameState
  }
}
