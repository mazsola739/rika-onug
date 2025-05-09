import {
  getNarrationByTitle,
  getAllPlayerTokens,
  getPlayerNumbersWithMatchingTokens,
  getSelectablePlayersWithNoShield,
  generateRoleAction,
  createAndSendSceneMessage,
  getPlayerNumberWithMatchingToken,
  formatPlayerIdentifier
} from '../../sceneUtils'
import { validateAnswerSelection, validateCardSelection, validateMarkSelection } from '../../validators'

export const gremlinResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  if (selected_answer && selected_answer.length > 0) {
    if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const allPlayerTokens = getAllPlayerTokens(gamestate.players)
    const selectable_marks = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
    const selectable_mark_limit = { mark: 2 }
    const selectable_cards = getSelectablePlayersWithNoShield(selectable_marks, gamestate.positions.shielded_cards)
    const selectable_card_limit = { player: 2, center: 0 }

    //TODO const isTwoSelectable = selectablePlayerNumbers.length === 2,
    //TODO if no marks only cards

    if (selected_answer === 'cards') {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_cards,
        selectable_card_limit,
        obligatory: true
      }

      const action = generateRoleAction(gamestate, token, {
        private_message: ['action_must_two_any'],
        selectableCards: { selectable_cards, selectable_card_limit },
        obligatory: true
      })

      createAndSendSceneMessage(gamestate, token, title, action, narration)

      return gamestate
    } else if (selected_answer === 'marks') {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        selectable_marks,
        selectable_mark_limit,
        obligatory: true
      }

      const action = generateRoleAction(gamestate, token, {
        private_message: ['action_must_two_any'],
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

    const [position1, position2] = selected_card_positions
    const playerOneCard = { ...gamestate.positions.card_positions[position1].card }
    const playerTwoCard = { ...gamestate.positions.card_positions[position2].card }

    gamestate.positions.card_positions[position1].card = playerTwoCard
    gamestate.positions.card_positions[position2].card = playerOneCard

    gamestate.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    if (currentPlayerNumber === selected_card_positions[0] || currentPlayerNumber === selected_card_positions[1]) {
      gamestate.players[token].card.player_card_id = 87
    }

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      swapped_cards: [position1, position2],
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier([position1, position2])

    const action = generateRoleAction(gamestate, token, {
      private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const [position1, position2] = selected_mark_positions
    const playerOneMark = gamestate.positions.card_positions[position1].mark
    const playerTwoMark = gamestate.positions.card_positions[position2].mark

    gamestate.positions.card_positions[position1].mark = playerTwoMark
    gamestate.positions.card_positions[position2].mark = playerOneMark

    gamestate.players[token].card_or_mark_action = true

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    if (currentPlayerNumber === selected_mark_positions[0] || currentPlayerNumber === selected_mark_positions[1]) {
      gamestate.players[token].card.player_mark = ''
    }

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      swapped_marks: [selected_mark_positions[0], selected_mark_positions[1]],
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

    const action = generateRoleAction(gamestate, token, {
      private_message: ['action_swapped_marks', ...messageIdentifiers, 'POINT'],
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
