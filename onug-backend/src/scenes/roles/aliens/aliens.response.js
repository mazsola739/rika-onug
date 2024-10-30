import { SCENE, VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { addVote, formatPlayerIdentifier, generateRoleInteraction, getAlienPlayerNumbersByRoleIds, getCardIdsByPositions, getPlayerTokensByPlayerNumber } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'


export const aliensResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const randomAlienInstruction = newGamestate.alien.instruction
  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)

  if (randomAlienInstruction === 'aliens_view_text') {

    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      newGamestate.players[token].card.player_card_id = 0
    }
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: showCards,
    }
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]],
      showCards,
      uniqueInformations: { aliens },
    })
  
    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene
  
    return newGamestate
  }

  const votes = addVote(newGamestate.players[token].player_number, selected_card_positions[0], newGamestate.alien_votes)

  newGamestate.players[token].alien_vote = selected_card_positions[0]
  newGamestate.alien_votes = votes

  const alienTokens = getPlayerTokensByPlayerNumber(newGamestate.players, aliens)

  alienTokens.forEach((alienToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][alienToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    aliens,
    alien_vote: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]],
    uniqueInformations: { aliens },
  })

  Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
