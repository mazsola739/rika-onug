import { HYDRATE_VOTE } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}

  const player_history = newGamestate.players[token].player_history

  return ws.send(
    JSON.stringify({
      type: HYDRATE_VOTE,
      player: {
        player_name: gamestate.players[token].name,
        player_number: gamestate.players[token].player_number,
      },
      players: Object.values(gamestate.players).map((player) => ({
        player_number: player.player_number,
        player_name: player.name,
      })),
      card: gamestate.players[token].card,
      player_history
    })
  )
}
