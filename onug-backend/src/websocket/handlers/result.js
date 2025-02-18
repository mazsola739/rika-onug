import { ERROR, RESULT } from '../../constants'
import { logError, logTrace } from '../../log'
import { upsertRoomState } from '../../repository'
import { getPlayerInfo } from '../../utils/result.utils'
import { validateRoom } from '../../validators'
import { getWinnersAndLosers } from '../../winingAndLosing/getWinnersAndLosers'

export const result = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Processing result in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: ERROR, success: false, errors }))
    }

    let newGamestate = { ...gamestate }

    const card_positions = newGamestate.card_positions

    const center_cards = Object.entries(newGamestate.card_positions)
      .filter(([position, { card }]) => position.startsWith('center') && card.id > 0)
      .map(([position, { card }]) => ({
        card_position: position,
        card_id: card.id,
        card_role: card.role,
        card_team: card.team
      }))

    Object.values(newGamestate.players).forEach(player => {
      const playerCard = card_positions[player.player_number].card

      player.card.player_card_id = playerCard.id
      player.card.player_role = playerCard.role
      player.card.player_team = playerCard.team
      player.card.player_mark = card_positions[player.player_number].mark
      player.card.player_artifact = card_positions[player.player_number].artifact
    })

    const { voteResult, winnerTeams, loserTeam } = await getWinnersAndLosers(newGamestate)

    newGamestate.vote_result = voteResult
    newGamestate.winner_teams = winnerTeams
    newGamestate.loser_teams = loserTeam

    await upsertRoomState(newGamestate)

    return ws.send(
      JSON.stringify({
        type: RESULT,
        success: true,
        token,
        vote_result: voteResult,
        winner_teams: winnerTeams,
        loser_teams: loserTeam,
        center_cards,
        player: getPlayerInfo(newGamestate.players[token]),
        players: Object.values(newGamestate.players).map(player => getPlayerInfo(player))
      })
    )
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
