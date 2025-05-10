import {
  getNarrationByTitle,
  getPlayerNumbersByGivenConditions,
  generateRoleAction,
  createAndSendSceneMessage,
  getCardIdsByPositions,
  formatPlayerIdentifier,
  getMarksByPositions
} from '../../sceneUtils'
import { validateAnswerSelection, validateCardSelection, validateMarkSelection } from '../../validators'

//TODO selectable stuffs simlify
export const marksmanResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  //TODO if no marks only cards
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
  const selectable_mark_limit = { mark: 1 }
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
  const selectable_card_limit = { player: 1, center: 0 }

  if (selected_answer && selected_answer.length > 0) {
    if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    if (selected_answer === 'cards') {
      const action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_must_one_any'],
        selectableCards: { selectable_cards, selectable_card_limit },
        obligatory: true
      })

      createAndSendSceneMessage(gamestate, token, title, action, narration)

      return gamestate
    } else if (selected_answer === 'marks') {
      const action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_must_one_any'],
        selectableMarks: { selectable_marks, selectable_mark_limit },
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
    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

    if (gamestate.players[token].card.player_original_id === selectedPositionCard.id && currentPlayerNumber !== selected_card_positions[0]) {
      gamestate.players[token].card.player_card_id = 87
    }
    if (currentPlayerNumber === selected_card_positions[0]) {
      gamestate.players[token].card.player_card_id = selectedPositionCard.id
      gamestate.players[token].card.player_team = selectedPositionCard.team
    }

    gamestate.players[token].card_or_mark_action = true

    let action = {}

    const itViewedMarks = gamestate.players[token].player_history[title].viewed_marks

    if (itViewedMarks) {
      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
        showCards: viewCards,
        scene_end: true
      })
    } else {
      const indexToRemove = selectable_marks.indexOf(selected_card_positions[0])
      if (indexToRemove !== -1) {
        selectable_marks.splice(indexToRemove, 1)
      }

      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_must_one_any'],
        showCards: viewCards,
        uniqueInformation: { viewed_cards: [selected_card_positions[0]] },
        selectableMarks: { selectable_marks, selectable_mark_limit },
        obligatory: true
      })
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const viewMarks = getMarksByPositions(gamestate.positions.card_positions, [selected_mark_positions[0]])
    const selectedPositionMark = gamestate.positions.card_positions[selected_mark_positions[0]].mark
    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

    if (currentPlayerNumber === selected_mark_positions[0]) {
      gamestate.players[token].card.player_mark = selectedPositionMark
    }

    gamestate.players[token].card_or_mark_action = true

    let action = {}

    const itViewedCards = gamestate.players[token].player_history[title].viewed_cards

    if (itViewedCards) {
      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0]],
        showMarks: viewMarks,
        scene_end: true
      })
    } else {
      const indexToRemove = selectable_cards.indexOf(selected_mark_positions[0])
      if (indexToRemove !== -1) {
        selectable_cards.splice(indexToRemove, 1)
      }

      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_mark', formatPlayerIdentifier(selected_mark_positions)[0], 'action_must_one_any'],
        showMarks: viewMarks,
        selectableCards: { selectable_cards, selectable_card_limit },
        uniqueInformation: { viewed_marks: [selected_mark_positions[0]] },
        obligatory: true
      })
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
