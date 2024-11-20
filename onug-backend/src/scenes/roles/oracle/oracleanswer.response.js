import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

//TODO uniqInformations
export const oracleAnswerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  let interaction = {}

  const oracleQuestion = gamestate.oracle.question
  const oracleAftermath = gamestate.oracle.aftermath

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

    interaction = generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers]
    })
  } else if (oracleQuestion === 'oracle_viewcenter_text') {
    const limit = +oracleAftermath.replace('oracle_view_yes', '').replace('_text', '')
    const selectedCardPositions = selected_card_positions.slice(0, limit)
    const selectedCards = getCardIdsByPositions(gamestate.card_positions, selectedCardPositions)

    gamestate.players[token].card_or_mark_action = true

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      viewed_cards: selectedCards
    }

    const identifiers = formatPlayerIdentifier(selectedCardPositions)
    const message = ['interaction_saw_card', ...identifiers]

    interaction = generateRoleInteraction(gamestate, token, {
      private_message: message,
      showCards: selectedCards
    })
  }

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
