import { GOOD_GUY } from "../../../constants"
import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const nostradamusResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }

  const selectedCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0], selected_card_positions[1], selected_card_positions[2]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]
  const playerThreeCardId = selectedCards[2][selected_card_positions[2]]

  let showCards = []

  if (GOOD_GUY.includes(playerOneCardId)) {
    if (!GOOD_GUY.includes(playerTwoCardId)) {
      showCards = [selectedCards[0], selectedCards[1]]
      newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[1]].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[1]].card.team
    } else if (GOOD_GUY.includes(playerTwoCardId)) {
      if (!GOOD_GUY.includes(playerThreeCardId)) {
        showCards = selectedCards
        newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[2]].card.role
        newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[2]].card.team
      } else {
        showCards = selectedCards
        newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[2]].card.team
        if (newGamestate.players[token].card.player_original_id === playerOneCardId || newGamestate.players[token].card.player_original_id === playerTwoCardId || newGamestate.players[token].card.player_original_id === playerThreeCardId) {
          newGamestate.players[token].card.player_card_id = 87
        }
      }
    }
  } else if (!GOOD_GUY.includes(playerOneCardId)) {
    showCards = [selectedCards[0]]
    newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
    newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
  }

  newGamestate.players[token].card_or_mark_action = true
  newGamestate.nostradamus_team = newGamestate.players[token].card.player_team

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message : ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length >= 2 ? formatPlayerIdentifier(selected_card_positions)[1] : '', showCards.length === 3 ? formatPlayerIdentifier(selected_card_positions)[2] : '' ],
    showCards,
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
