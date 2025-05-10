import {
  moveCardsButYourOwn,
  generateRoleAction,
  getNarrationByTitle,
  createAndSendSceneMessage,
  formatPlayerIdentifier,
  getCardIdsByPositions,
  getPlayerNumbersByGivenConditions
} from '../../sceneUtils'
import { validateAnswerSelection, validateCardSelection } from '../../validators'

//TODO fix obligatory and scene end
export const rascalResponse = (gamestate, token, selected_card_positions, selected_answer, title) => {
  if (selected_answer && selected_answer.length > 0) {
    if (!validateAnswerSelection(selected_answer, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)
    const updatedPlayerCards = moveCardsButYourOwn(gamestate.positions.card_positions, selected_answer, currentPlayerNumber)

    gamestate.players[token].card_or_mark_action = true

    gamestate.positions.card_positions = {
      ...gamestate.positions.card_positions,
      ...updatedPlayerCards
    }

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_moved', selected_answer === 'left' ? 'direction_left' : 'direction_right'],
      uniqueInformation: { direction: selected_answer },
      scene_end: true
    })

    const narration = getNarrationByTitle(title, gamestate.scenes.narration)

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_card_positions && selected_card_positions.length > 0) {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }

    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
    const currentPlayerCard = {
      ...gamestate.positions.card_positions[currentPlayerNumber].card
    }

    let action

    switch (gamestate.players[token].player_history[title].random) {
      case 'troublemaker': {
        const [position1, position2] = selected_card_positions.slice(0, 2)

        const playerOneCard = { ...gamestate.positions.card_positions[position1].card }
        const playerTwoCard = { ...gamestate.positions.card_positions[position2].card }

        gamestate.positions.card_positions[position1].card = playerTwoCard
        gamestate.positions.card_positions[position2].card = playerOneCard

        gamestate.players[token].card_or_mark_action = true

        if (currentPlayerNumber === position1 || currentPlayerNumber === position2) {
          gamestate.players[token].card.player_card_id = 87
        }

        const messageIdentifiers = formatPlayerIdentifier([position1, position2])

        action = generateRoleAction(gamestate, token, title, {
          private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
          uniqueInformation: { swapped_cards: [position1, position2] },
          scene_end: true
        })

        break
      }

      case 'witch':
        if (!gamestate.players[token].player_history[title].witch_answer) {
          const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0]])
          const selectedCardPosition = gamestate.positions.card_positions[selected_card_positions[0]].card

          if (gamestate.players[token].card.player_original_id === selectedCardPosition.id) {
            gamestate.players[token].card.player_card_id = 87
          }

          const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
          const selectable_card_limit = { player: 1, center: 0 }

          const uniqueInformation = { viewed_cards: [selected_card_positions[0]], selected_card: selected_card_positions[0], witch_answer: true }

          action = generateRoleAction(gamestate, token, title, {
            private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_must_one_any'],
            selectableCards: { selectable_cards, selectable_card_limit },
            uniqueInformation,
            showCards
          })
        } else if (gamestate.players[token].player_history[title].witch_answer) {
          const firstSelectedPositionCard = gamestate.positions.card_positions[gamestate.players[token].player_history[title].selected_card].card
          const secondSelectedPositionCard = gamestate.positions.card_positions[selected_card_positions[0]].card

          const selectedCenterCard = { ...firstSelectedPositionCard }
          const selectedPlayerCard = { ...secondSelectedPositionCard }
          gamestate.positions.card_positions[gamestate.players[token].player_history[title].selected_card].card = selectedPlayerCard
          gamestate.positions.card_positions[selected_card_positions[0]].card = selectedCenterCard

          if (selected_card_positions[0] === currentPlayerNumber) {
            const currentCard = gamestate.positions.card_positions[currentPlayerNumber].card
            gamestate.players[token].card.player_card_id = currentCard.id
            gamestate.players[token].card.player_team = currentCard.team
          }

          const messageIdentifiers = formatPlayerIdentifier([`${gamestate.players[token].player_history[title].selected_card}`, selected_card_positions[0]])

          action = generateRoleAction(gamestate, token, title, {
            private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
            obligatory: gamestate.players[token].player_history[title].random === 'witch',
            uniqueInformation: { swapped_cards: [gamestate.players[token].player_history[title].selected_card, selected_card_positions[0]] },
            scene_end: true
          })
        }
        break

      case 'drunk':
      case 'robber': {
        const selectedPosition = selected_card_positions[0]
        const selectedCard = {
          ...gamestate.positions.card_positions[selectedPosition].card
        }

        gamestate.positions.card_positions[currentPlayerNumber].card = selectedCard
        gamestate.positions.card_positions[selectedPosition].card = currentPlayerCard

        if (gamestate.players[token].player_history[title].random === 'drunk') {
          gamestate.players[token].card.player_card_id = 87
        } else {
          gamestate.players[token].card.player_card_id = gamestate.positions.card_positions[currentPlayerNumber].card.id
          gamestate.players[token].card.player_team = gamestate.positions.card_positions[currentPlayerNumber].card.team
        }

        const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

        gamestate.players[token].card_or_mark_action = true

        const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selectedPosition])

        action = generateRoleAction(gamestate, token, title, {
          private_message: ['action_swapped_cards', ...messageIdentifiers, gamestate.players[token].player_history[title].random === 'robber' ? 'action_own_card' : ''],
          showCards: gamestate.players[token].player_history[title].random === 'robber' ? showCards : undefined,
          uniqueInformation: { swapped_cards: [currentPlayerNumber, selectedPosition], viewed_cards: [currentPlayerNumber] },
          obligatory: gamestate.players[token].player_history[title].random === 'robber'
        })

        break
      }
    }

    const narration = getNarrationByTitle(title, gamestate.scenes.narration)

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
