import { STAGES } from '../constants'

export const stopScene = gamestate => {
  gamestate.stage = STAGES.ROOM
  gamestate.game_started = false
  gamestate.game_paused = false
  gamestate.game_stopped = true
  gamestate.game_finished = false
  gamestate.script_locked = true
  gamestate.actual_scenes = []

  delete gamestate.narration
  delete gamestate.game_start_time

  gamestate.players = resetPlayers(gamestate.players)

  return gamestate
}

const resetPlayers = players => {
  return Object.fromEntries(
    Object.entries(players).map(([token, player]) => [
      token,
      {
        ...player,
        flag: false,
        card: null,
        player_number: null,
        card_or_mark_action: false,
        action_finished: true,
        player_history: {}
      }
    ])
  )
}
