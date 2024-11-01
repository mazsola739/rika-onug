import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleInteraction, getAllPlayerTokens, getCardIdsByPositions, getNarrationByTitle, getPlayerNumbersWithMatchingTokens, getPlayerNumberWithMatchingToken, getSelectablePlayersWithNoShield } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const witchResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const narration = getNarrationByTitle(title, newGamestate.narration)

  if (selected_card_positions[0].includes('center_')) {
    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedCenterCardPosition = newGamestate.card_positions[selected_card_positions[0]].card

    if (newGamestate.players[token].card.player_original_id === selectedCenterCardPosition.id) {
      newGamestate.players[token].card.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

    

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
      viewed_cards: [selected_card_positions[0]],
      selected_center_card: selected_card_positions[0],
    }

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
      selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 1, center: 0 } },
      showCards,
    })

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

    return newGamestate

  } else if (selected_card_positions[0].includes('player_')) {
    const selectedCenterPositionCard = newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_center_card].card
    const selectedPlayerPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_center_card].card = selectedPlayerCard
    newGamestate.card_positions[selected_card_positions[0]].card = selectedCenterCard

    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    if (selected_card_positions[0] === currentPlayerNumber[0]) {
      const currentCard = newGamestate.card_positions[currentPlayerNumber[0]].card
      newGamestate.players[token].card.player_card_id = currentCard.id
      newGamestate.players[token].card.player_team = currentCard.team
    }

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      swapped_cards: [newGamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]],
    }

    const messageIdentifiers = formatPlayerIdentifier([`${newGamestate.players[token].player_history[title].selected_center_card}`, selected_card_positions[0]])

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    })

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

    return newGamestate
  }
}
