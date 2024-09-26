import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, getPlayerNumberWithMatchingToken, formatPlayerIdentifier, getMarksByPositions } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection, isValidMarkSelection } from '../validate-response-data'

export const marksman = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_marksman_kickoff_text'
      : 'marksman_kickoff_text',
    'marksman_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 35 || (card.player_role_id === 35 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = marksman_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const marksman_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any'],
    icon: 'target',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    selectableCards: { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const marksman_response = (gamestate, token, selected_card_positions = [], selected_mark_positions = [], title) => {
  if (selected_card_positions && selected_card_positions.length > 0) {
    if (!isValidCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const newGamestate = { ...gamestate }
    const scene = []

    const viewCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id && currentPlayerNumber !== selected_card_positions[0]) {
      newGamestate.players[token].card.player_card_id = 0
    }
    if (currentPlayerNumber === selected_card_positions[0]) {
      newGamestate.players[token].card.player_card_id = selectedPositionCard.id
      newGamestate.players[token].card.player_team = selectedPositionCard.team
    }

    newGamestate.players[token].card_or_mark_action = true

    let interaction = {}

    if (newGamestate.players[token].player_history[title].viewed_marks) { 
      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
        icon: 'target',
        showCards: viewCards,
        uniqueInformations: { target: [selected_card_positions[0]] },
      })
    } else {
      let selectableMarks = newGamestate.players[token].player_history[title].selectable_marks
      const indexToRemove = selectableMarks.indexOf(selected_card_positions[0])
      if (indexToRemove !== -1) {
        selectableMarks.splice(indexToRemove, 1)
      }

      newGamestate.players[token].player_history[title].selectable_marks = selectableMarks
      newGamestate.players[token].player_history[title].selectable_mark_limit = { mark: 1 }


      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
        icon: 'target',
        showCards: viewCards,
        selectableMarks: { selectable_marks: selectableMarks, selectable_mark_limit: { mark: 1 } },
        uniqueInformations: { target: [selected_card_positions[0]] },
      })
    }

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: [selected_mark_positions[0]],
    }

    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene

    return newGamestate

  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!isValidMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const newGamestate = { ...gamestate }
    const scene = []

    const viewMarks = getMarksByPositions(newGamestate.card_positions, [selected_mark_positions[0]])
    const selectedPositionMark = newGamestate.card_positions[selected_mark_positions[0]].mark
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    if (currentPlayerNumber === selected_mark_positions[0]) {
      newGamestate.players[token].card.player_mark = selectedPositionMark
    }

    newGamestate.players[token].card_or_mark_action = true

    let interaction = {}

    if (newGamestate.players[token].player_history[title].viewed_cards) {
      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0]],
        icon: 'target',
        showMarks: viewMarks,
        uniqueInformations: { target: [selected_mark_positions[0]] },
      })
    } else {
      let selectableCards = newGamestate.players[token].player_history[title].selectable_cards
      const indexToRemove = selectableCards.indexOf(selected_mark_positions[0])
      if (indexToRemove !== -1) {
        selectableCards.splice(indexToRemove, 1)
      }

      newGamestate.players[token].player_history[title].selectable_cards = selectableCards
      newGamestate.players[token].player_history[title].selectable_card_limit = { player: 1, center: 0 }

      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0], 'interaction_must_one_any'],
        icon: 'target',
        showMarks: viewMarks,
        selectableCards: { selectable_cards: selectableCards, selectable_card_limit: { player: 1, center: 0 } },
        uniqueInformations: { target: [selected_mark_positions[0]] },
      })
    }

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_marks: [selected_mark_positions[0]],
    }

    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene

    return newGamestate
  }
}
