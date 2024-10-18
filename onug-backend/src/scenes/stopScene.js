import { STAGES } from "../constants"

export const stopScene = gamestate => {
  gamestate.game_stopped = true
  gamestate.stage = STAGES.ROOM

  delete gamestate.startTime
  const playerTokens = Object.keys(gamestate.players)

  playerTokens.forEach((token) => {
    gamestate.players[token] = { ...gamestate.players[token] }
    delete gamestate.players[token].player_start_card_id
    delete gamestate.players[token].card
    delete gamestate.players[token].player_number
    delete gamestate.players[token].player_history
    gamestate.players[token].ready = false

    delete gamestate.card_positions
    delete gamestate.mark_positions
    gamestate.action_history = []

    delete gamestate.game_play_start_time
    delete gamestate.actual_scene
  })

  return gamestate
}