import { SCENE } from '../../../constants'
import { getCardIdsByPositions, getPlayerNumberWithMatchingToken, generateRoleInteraction, formatPlayerIdentifier, getMarksByPositions } from '../../sceneUtils'
import { validateCardSelection, validateMarkSelection } from '../../validators'

export const marksmanResponse = (gamestate, token, selected_card_positions = [], selected_mark_positions = [], title) => {
  if (selected_card_positions && selected_card_positions.length > 0) {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
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
        showCards: viewCards,
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
        showCards: viewCards,
        selectableMarks: { selectable_marks: selectableMarks, selectable_mark_limit: { mark: 1 } },
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
    if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
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
        showMarks: viewMarks,
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
        showMarks: viewMarks,
        selectableCards: { selectable_cards: selectableCards, selectable_card_limit: { player: 1, center: 0 } },
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
