import {
  formatPlayerIdentifier,
  generateRoleInteraction,
  getAllPlayerTokens,
  getCardIdsByPositions,
  getNarrationByTitle,
  getPlayerNumbersWithMatchingTokens,
  getPlayerNumberWithMatchingToken,
  getSelectablePlayersWithNoShield
} from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const witchResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const narration = getNarrationByTitle(title, gamestate.narration)

  if (selected_card_positions[0].includes('center_')) {
    const showCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])
    const selectedCenterCardPosition = gamestate.card_positions[selected_card_positions[0]].card

    if (gamestate.players[token].card.player_original_id === selectedCenterCardPosition.id) {
      gamestate.players[token].card.player_card_id = 87
    }

    const allPlayerTokens = getAllPlayerTokens(gamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shield)

    //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
      viewed_cards: [selected_card_positions[0]],
      selected_center_card: selected_card_positions[0],
      obligatory: true
    }

    const interaction = generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
      selectableCards: {
        selectable_cards: selectablePlayersWithNoShield,
        selectable_card_limit: { player: 1, center: 0 }
      },
      showCards,
      obligatory: true
    })

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)

    return gamestate
  } else if (selected_card_positions[0].includes('player_')) {
    const selectedCenterPositionCard = gamestate.card_positions[gamestate.players[token].player_history[title].selected_center_card].card
    const selectedPlayerPositionCard = gamestate.card_positions[selected_card_positions[0]].card

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const specialVillagerIds = [30, 1, 29, 28, 64]
    if (specialVillagerIds.includes(selectedCenterCard.id)) {
      selectedCenterCard.role = 'VILLAGER'
      selectedCenterCard.team = 'village'
    }

    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    gamestate.card_positions[gamestate.players[token].player_history[title].selected_center_card].card = selectedPlayerCard
    gamestate.card_positions[selected_card_positions[0]].card = selectedCenterCard

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    if (selected_card_positions[0] === currentPlayerNumber[0]) {
      const currentCard = gamestate.card_positions[currentPlayerNumber[0]].card
      gamestate.players[token].card.player_card_id = currentCard.id
      gamestate.players[token].card.player_team = currentCard.team
    }

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      swapped_cards: [gamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]],
      scene_end: true
    }

    const messageIdentifiers = formatPlayerIdentifier([`${gamestate.players[token].player_history[title].selected_center_card}`, selected_card_positions[0]])

    const interaction = generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)

    return gamestate
  }
}
