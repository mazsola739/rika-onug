import { HYDRATE_VOTE } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)
  const newGamestate = {...gamestate}

  Object.keys(newGamestate.players).forEach(playerToken => newGamestate.players[playerToken].flag = false)

  const narrations = newGamestate.narration

  return ws.send(
    JSON.stringify({
      type: HYDRATE_VOTE,
      success: true,
      player: {
        player_name: newGamestate.players[token].name,
        player_number: newGamestate.players[token].player_number,
        player_card_id: newGamestate.players[token].card.player_card_id,
        player_role: newGamestate.players[token].card.player_role,
        player_team: newGamestate.players[token].card.player_team,
        player_mark: newGamestate.players[token].card.player_mark,
      },
      players: Object.values(newGamestate.players).map((player) => ({
        player_number: player.player_number,
        player_name: player.name,
        flag: player.flag,
      })),
      narrations,
    })
  )
}
