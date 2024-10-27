import { CENTER_CARD_POSITIONS } from '../../../constants'
import { getPlayerNumberWithMatchingToken, formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPlayerNumbers } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const rascalResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }

  let interaction

  switch (newGamestate.players[token].player_history[title].random) {
    case 'troublemaker':
      { const [position1, position2] = selected_card_positions.slice(0, 2)

      const playerOneCard = { ...newGamestate.card_positions[position1].card }
      const playerTwoCard = { ...newGamestate.card_positions[position2].card }

      newGamestate.card_positions[position1].card = playerTwoCard
      newGamestate.card_positions[position2].card = playerOneCard

      newGamestate.players[token].card_or_mark_action = true

      if (currentPlayerNumber === position1 || currentPlayerNumber === position2) {
        newGamestate.players[token].card.player_card_id = 0
      }

      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_cards: [position1, position2],
      }

      const messageIdentifiers = formatPlayerIdentifier([position1, position2])

      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      })

      break }

    case 'witch':
      if (!newGamestate.players[token].player_history[title].witch_answer) {
        const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
        const selectedCardPosition = newGamestate.card_positions[selected_card_positions[0]].card

        if (newGamestate.players[token].card.player_original_id === selectedCardPosition.id) {
          newGamestate.players[token].card.player_card_id = 0
        }

        const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
        const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
        const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

        newGamestate.players[token].player_history[title] = {
          ...newGamestate.players[token].player_history[title],
          selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
          viewed_cards: [selected_card_positions[0]], selected_card: selected_card_positions[0],
          witch_answer: true,
        }

        interaction = generateRoleInteraction(newGamestate, token, {
          private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
          selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 1, center: 0 } },
          showCards,
        })

      } else if (newGamestate.players[token].player_history[title].witch_answer) {
        const firstSelectedPositionCard = newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_card].card
        const secondSelectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

        const selectedCenterCard = { ...firstSelectedPositionCard }
        const selectedPlayerCard = { ...secondSelectedPositionCard }
        newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_card].card = selectedPlayerCard
        newGamestate.card_positions[selected_card_positions[0]].card = selectedCenterCard

        if (selected_card_positions[0] === currentPlayerNumber[0]) {
          const currentCard = newGamestate.card_positions[currentPlayerNumber[0]].card
          newGamestate.players[token].card.player_card_id = currentCard.id
          newGamestate.players[token].card.player_team = currentCard.team
        }

        newGamestate.players[token].player_history[title] = {
          ...newGamestate.players[token].player_history[title],
          swapped_cards: [newGamestate.players[token].player_history[title].selected_card, selected_card_positions[0]],
        }

        const messageIdentifiers = formatPlayerIdentifier([`${newGamestate.players[token].player_history[title].selected_card}`, selected_card_positions[0]])

        interaction = generateRoleInteraction(newGamestate, token, {
          private_message: ['interaction_swapped_cards', ...messageIdentifiers],
        })

      }
      break

    case 'drunk':
    case 'robber':
      { const selectedPosition = selected_card_positions[0]
      const selectedCard = { ...newGamestate.card_positions[selectedPosition].card }

      newGamestate.card_positions[currentPlayerNumber].card = selectedCard
      newGamestate.card_positions[selectedPosition].card = currentPlayerCard

      if (newGamestate.players[token].player_history[title].random === 'drunk') {
        newGamestate.players[token].card.player_card_id = 0
      } else {
        newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
        newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
      }

      const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [currentPlayerNumber])

      newGamestate.players[token].card_or_mark_action = true

      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_cards: [currentPlayerNumber, selectedPosition],
        viewed_cards: [currentPlayerNumber],
      }

      const messageIds = formatPlayerIdentifier([currentPlayerNumber, selectedPosition])

      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_cards', ...messageIds, newGamestate.players[token].player_history[title].random === 'robber' ? 'interaction_own_card' : ''],
        showCards: newGamestate.players[token].player_history[title].random === 'robber' ? showCards : undefined,
      })

      break }
  }


  scene.push({ [token]: { interaction } })
  newGamestate.scene[title] = scene

  return newGamestate
}
