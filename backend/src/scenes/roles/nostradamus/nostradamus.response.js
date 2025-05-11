import { GOOD_GUY } from '../../../constants'
import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const nostradamusResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const selectedCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0], selected_card_positions[1], selected_card_positions[2]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]
  const playerThreeCardId = selectedCards[2][selected_card_positions[2]]

  let showCards = []
  //TODO const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)

  if (GOOD_GUY.includes(playerOneCardId)) {
    if (!GOOD_GUY.includes(playerTwoCardId)) {
      showCards = [selectedCards[0], selectedCards[1]]
      gamestate.players[token].card.player_role = gamestate.positions.card_positions[selected_card_positions[1]].card.role
      gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[1]].card.team
    } else if (GOOD_GUY.includes(playerTwoCardId)) {
      if (!GOOD_GUY.includes(playerThreeCardId)) {
        showCards = selectedCards
        gamestate.players[token].card.player_role = gamestate.positions.card_positions[selected_card_positions[2]].card.role
        gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[2]].card.team
      } else {
        showCards = selectedCards
        gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[2]].card.team
        if (
          gamestate.players[token].card.player_original_id === playerOneCardId ||
          gamestate.players[token].card.player_original_id === playerTwoCardId ||
          gamestate.players[token].card.player_original_id === playerThreeCardId
        ) {
          gamestate.players[token].card.player_card_id = 87
        }
      }
    }
  } else if (!GOOD_GUY.includes(playerOneCardId)) {
    showCards = [selectedCards[0]]
    gamestate.players[token].card.player_role = gamestate.positions.card_positions[selected_card_positions[0]].card.role
    gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[0]].card.team
  }

  gamestate.players[token].card_or_mark_action = true
  gamestate.roles.nostradamus.team = gamestate.players[token].card.player_team

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_saw_card', formatPlayerIdentifier(selected_card_positions)[0], showCards.length >= 2 ? formatPlayerIdentifier(selected_card_positions)[1] : '', showCards.length === 3 ? formatPlayerIdentifier(selected_card_positions)[2] : ''],
    showCards
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
