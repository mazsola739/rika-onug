import { getNarrationByTitle, getPlayerNumbersByGivenConditions, generateRoleAction, createAndSendSceneMessage, formatPlayerIdentifier, swapCards, swapMarks } from '../../sceneUtils'
import { validateAnswerSelection, validateCardSelection, validateMarkSelection } from '../../validators'

export const gremlinResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  if (selected_answer && selected_answer.length > 0) {
    if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const selectable_marks = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
    const selectable_mark_limit = { mark: 2 }
    const selectable_cards = getPlayerNumbersByGivenConditions(gamestate, 'allPlayersWithoutShield', token)
    const selectable_card_limit = { player: 2, center: 0 }

    //TODO const isTwoSelectable = selectablePlayerNumbers.length === 2,
    //TODO if no marks only cards

    if (selected_answer === 'cards') {
      const action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_must_two_any'],
        selectableCards: { selectable_cards, selectable_card_limit },
        uniqueInformation: { selected_answer },
        obligatory: true
      })

      createAndSendSceneMessage(gamestate, token, title, action, narration)

      return gamestate
    } else if (selected_answer === 'marks') {
      const action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_must_two_any'],
        selectableMarks: { selectable_marks, selectable_mark_limit },
        uniqueInformation: { selected_answer },
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

    swapCards(gamestate, position1, position2, token)

    const messageIdentifiers = formatPlayerIdentifier([position1, position2])

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { swapped_cards: [position1, position2], selected_card_positions },
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    swapMarks(gamestate, token, selected_mark_positions[0], selected_mark_positions[1], false)

    const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_swapped_marks', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { swapped_marks: [selected_mark_positions[0], selected_mark_positions[1]], selected_mark_positions },
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
