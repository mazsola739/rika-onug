import { ERROR, RESULT } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken } from '../scenes/sceneUtils'
import { validateRoom } from '../validators'
import { sendMessageToPlayer } from './connections'

export const result = async (ws, message) => {
  const { room_id, token, selected_card_positions } = message
  logTrace(`Processing result in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: ERROR, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    newGamestate.players[token].flag = true
    newGamestate.players[token].vote = selected_card_positions

  
    const allVoted = Object.values(newGamestate.players).every(player => player.flag === true)
    if (!allVoted) {
      await upsertRoomState(newGamestate)
      return
    }

    const vote_result = countVotes(newGamestate.players)
    newGamestate.vote_result = vote_result

  
    getAllPlayerTokens(newGamestate.players).forEach((playerToken) => {
      const player = newGamestate.players[playerToken]
      player.flag = false

      const playerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, playerToken)
      const cardPosition = newGamestate.card_positions[playerNumber]

      player.card = {
        player_card_id: cardPosition.card.id,
        player_role: cardPosition.card.role,
        player_team: cardPosition.card.team,
        player_mark: cardPosition.mark
      }

      const center_cards = filterCenterCards(newGamestate.card_positions)

    
      const resultMessage = createResultMessage(playerToken, newGamestate, vote_result, center_cards)
      sendMessageToPlayer(room_id, playerToken, resultMessage)
    })

    await upsertRoomState(newGamestate)
  } catch (error) {
    logError(`Error processing result in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))
    ws.send(
      JSON.stringify({
        type: ERROR,
        success: false,
        message: 'Failed to process result. Please try again.'
      })
    )
  }
}

const countVotes = (players) => {
  const voteCounts = Object.fromEntries(Object.keys(players).map(id => [players[id].player_number, []]))

  Object.values(players).forEach((player) => {
    player.vote.forEach(target => {
      if (voteCounts[target]) voteCounts[target].push(player.player_number)
    })
  })

  return voteCounts
}

const filterCenterCards = (cardPositions) => {
  return Object.entries(cardPositions)
    .filter(([position, { card }]) => position.startsWith('center') && card.id > 0)
    .map(([position, { card }]) => ({
      card_position: position,
      card_id: card.id,
      card_role: card.role,
      card_team: card.team
    }))
}

const createResultMessage = (playerToken, gamestate, vote_result, center_cards) => {
  const player = gamestate.players[playerToken]
  return {
    type: RESULT,
    token: playerToken,
    vote_result,
    center_cards,
    player: {
      player_name: player.name,
      player_number: player.player_number,
      player_card_id: player.card.player_card_id,
      player_role: player.card.player_role,
      player_team: player.card.player_team,
      player_mark: player.card.player_mark
    },
    players: Object.values(gamestate.players).map((player) => ({
      player_name: player.name,
      player_number: player.player_number,
      player_card_id: player.card.player_card_id,
      player_role: player.card.player_role,
      player_team: player.card.player_team,
      player_mark: player.card.player_mark
    }))
  }
}
