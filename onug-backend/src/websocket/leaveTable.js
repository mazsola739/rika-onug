import { HYDRATE_TABLE, REDIRECT, STAGES } from '../constants'
import { logTrace } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { broadcast } from './connections'

export const leaveTable = async (ws, message) => {
  logTrace(`leave-table requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const player = gamestate.players[token]

  if (!player) {
    return ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: false,
        errors: ['Player not found at the table.'],
      })
    )
  }

  const newGamestate = {
    ...gamestate,
    stage: STAGES.ROOM,
  }

  delete newGamestate.card_positions
  delete newGamestate.mark_positions

  const playerTokens = Object.keys(newGamestate.players)
  
  playerTokens.forEach((token) => {
    newGamestate.players[token] = {
      ...newGamestate.players[token],
    }
    delete newGamestate.players[token].player_start_card_id
    delete newGamestate.players[token].card
    delete newGamestate.players[token].player_number
    newGamestate.players[token].ready = false
  })

  await upsertRoomState(newGamestate)

  return broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
}
