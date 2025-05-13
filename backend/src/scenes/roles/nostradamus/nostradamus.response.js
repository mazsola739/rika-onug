import { GOOD_GUY } from '../../../constants'
import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards, updatePlayerKnownCard } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

//TODO refact
export const nostradamusResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  let limit
  const selectedCards = getCardIdsByPositions(gamestate.positions.card_positions, [selected_card_positions[0], selected_card_positions[1], selected_card_positions[2]])
  const playerOneCardId = selectedCards[0][selected_card_positions[0]]
  const playerTwoCardId = selectedCards[1][selected_card_positions[1]]
  const playerThreeCardId = selectedCards[2][selected_card_positions[2]]

  if (GOOD_GUY.includes(playerOneCardId)) {
    if (!GOOD_GUY.includes(playerTwoCardId)) {
      limit = 2
      const { role, team } = gamestate.positions.card_positions[selected_card_positions[1]].card
      const { player_card_id, player_role_id } = gamestate.players[token].card
      updatePlayerKnownCard(gamestate, token, player_card_id, role, player_role_id, team)
    } else if (GOOD_GUY.includes(playerTwoCardId)) {
      limit = 3
      if (!GOOD_GUY.includes(playerThreeCardId)) {
        const { role, team } = gamestate.positions.card_positions[selected_card_positions[2]].card
        const { player_card_id, player_role_id } = gamestate.players[token].card
        updatePlayerKnownCard(gamestate, token, player_card_id, role, player_role_id, team)
      } else {
        const { team } = gamestate.positions.card_positions[selected_card_positions[2]].card
        const { player_card_id, player_role, player_role_id } = gamestate.players[token].card
        updatePlayerKnownCard(gamestate, token, player_card_id, player_role, player_role_id, team)
      }
    }
  } else if (!GOOD_GUY.includes(playerOneCardId)) {
    limit = 1
    const { role, team } = gamestate.positions.card_positions[selected_card_positions[0]].card
    const { player_card_id, player_role_id } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, player_card_id, role, player_role_id, team)
  }

  const showCards = sawCards(gamestate, selected_card_positions.slice(0, limit), token)

  gamestate.roles.nostradamus.team = gamestate.players[token].card.player_team

  //TODO private message
  const action = generateRoleAction(gamestate, token, title, {
    private_message: [
      'action_saw_card',
      ...formatPlayerIdentifier([selected_card_positions[0]])[0],
      showCards.length >= 2 ? formatPlayerIdentifier(selected_card_positions)[1] : '',
      showCards.length === 3 ? formatPlayerIdentifier(selected_card_positions)[2] : ''
    ],
    uniqueInformation: { selected_card_positions },
    showCards
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
