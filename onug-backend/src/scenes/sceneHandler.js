import { END_GAME } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { allPlayersStateCheck } from '../utils'
import { broadcast } from '../websocket/connections'
import { actionHandler } from './actionHandler'
import { isActivePlayer } from './activePlayer'

export const sceneHandler = async gamestate => {
  logTrace(`sceneHandler in room [${gamestate.room_id}]`)

  const playersArray = Object.values(gamestate.players)

  let newGamestate = { ...gamestate, actual_scenes: [] }
  let flagsState = {
    player_card_shifting: false,
    center_card_shifting: false,
    mark_shifting: false,
    shield: false,
    artifact: false,
    view_player_card: false,
    view_center_card: false
  }

  const hasConflict = scene => {
    const { player_card_shifting, center_card_shifting, mark_shifting, shield, artifact, view_player_card, view_center_card } = scene
    return (
      (player_card_shifting && flagsState.player_card_shifting) ||
      (center_card_shifting && flagsState.center_card_shifting) ||
      (mark_shifting && flagsState.mark_shifting) ||
      (shield && flagsState.shield) ||
      (artifact && flagsState.artifact) ||
      (view_center_card && flagsState.center_card_shifting) ||
      (center_card_shifting && flagsState.view_center_card) ||
      (view_player_card && flagsState.player_card_shifting) ||
      (player_card_shifting && flagsState.view_player_card)
    )
  }

  for (const scene of newGamestate.scripts) {
    logTrace(`Evaluating scene: ${scene.scene_title}`)

    const hasActivePlayer = playersArray.some(player => {
      const card = player.card
      return isActivePlayer(card)[scene.scene_title]
    })

    if (hasActivePlayer) {
      if (!hasConflict(scene)) {
        newGamestate.actual_scenes.push({
          scene_title: scene.scene_title,
          scene_number: scene.scene_number
        })
        logTrace(`Scene added: ${scene.scene_title}`)
        flagsState = { ...flagsState, ...scene }
      } else {
        logTrace(`Conflict detected with active player scene: ${scene.scene_title}. Stopping further scene additions.`)
        break
      }
    } else {
      newGamestate.actual_scenes.push({
        scene_title: scene.scene_title,
        scene_number: scene.scene_number
      })
      logTrace(`No active player for scene: ${scene.scene_title}, added without updating flags.`)
    }
  }

  newGamestate.scripts = newGamestate.scripts.filter(scene => !newGamestate.actual_scenes.some(actualScene => actualScene.scene_title === scene.scene_title))
  logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scripts)}`)

  for (const actualScene of newGamestate.actual_scenes) {
    logTrace(`Processing action for scene: ${actualScene.scene_title}`)
    newGamestate = await actionHandler(newGamestate, actualScene.scene_title)
  }

  const allActionsComplete = newGamestate.scripts.length === 0
  const noPendingPlayerActions = allPlayersStateCheck(playersArray, 'action_finished')
  const gameCanEnd = allActionsComplete && noPendingPlayerActions

  if (gameCanEnd) {
    logTrace(`All scripts processed. Broadcasting END_GAME message.`)

    /* await randomDelay(); */

    broadcast(newGamestate.room_id, {
      type: END_GAME,
      success: true,
      day_mode: true,
      night_mode: false,
      message: 'Successfully finished the game'
    })
  }

  await upsertRoomState(newGamestate)

  return newGamestate
}
