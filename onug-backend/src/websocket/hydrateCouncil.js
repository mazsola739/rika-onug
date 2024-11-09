import { HYDRATE_COUNCIL } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { readGamestate } from '../repository'

export const hydrateCouncil = async (ws, message) => {
  try {
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

    //fix shield and artifact any player
    const player = {
      player_name: gamestate.players[token].name,
      player_number: gamestate.players[token].player_number,
      player_card_id: gamestate.players[token].card.player_card_id,
      player_role: gamestate.players[token].card.player_role,
      player_team: gamestate.players[token].card.player_team,
      player_mark: gamestate.players[token].card.player_mark
    }

    const players = Object.values(gamestate.players).map(({ player_number, name }) => ({
      player_number,
      player_name: name,
      flag: false
    }))

    return ws.send(
      JSON.stringify({
        type: HYDRATE_COUNCIL,
        success: true,
        guess_cards,
        player,
        players,
        artifact: Object.keys(gamestate.artifact),
        shield: gamestate.shield,
        narrations: gamestate.narration
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_COUNCIL,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
