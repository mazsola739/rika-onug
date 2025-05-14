import { getNarrationByTitle, getPlayerNumbersByGivenConditions, generateRoleAction, createAndSendSceneMessage, formatPlayerIdentifier, sawCards } from '../../sceneUtils'
import { sawMarks } from '../../sceneUtils/sawMarks'
import { validateAnswerSelection, validateCardSelection, validateMarkSelection } from '../../validators'

export const marksmanResponse = (gamestate, token, selected_card_positions, selected_mark_positions, selected_answer, title) => {
  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  //TODO if no marks only cards
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
  const selectable_mark_limit = { mark: 1 }
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate, 'allPlayersWithoutShield', token)
  const selectable_card_limit = { player: 1, center: 0 }

  if (selected_answer && selected_answer.length > 0) {
    if (!validateAnswerSelection(gamestate, token, selected_answer, title)) {
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
    if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
      return gamestate
    }

    const showCards = sawCards(gamestate, [selected_card_positions[0]], token)

    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

    if (currentPlayerNumber === selected_card_positions[0]) {
      gamestate.players[token].card.player_card_id = gamestate.positions.card_positions[selected_card_positions[0]].card.id
      gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[0]].card.team
    }

    let action = {}

    const itViewedMarks = gamestate.players[token].player_history[title].show_marks

    if (itViewedMarks) {
      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]])],
        showCards,
        scene_end: true
      })
    } else {
      const indexToRemove = selectable_marks.indexOf(selected_card_positions[0])
      if (indexToRemove !== -1) {
        selectable_marks.splice(indexToRemove, 1)
      }

      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]]), 'action_must_one_any'],
        showCards: showCards,
        selectableMarks: { selectable_marks, selectable_mark_limit },
        obligatory: true
      })
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_mark_positions && selected_mark_positions.length > 0) {
    if (!validateMarkSelection(gamestate, token, selected_mark_positions, title)) {
      return gamestate
    }

    const showMarks = sawMarks(gamestate, [selected_mark_positions[0]], token)

    let action = {}

    const itViewedCards = gamestate.players[token].player_history[title].show_cards

    if (itViewedCards) {
      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_mark', ...formatPlayerIdentifier([selected_mark_positions[0]])],
        showMarks,
        scene_end: true
      })
    } else {
      const indexToRemove = selectable_cards.indexOf(selected_mark_positions[0])
      if (indexToRemove !== -1) {
        selectable_cards.splice(indexToRemove, 1)
      }

      action = generateRoleAction(gamestate, token, title, {
        private_message: ['action_saw_mark', ...formatPlayerIdentifier([selected_mark_positions[0]]), 'action_must_one_any'],
        showMarks,
        selectableCards: { selectable_cards, selectable_card_limit },
        obligatory: true
      })
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
