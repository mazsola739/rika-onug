import { HYDRATE_DEALING, REDIRECT } from '../constants'
import { logTrace, logErrorWithStack } from '../log'
import { readGamestate } from '../repository'
import { isGameTableClosed, getGameTableBoard } from '../utils'

export const hydrateGameTable = async (ws, message) => {
  try {
    logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)
    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)

    if (isGameTableClosed(gamestate)) return ws.send(JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  }))

    const playersByToken = gamestate.players
    const player = playersByToken[token]
    const playerCard = player.card

    return ws.send(
      JSON.stringify({
        type: HYDRATE_DEALING,
        selected_cards: gamestate.selected_cards,
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
        board: getGameTableBoard(gamestate)
      })
    )
  } catch (error) { 
    logErrorWithStack(error)
  }
}
