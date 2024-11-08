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

  const activePlayersInScenes = new Set()

  const hasConflict = scene => {
    return (
      (scene.player_card_shifting && flagsState.player_card_shifting) ||
      (scene.center_card_shifting && flagsState.center_card_shifting) ||
      (scene.mark_shifting && flagsState.mark_shifting) ||
      (scene.shield && flagsState.shield) ||
      (scene.artifact && flagsState.artifact) ||
      (scene.view_player_card && flagsState.player_card_shifting) ||
      (scene.view_center_card && flagsState.center_card_shifting)
    )
  }

  for (const scene of newGamestate.scripts) {
    logTrace(`Evaluating scene: ${scene.scene_title}`)

    const scenePlayers = playersArray.filter(player => isActivePlayer(player.card)[scene.scene_title])

    const overlapExists = scenePlayers.some(player => activePlayersInScenes.has(player.player_number))

    if (!overlapExists && scenePlayers.length > 0 && !hasConflict(scene)) {
      newGamestate.actual_scenes.push({
        scene_title: scene.scene_title,
        scene_number: scene.scene_number
      })
      logTrace(`Scene added: ${scene.scene_title}`)

      scenePlayers.forEach(player => activePlayersInScenes.add(player.player_number))

      flagsState = { ...flagsState, ...scene }
    } else if (scenePlayers.length === 0) {
      newGamestate.actual_scenes.push({
        scene_title: scene.scene_title,
        scene_number: scene.scene_number
      })
      logTrace(`No active player for scene: ${scene.scene_title}, added without updating flags.`)
    } else {
      logTrace(`Scene skipped due to conflict or player involvement: ${scene.scene_title}`)
      continue
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
