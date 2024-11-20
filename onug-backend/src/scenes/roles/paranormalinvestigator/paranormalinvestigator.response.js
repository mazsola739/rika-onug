import { GOOD_GUY } from '../../../constants'
import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

//TODO show cards
export const paranormalinvestigatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const selectedCards = getCardIdsByPositions(gamestate.card_positions, selected_card_positions)
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selected_card_positions[1] ? selectedCards[1][selected_card_positions[1]] : null

  let showCards = []

  if (GOOD_GUY.includes(playerOneCardId)) {
    if (playerTwoCardId && !GOOD_GUY.includes(playerTwoCardId)) {
      showCards = selectedCards
      gamestate.players[token].card.player_role = gamestate.card_positions[selected_card_positions[1]].card.role
      gamestate.players[token].card.player_team = gamestate.card_positions[selected_card_positions[1]].card.team
    } else {
      showCards = selectedCards
      if (gamestate.players[token].card.player_original_id === playerOneCardId || (playerTwoCardId && gamestate.players[token].card.player_original_id === playerTwoCardId)) {
        gamestate.players[token].card.player_card_id = 87
      }
    }
  } else {
    if (!GOOD_GUY.includes(playerOneCardId)) {
      showCards = [selectedCards[0]]
      gamestate.players[token].card.player_role = gamestate.card_positions[selected_card_positions[0]].card.role
      gamestate.players[token].card.player_team = gamestate.card_positions[selected_card_positions[0]].card.team
    }
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: showCards.length > 1 ? selected_card_positions.slice(0, 2) : selected_card_positions[0],
    scene_end: true
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length === 2 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
