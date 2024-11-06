import { HYDRATE_VOTE } from '../constants'
import { logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateVote = async (ws, message) => {
  logTrace(`hydrate game vote ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gamestate = await readGamestate(room_id)

  Object.values(gamestate.players).forEach(player => {
    player.flag = false
  })

  Object.values(gamestate.card_positions).forEach(card => {
    if (!card.guessed_roles) {
      card.guessed_roles = []
    }
  })

  const guess_cards = [...gamestate.selected_cards]
  
  const player = {
    player_name: gamestate.players[token].name,
    player_number: gamestate.players[token].player_number,
    player_card_id: gamestate.players[token].card.player_card_id,
    player_role: gamestate.players[token].card.player_role,
    player_team: gamestate.players[token].card.player_team,
    player_mark: gamestate.players[token].card.player_mark,
  }

  const players = Object.values(gamestate.players).map(({ player_number, name }) => ({
    player_number,
    player_name: name,
    flag: false,
  }))

  return ws.send(JSON.stringify({
    type: HYDRATE_VOTE,
    success: true,
    guess_cards,
    player,
    players,
    narrations: gamestate.narration,
  }))
}
