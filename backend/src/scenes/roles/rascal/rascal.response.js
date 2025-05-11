import { moveCardsButYourOwn, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage, formatPlayerIdentifier, getPlayerNumbersByGivenConditions, swapCards, sawCards } from '../../sceneUtils'
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

    let action

    switch (gamestate.players[token].player_history[title].random) {
      case 'troublemaker': {
        const [position1, position2] = selected_card_positions.slice(0, 2)

        swapCards(gamestate, position1, position2, token)

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
          const showCards = sawCards(gamestate, [selected_card_positions[0]], token)

          const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
          const selectable_card_limit = { player: 1, center: 0 }

          const uniqueInformation = { selected_card: selected_card_positions[0], witch_answer: true }

          action = generateRoleAction(gamestate, token, title, {
            private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_must_one_any'],
            selectableCards: { selectable_cards, selectable_card_limit },
            uniqueInformation,
            showCards
          })
        } else if (gamestate.players[token].player_history[title].witch_answer) {
          swapCards(gamestate, gamestate.players[token].player_history[title].selected_card, selected_card_positions[0], token)

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
        swapCards(gamestate, currentPlayerNumber, selected_card_positions[0], token)

        if (gamestate.players[token].player_history[title].random !== 'drunk') {
          gamestate.players[token].card.player_card_id = gamestate.positions.card_positions[currentPlayerNumber].card.id
          gamestate.players[token].card.player_team = gamestate.positions.card_positions[currentPlayerNumber].card.team
        } 

        const showCards = sawCards(gamestate, [currentPlayerNumber], token)

        const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

        action = generateRoleAction(gamestate, token, title, {
          private_message: ['action_swapped_cards', ...messageIdentifiers, gamestate.players[token].player_history[title].random === 'robber' ? 'action_own_card' : ''],
          showCards: gamestate.players[token].player_history[title].random === 'robber' ? showCards : undefined,
          uniqueInformation: { swapped_cards: [currentPlayerNumber, selected_card_positions[0]] },
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
