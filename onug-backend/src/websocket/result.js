import { ERROR, RESULT } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { getAllPlayerTokens } from '../scenes/sceneUtils'
import { assignRoleFromArtifact, getPlayerInfo, updatePlayerRoleFromMark } from '../utils/result.utils'
import { validateRoom } from '../validators'
import { getWinnersAndLosers } from '../winingAndLosing/getWinnersAndLosers'
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
    const currentPlayer = newGamestate.players[token]
    currentPlayer.vote = selected_card_positions

    const playerCardPosition = newGamestate.card_positions[currentPlayer.player_number]

    currentPlayer.card.player_card_id = playerCardPosition.card.id
    currentPlayer.card.player_mark = playerCardPosition.mark
    updatePlayerRoleFromMark(currentPlayer, playerCardPosition.card, playerCardPosition.mark)

    newGamestate.artifact.forEach(artifact => {
      const card = newGamestate.card_positions[artifact.id]?.card
      if (card) {
        Object.assign(card, assignRoleFromArtifact(artifact))
      }
    })

    const center_cards = Object.entries(newGamestate.card_positions)
      .filter(([position, { card }]) => position.startsWith('center') && card.id > 0)
      .map(([position, { card }]) => ({
        card_position: position,
        card_id: card.id,
        card_role: card.role,
        card_team: card.team
      }))

    if (!Object.values(newGamestate.players).every(p => p.flag)) {
      await upsertRoomState(newGamestate)
      return
    }

    const { voteResult, winnerTeams } = getWinnersAndLosers(newGamestate)
    newGamestate.vote_result = voteResult

    const tokens = getAllPlayerTokens(newGamestate.players)

    tokens.forEach(playerToken => {
      const player = newGamestate.players[playerToken]
      player.flag = false

      sendMessageToPlayer(room_id, playerToken, {
        type: RESULT,
        token: playerToken,
        vote_result: voteResult,
        winner_teams: winnerTeams,
        center_cards,
        player: getPlayerInfo(player),
        players: Object.values(newGamestate.players).map(getPlayerInfo)
      })
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
