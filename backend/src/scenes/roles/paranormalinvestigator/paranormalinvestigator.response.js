import { GOOD_GUY } from '../../../constants'
import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, updatePlayerKnownCard, sawCards } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

//TODO refact
export const paranormalinvestigatorResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(gamestate, token, selected_card_positions, title)) {
    return gamestate
  }

  const selectedCards = getCardIdsByPositions(gamestate.positions.card_positions, selected_card_positions)
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selected_card_positions[1] ? selectedCards[1][selected_card_positions[1]] : null

  let limit

  if (GOOD_GUY.includes(playerOneCardId)) {
    if (playerTwoCardId && !GOOD_GUY.includes(playerTwoCardId)) {
      limit = 2
      const { role, team } = gamestate.positions.card_positions[selected_card_positions[1]].card
      const { player_card_id, player_role_id } = gamestate.players[token].card
      updatePlayerKnownCard(gamestate, token, player_card_id, role, player_role_id, team)
    }
  } else {
    limit = 1
    const { role, team } = gamestate.positions.card_positions[selected_card_positions[0]].card
    const { player_card_id, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, role, player_role_id, team)
  }

  const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)

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
