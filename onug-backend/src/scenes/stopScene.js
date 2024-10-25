import { STAGES } from '../constants'

export const stopScene = (gamestate) => {
  gamestate.stage = STAGES.ROOM
  gamestate.game_started = false
  gamestate.game_paused = false
  gamestate.game_stopped = true
  gamestate.game_finished = false
  gamestate.scene_locked = true


  delete gamestate.narration
  delete gamestate.game_start_time
  delete gamestate.actual_scene
  gamestate.players = resetPlayers(gamestate.players)

  return gamestate
}

const resetPlayers = (players) => {
  return Object.fromEntries(
    Object.entries(players).map(([token, player]) => [
      token,
      { ...player, ready: false, card: null, player_number: null },
    ])
  )
}
