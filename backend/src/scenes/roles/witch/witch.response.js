import { SPECIAL_VILLAGER_IDS } from '../../../constants'
import { getNarrationByTitle, getPlayerNumbersByGivenConditions, generateRoleAction, formatPlayerIdentifier, createAndSendSceneMessage, swapCards, sawCards, updateCardRoleAndTeam } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const witchResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  if (selected_card_positions[0].includes('center_')) {
    const showCards = sawCards(gamestate, [selected_card_positions[0]], token)

    const selectable_cards = getPlayerNumbersByGivenConditions(gamestate, 'allPlayersWithoutShield', token)
    const selectable_card_limit = { player: 1, center: 0 }

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]]), 'action_must_one_any'],
      selectableCards: { selectable_cards, selectable_card_limit },
      uniqueInformation: { selected_center_card: selected_card_positions[0], selected_card_positions },
      showCards,
      obligatory: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  } else if (selected_card_positions[0].includes('player_')) {
    swapCards(gamestate, gamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0], token)

    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

    if (SPECIAL_VILLAGER_IDS.includes(gamestate.positions.card_positions[currentPlayerNumber].card.id)) {
      updateCardRoleAndTeam(gamestate, currentPlayerNumber, 'VILLAGER', 'village')
    }

    if (selected_card_positions[0] === currentPlayerNumber) {
      const currentCard = gamestate.positions.card_positions[currentPlayerNumber].card
      gamestate.players[token].card.player_card_id = currentCard.id
      gamestate.players[token].card.player_team = currentCard.team
    }

    const messageIdentifiers = formatPlayerIdentifier([`${gamestate.players[token].player_history[title].selected_center_card}`, selected_card_positions[0]])

    const action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { swapped_cards: [gamestate.players[token].player_history[title].selected_center_card, selected_card_positions[0]], selected_card_positions },
      scene_end: true
    })

    createAndSendSceneMessage(gamestate, token, title, action, narration)

    return gamestate
  }
}
