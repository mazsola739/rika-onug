import { HYDRATE_GAME_TABLE, REDIRECT } from '../constant'
import { logTrace, logErrorWithStack } from '../log'
import { readGameState } from '../repository'
import { isGameTableClosed, getGameTableBoard } from '../utils'

export const hydrateGameTable = async (ws, message) => {
  try {
    logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)
    const { room_id, token } = message
    const gameState = await readGameState(room_id)

    if (isGameTableClosed(gameState)) return ws.send(JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  }))

    const playersByToken = gameState.players
    const player = playersByToken[token]
    const playerCard = player.card

    return ws.send(
      JSON.stringify({
        type: HYDRATE_GAME_TABLE,
        selected_cards: gameState.selected_cards,
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
        board: getGameTableBoard(gameState)
      })
    )
  } catch (error) { 
    logErrorWithStack(error)
  }
}
