//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, getPlayerNumberWithMatchingToken, formatPlayerIdentifier, getMarksByPositions } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection, isValidMarkSelection } from '../validate-response-data'

export const marksman = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_marksman_kickoff_text'
      : 'marksman_kickoff_text',
    'marksman_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 35 || (card.player_role_id === 35 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = marksman_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const marksman_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_any'],
    icon: 'target',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const marksman_response = (gameState, token, selected_card_positions = [], selected_mark_positions = [], title) => {
  if (selected_card_positions && selected_card_positions.length > 0) {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
      return gameState
    }

    const newGameState = { ...gameState }
    const scene = []

    const viewCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

    if (newGameState.players[token].card.player_original_id === selectedPositionCard.id && currentPlayerNumber !== selected_card_positions[0]) {
      newGameState.players[token].card.player_card_id = 0
    }
    if (currentPlayerNumber === selected_card_positions[0]) {
      newGameState.players[token].card.player_card_id = selectedPositionCard.id
      newGameState.players[token].card.player_team = selectedPositionCard.team
    }

    newGameState.players[token].card_or_mark_action = true

    let interaction = {}

    if (newGameState.players[token].player_history.viewed_marks) { 
      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
        icon: 'target',
        showCards: viewCards,
        uniqueInformations: { target: [selected_card_positions[0]] },
      })
    } else {
      let selectableMarks = newGameState.players[token].player_history.selectable_marks
      const indexToRemove = selectableMarks.indexOf(selected_card_positions[0])
      if (indexToRemove !== -1) {
        selectableMarks.splice(indexToRemove, 1)
      }

      newGameState.players[token].player_history.selectable_marks = selectableMarks
      newGameState.players[token].player_history.selectable_mark_limit = { mark: 1 }


      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
        icon: 'target',
        showCards: viewCards,
        selectableMarks: { selectable_marks: selectableMarks, selectable_mark_limit: { mark: 1 } },
        uniqueInformations: { target: [selected_card_positions[0]] },
      })
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      viewed_cards: [selected_mark_positions[0]],
    }

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

    return newGameState

  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
      return gameState
    }

    const newGameState = { ...gameState }
    const scene = []

    const viewMarks = getMarksByPositions(newGameState.card_positions, [selected_mark_positions[0]])
    const selectedPositionMark = newGameState.card_positions[selected_mark_positions[0]].mark
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

    if (currentPlayerNumber === selected_mark_positions[0]) {
      newGameState.players[token].card.player_mark = selectedPositionMark
    }

    newGameState.players[token].card_or_mark_action = true

    let interaction = {}

    if (newGameState.players[token].player_history.viewed_cards) {
      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0]],
        icon: 'target',
        showMarks: viewMarks,
        uniqueInformations: { target: [selected_mark_positions[0]] },
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
        private_message: ['interaction_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0], 'interaction_must_one_any'],
        icon: 'target',
        showMarks: viewMarks,
        selectableCards: { selectable_cards: selectableCards, selectable_card_limit: { player: 1, center: 0 } },
        uniqueInformations: { target: [selected_mark_positions[0]] },
      })
    }

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      viewed_marks: [selected_mark_positions[0]],
    }

    scene.push({ type: SCENE, title, token, interaction })
    newGameState.scene = scene

    return newGameState
  }
}
