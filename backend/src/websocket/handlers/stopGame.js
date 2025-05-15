import { REDIRECT, STAGES } from '../../constants'
import { logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { validateRoom } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

export const stopGame = async message => {
  const { room_id, token } = message
  logTrace(`Stopping game in room: ${room_id}`)

  const [validity, gamestate, errors] = await validateRoom(room_id)

  if (!validity) return broadcast({ type: REDIRECT, path: '/lobby', errors })

  // TODO validate if player is admin and in the room

  const stopScene = gamestate => {
    gamestate.stage = STAGES.ROOM
    gamestate.game_started = false
    gamestate.game_stopped = true
    gamestate.game_finished = false
    gamestate.scenes.narration = []
    gamestate.scenes.chapter = []
    gamestate.scenes.chapter_history = []
    gamestate.scenes.scripts = []

    delete gamestate.game_start_time

    gamestate.players = resetPlayers(gamestate.players)

    return gamestate
  }

  const player = {
    name: gamestate.players[token].name,
    admin: gamestate.players[token].admin,
    flag: gamestate.players[token].flag
  }


  /* TODO fix stopGame, leaveGame, pauseGame,
  in room:
  {"name": "MischievousNymph",
  "admin": true,
  "flag": false}
    
  in deal:
     { "name": "NiftyPuma",
      "admin": true,
      "flag": false,
      "player_number": "player_1",
      "card": {
        "player_original_id": 64,
        "player_card_id": 64,
        "player_role": "MIRROR_MAN",
        "player_role_id": 64,
        "player_team": "hero",
        "player_mark": "mark_of_clarity"
      },
      "card_or_mark_action": false,
      "action_finished": true,
      "player_history": {}}
      
      */

  const resetPlayers = players => {
    return Object.fromEntries(
      Object.entries(players).map(([token]) => [
        token,
        {
          player
        }
      ])
    )
  }

  let newGamestate = stopScene(gamestate)

  logTrace(`Game stopped by player [${token}], in room [${room_id}]`)

  await repo[repositoryType].upsertRoomState(newGamestate)

  broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
}
