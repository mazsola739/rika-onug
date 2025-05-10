import { getNarrationByTitle, getCardIdsByPositions, getPlayerNumbersByGivenConditions, generateRoleAction, formatPlayerIdentifier, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const witchResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  if (selected_card_positions[0].includes('center_')) {
    const showCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0]])
    const selectedCenterCardPosition = gamestate.positions.card_positions[selected_card_positions[0]].card

    if (gamestate.players[token].card.player_original_id === selectedCenterCardPosition.id) {
      gamestate.players[token].card.player_card_id = 87
    }

    const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
    const selectable_card_limit = { player: 1, center: 0 }

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'action_must_one_any'],
      selectableCards: { selectable_cards, selectable_card_limit },
      uniqueInformation: { viewed_cards: [selected_card_positions[0]], selected_center_card: selected_card_positions[0] },
      showCards,
      obligatory: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_card_positions[0].includes('player_')) {
    const selectedCenterPositionCard = gamestate.positions.card_positions[gamestate.players[token].player_history[title].selected_center_card].card
    const selectedPlayerPositionCard = gamestate.positions.card_positions[selected_card_positions[0]].card

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const specialVillagerIds = [30, 1, 29, 28, 64]
    if (specialVillagerIds.includes(selectedCenterCard.id)) {
      selectedCenterCard.role = 'VILLAGER'
      selectedCenterCard.team = 'village'
    }

    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    gamestate.positions.card_positions[gamestate.players[token].player_history[title].selected_center_card].card = selectedPlayerCard
    gamestate.positions.card_positions[selected_card_positions[0]].card = selectedCenterCard

    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

    if (selected_card_positions[0] === currentPlayerNumber) {
      const currentCard = gamestate.positions.card_positions[currentPlayerNumber].card
      gamestate.players[token].card.player_card_id = currentCard.id
      gamestate.players[token].card.player_team = currentCard.team
    }

    const messageIdentifiers = formatPlayerIdentifier([`${gamestate.players[token].player_history[title].selected_center_card}`, selected_card_positions[0]])

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { swapped_cards: [gamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]] },
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
