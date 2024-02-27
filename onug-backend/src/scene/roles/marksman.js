//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getCardIdsByPositions, getMarksByPositions, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection, isValidMarkSelection } from '../validate-response-data'

export const marksman = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_marksman_kickoff_text'
      : 'marksman_kickoff_text',
    'marksman_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 35 || (newGameState.players[token].card.player_role_id === 35 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 35 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = marksman_interaction(newGameState, token, title)
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
    private_message: ["interaction_must_one_any"],
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
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

    if (newGameState.players[token].card.player_original_id === selectedPositionCard.id && currentPlayerNumber[0] !== selected_card_positions[0]) {
      newGameState.players[token].card.player_card_id = 0
    }
    if (currentPlayerNumber[0] === selected_card_positions[0]) {
      newGameState.players[token].card.player_card_id = selectedPositionCard.id
      newGameState.players[token].card.player_team = selectedPositionCard.team
    }

    newGameState.players[token].card_or_mark_action = true

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      card_or_mark_action: true,
      viewed_cards: [selected_mark_positions[0]],
    }

    let interaction = {}
    if (newGameState.players[token].player_history.viewed_marks) {
      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_saw_card', selected_card_positions[0]],
        icon: 'target',
        showCards: viewCards,
        uniqInformations: { viewed_cards: [selected_card_positions[0]] },
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
        private_message: ['interaction_saw_card', selected_card_positions[0], "interaction_must_one_any"],
        icon: 'target',
        showCards: viewCards,
        selectableMarks: { selectable_marks: selectableMarks, selectable_mark_limit: { mark: 1 } },
        uniqInformations: { viewed_cards: [selected_card_positions[0]] },
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

  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
      return gameState
    }

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
