import { SCENE } from '../../../constants'
import { getPlayerNumberWithMatchingToken, formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const oracleAnswerResponse = (gamestate, token, selected_card_positions, title) => {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }
  
    const newGamestate = { ...gamestate }
    const scene = []
    let interaction = {}
  
    const oracleQuestion = newGamestate.oracle.question
    const oracleAftermath = newGamestate.oracle.aftermath
  
    if (oracleQuestion === 'oracle_centerexchange_text') {
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
      const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
      const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
      newGamestate.card_positions[currentPlayerNumber].card = selectedCard
      newGamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard
  
      newGamestate.players[token].card.player_card_id = 0
      newGamestate.players[token].card_or_mark_action = true
  
      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
      }
  
      const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])
  
      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_cards', ...messageIdentifiers],
        uniqueInformations: { oracle: [currentPlayerNumber, selected_card_positions[0]] },
      })
    } else if (oracleQuestion === 'oracle_viewcenter_text') {
      const limit = +oracleAftermath.replace('oracle_view_yes', '').replace('_text', '')
      const selectedCardPositions = selected_card_positions.slice(0, limit)
      const selectedCards = getCardIdsByPositions(newGamestate.card_positions, selectedCardPositions)
  
      newGamestate.players[token].card_or_mark_action = true
  
      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        viewed_cards: selectedCards,
      }
  
      const identifiers = formatPlayerIdentifier(selectedCardPositions)
      const message = ['interaction_saw_card', ...identifiers]
  
      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: message,
        showCards: selectedCards,
        uniqueInformations: { nostradamus: selectedCardPositions },
      })
    }
  
    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene
  
    return newGamestate
  }
  