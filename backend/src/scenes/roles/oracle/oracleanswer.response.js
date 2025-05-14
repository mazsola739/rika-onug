import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getNarrationByTitle, createAndSendSceneMessage, getPlayerNumbersByGivenConditions, swapCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const oracleanswerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
    return gamestate
  }

  let action = {}

  const oracleQuestion = gamestate.roles.oracle.question

  if (oracleQuestion === 'oracle_centerexchange') {
    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

    swapCards(gamestate, currentPlayerNumber, selected_card_positions[0], token)

    const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

    action = generateRoleAction(gamestate, token, title, {
      private_message: ['action_swapped_cards', ...messageIdentifiers, 'POINT'],
      uniqueInformation: { swapped_cards: [currentPlayerNumber, selected_card_positions[0]] }
    })
  } else if (oracleQuestion === 'oracle_viewcenter') {
    const limit = gamestate.players[token].player_history[title].selectable_card_limit.center
    const selectedCardPositions = selected_card_positions.slice(0, limit)
    const selectedCards = getCardIdsByPositions(gamestate.positions.card_positions, selectedCardPositions)

    gamestate.players[token].card_or_mark_action = true

    const messageIdentifiers = formatPlayerIdentifier(selectedCardPositions)
    const message = ['action_saw_card', ...messageIdentifiers]

    action = generateRoleAction(gamestate, token, title, {
      private_message: message,
      showCards: selectedCards
    })
  }

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
