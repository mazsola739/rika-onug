import { HYDRATE_TABLE, REDIRECT } from '../constants'
import { logTrace, logErrorWithStack } from '../log'
import { readGamestate } from '../repository'
import { isTableClosed, getTableBoard } from '../utils'

export const hydrateTable = async (ws, message) => {
  try {
    logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)
    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)

    if (isTableClosed(gamestate)) return ws.send(JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  }))

    const playersByToken = gamestate.players
    const player = playersByToken[token]
    const playerCard = player.card
    const players = getTableBoard(gamestate)

    return ws.send(
      JSON.stringify({
        type: HYDRATE_TABLE,
        success: true,
        player: {
          player_name: player?.name,
          player_number: player?.player_number,
          ...playerCard,
        },
        players,
      })
    )
  } catch (error) { 
    logErrorWithStack(error)
  }
}
