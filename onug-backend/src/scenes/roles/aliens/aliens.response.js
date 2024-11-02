import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { addVote, formatPlayerIdentifier, generateRoleInteraction, getAlienPlayerNumbersByRoleIds, getCardIdsByPositions, getNarrationByTitle, getPlayerTokensByPlayerNumber } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'


export const aliensResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const narration = getNarrationByTitle(title, newGamestate.narration)
  const randomAlienInstruction = newGamestate.alien.instruction
  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)

  if (randomAlienInstruction === 'aliens_view_text') {

    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      newGamestate.players[token].card.player_card_id = 0
    }

    const private_message = ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]]

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      private_message,
      viewed_cards: showCards,
    }

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message,
      showCards,
      uniqueInformations: { aliens },
    })
  
    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  
    return newGamestate
  }

  const votes = addVote(newGamestate.players[token].player_number, selected_card_positions[0], newGamestate.alien_votes)

  newGamestate.players[token].alien_vote = selected_card_positions[0]
  newGamestate.alien_votes = votes

  const alienTokens = getPlayerTokensByPlayerNumber(newGamestate.players, aliens)
//TODO better vote
  alienTokens.forEach((alienToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][alienToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  const private_message = ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]]

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    private_message,
    aliens,
    alien_vote: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message,
    uniqueInformations: { aliens },
  })

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
