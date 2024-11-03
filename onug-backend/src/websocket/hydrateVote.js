import { HYDRATE_VOTE } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}
  const { players } = newGamestate

  const player_history = players[token].player_history

  Object.keys(players).forEach(playerToken => {
      players[playerToken].ready = false
    })

  return ws.send(
    JSON.stringify({
      type: HYDRATE_VOTE,
      success: true,
      player: {
        player_name: players[token].name,
        player_number: players[token].player_number,
      },
      players: Object.values(players).map((player) => ({
        player_number: player.player_number,
        player_name: player.name,
        ready: player.ready,
      })),
      card: players[token].card,
      player_history
    })
  )
}
