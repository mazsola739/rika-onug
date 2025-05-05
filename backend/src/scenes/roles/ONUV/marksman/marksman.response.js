import {
  getNarrationByTitle,
  getAllPlayerTokens,
  getPlayerNumbersWithMatchingTokens,
  getSelectablePlayersWithNoShield,
  generateRoleAction,
  createAndSendSceneMessage,
  getCardIdsByPositions,
  getPlayerNumberWithMatchingToken,
  formatPlayerIdentifier,
  getMarksByPositions
} from '../../../sceneUtils'
import { validateAnswerSelection, validateCardSelection, validateMarkSelection } from '../../../validators'

export const marksmanResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  //TODO if no marks only cards
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.positions.shielded_cards)

  if (selected_answer && selected_answer.length > 0) {
    if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    if (selected_answer === 'cards') {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_cards: selectablePlayersWithNoShield,
        selectable_card_limit: { player: 1, center: 0 },
        obligatory: true
      }

      const action = generateRoleAction(gamestate, token, {
        private_message: ['action_must_one_any'],
        selectableCards: {
          selectable_cards: selectablePlayersWithNoShield,
          selectable_card_limit: { player: 1, center: 0 }
        },
        obligatory: true
      })

      createAndSendSceneMessage(gamestate, token, title, action, narration)

      return gamestate
    } else if (selected_answer === 'marks') {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_marks: selectablePlayerNumbers,
        selectable_mark_limit: { mark: 1 },
        obligatory: true
      }

      const action = generateRoleAction(gamestate, token, {
        private_message: ['action_must_one_any'],
        selectableMarks: {
          selectable_marks: selectablePlayerNumbers,
          selectable_mark_limit: { mark: 1 }
        },
        obligatory: true
      })

      createAndSendSceneMessage(gamestate, token, title, action, narration)

      return gamestate
    }
  } else if (selected_card_positions && selected_card_positions.length > 0) {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const viewCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = gamestate.positions.card_positions[selected_card_positions[0]].card
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    if (gamestate.players[token].card.player_original_id === selectedPositionCard.id && currentPlayerNumber !== selected_card_positions[0]) {
      gamestate.players[token].card.player_card_id = 87
    }
    if (currentPlayerNumber === selected_card_positions[0]) {
      gamestate.players[token].card.player_card_id = selectedPositionCard.id
      gamestate.players[token].card.player_team = selectedPositionCard.team
    }

    gamestate.players[token].card_or_mark_action = true

    let action = {}

    if (gamestate.players[token].player_history[title].viewed_marks) {
      action = generateRoleAction(gamestate, token, {
        private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
        showCards: viewCards,
        scene_end: true
      })
    } else {
      let selectableMarks = selectablePlayerNumbers
      const indexToRemove = selectableMarks.indexOf(selected_card_positions[0])
      if (indexToRemove !== -1) {
        selectableMarks.splice(indexToRemove, 1)
      }

      gamestate.players[token].player_history[title].selectable_marks = selectableMarks
      gamestate.players[token].player_history[title].selectable_mark_limit = { mark: 1 }

      action = generateRoleAction(gamestate, token, {
        private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_must_one_any'],
        showCards: viewCards,
        selectableMarks: {
          selectable_marks: selectableMarks,
          selectable_mark_limit: { mark: 1 }
        },
        obligatory: true
      })
    }

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_cards: [selected_card_positions[0]]
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const viewMarks = getMarksByPositions(gamestate.positions.card_positions, [selected_mark_positions[0]])
    const selectedPositionMark = gamestate.positions.card_positions[selected_mark_positions[0]].mark
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    if (currentPlayerNumber === selected_mark_positions[0]) {
      gamestate.players[token].card.player_mark = selectedPositionMark
    }

    gamestate.players[token].card_or_mark_action = true

    let action = {}

    if (gamestate.players[token].player_history[title].viewed_cards) {
      action = generateRoleAction(gamestate, token, {
        private_message: ['action_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0]],
        showMarks: viewMarks,
        scene_end: true
      })
    } else {
      let selectableCards = selectablePlayersWithNoShield
      const indexToRemove = selectableCards.indexOf(selected_mark_positions[0])
      if (indexToRemove !== -1) {
        selectableCards.splice(indexToRemove, 1)
      }

      gamestate.players[token].player_history[title].selectable_cards = selectableCards
      gamestate.players[token].player_history[title].selectable_card_limit = { player: 1, center: 0 }

      action = generateRoleAction(gamestate, token, {
        private_message: ['action_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0], 'action_must_one_any'],
        showMarks: viewMarks,
        selectableCards: {
          selectable_cards: selectableCards,
          selectable_card_limit: { player: 1, center: 0 }
        },
        obligatory: true
      })
    }

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_marks: [selected_mark_positions[0]]
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
