import { GOOD_GUY } from '../../../constants'
import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

//TODO show cards
export const paranormalinvestigatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const selectedCards = getCardIdsByPositions(gamestate.positions.card_positions, selected_card_positions)
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selected_card_positions[1] ? selectedCards[1][selected_card_positions[1]] : null

  let showCards = []

  //TODO!!! const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)
  //    updatePlayerRoleAndTeam(gamestate, token, 'TANNER', 'tanner')

  if (GOOD_GUY.includes(playerOneCardId)) {
    if (playerTwoCardId && !GOOD_GUY.includes(playerTwoCardId)) {
      showCards = selectedCards
      gamestate.players[token].card.player_role = gamestate.positions.card_positions[selected_card_positions[1]].card.role
      gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[1]].card.team
    } else {
      showCards = selectedCards
      if (gamestate.players[token].card.player_original_id === playerOneCardId || (playerTwoCardId && gamestate.players[token].card.player_original_id === playerTwoCardId)) {
        gamestate.players[token].card.player_card_id = 87
      }
    }
  } else {
    if (!GOOD_GUY.includes(playerOneCardId)) {
      showCards = [selectedCards[0]]
      gamestate.players[token].card.player_role = gamestate.positions.card_positions[selected_card_positions[0]].card.role
      gamestate.players[token].card.player_team = gamestate.positions.card_positions[selected_card_positions[0]].card.team
    }
  }
  //TODO private message
  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_saw_card', ...formatPlayerIdentifier([selected_card_positions[0]])[0], showCards.length === 2 ? formatPlayerIdentifier(selected_card_positions)[1] : ''],
    showCards,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
