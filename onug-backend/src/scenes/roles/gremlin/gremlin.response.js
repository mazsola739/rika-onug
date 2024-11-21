import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection, validateMarkSelection } from '../../validators'

export const gremlinResponse = (gamestate, token, selected_card_positions, selected_mark_positions, title) => {
  const narration = getNarrationByTitle(title, gamestate.narration)

  if (selected_card_positions && selected_card_positions.length > 0) {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const [position1, position2] = selected_card_positions
    const playerOneCard = { ...gamestate.card_positions[position1].card }
    const playerTwoCard = { ...gamestate.card_positions[position2].card }

    gamestate.card_positions[position1].card = playerTwoCard
    gamestate.card_positions[position2].card = playerOneCard

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
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const [position1, position2] = selected_mark_positions
    const playerOneMark = gamestate.card_positions[position1].mark
    const playerTwoMark = gamestate.card_positions[position2].mark

    gamestate.card_positions[position1].mark = playerTwoMark
    gamestate.card_positions[position2].mark = playerOneMark

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
      private_message: ['interaction_swapped_marks', ...messageIdentifiers],
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
