import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const oracleanswerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  let action = {}

  const oracleQuestion = gamestate.oracle.question

  if (oracleQuestion === 'oracle_centerexchange_text') {
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
    const currentPlayerCard = {
      ...gamestate.card_positions[currentPlayerNumber].card
    }
    const selectedCard = {
      ...gamestate.card_positions[selected_card_positions[0]].card
    }
    gamestate.card_positions[currentPlayerNumber].card = selectedCard
    gamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard

    gamestate.players[token].card.player_card_id = 87
    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      swapped_cards: [currentPlayerNumber, selected_card_positions[0]]
    }

    const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

    action = generateRoleAction(gamestate, token, {
      private_message: ['action_swapped_cards', ...messageIdentifiers]
    })
  } else if (oracleQuestion === 'oracle_viewcenter_text') {
    const limit = gamestate.players[token].player_history[title].selectable_card_limit.center
    const selectedCardPositions = selected_card_positions.slice(0, limit)
    const selectedCards = getCardIdsByPositions(gamestate.card_positions, selectedCardPositions)

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_cards: selectedCards
    }

    const identifiers = formatPlayerIdentifier(selectedCardPositions)
    const message = ['action_saw_card', ...identifiers]

    action = generateRoleAction(gamestate, token, {
      private_message: message,
      showCards: selectedCards
    })
  }

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
