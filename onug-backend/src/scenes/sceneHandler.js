import { END_GAME } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { allPlayersStateCheck, /* randomDelay */ } from '../utils'
import { broadcast } from '../websocket/connections'
import { actionHandler } from './actionHandler'

export const sceneHandler = async (gamestate) => {
  logTrace(`sceneHandler in room [${gamestate.room_id}]`)

  let newGamestate = { ...gamestate, actual_scenes: [] }
  const flagsState = {
    player_card_shifting: false,
    center_card_shifting: false,
    mark_shifting: false,
    shield: false,
    artifact: false,
  }

  const canAddScene = (scene) => {
    const {
      player_card_shifting,
      center_card_shifting,
      mark_shifting,
      shield,
      artifact,
      view_player_card,
      view_center_card,
    } = scene
  
    const conflicts = [
      player_card_shifting && flagsState.player_card_shifting,
      center_card_shifting && flagsState.center_card_shifting,
      mark_shifting && flagsState.mark_shifting,
      shield && flagsState.shield,
      artifact && flagsState.artifact,
      (view_center_card && flagsState.center_card_shifting) || 
      (center_card_shifting && flagsState.view_center_card),
      (view_player_card && flagsState.player_card_shifting) || 
      (player_card_shifting && flagsState.view_player_card)
    ]
  
    if (conflicts.some(Boolean)) {
      return false
    }
  
    if (view_player_card) flagsState.view_player_card = true
    if (view_center_card) flagsState.view_center_card = true
    if (player_card_shifting) flagsState.player_card_shifting = true
    if (center_card_shifting) flagsState.center_card_shifting = true
    if (mark_shifting) flagsState.mark_shifting = true
    if (shield) flagsState.shield = true
    if (artifact) flagsState.artifact = true
  
    return true
  }
  

  for (const scene of newGamestate.scripts) {
    logTrace(`Checking scene: ${scene.scene_title}`)

    if (canAddScene(scene)) {
      newGamestate.actual_scenes.push({
        scene_title: scene.scene_title,
        scene_number: scene.scene_number,
      })
      logTrace(`Added to actual_scenes: ${scene.scene_title}`)

      flagsState.player_card_shifting ||= scene.player_card_shifting
      flagsState.center_card_shifting ||= scene.center_card_shifting
      flagsState.mark_shifting ||= scene.mark_shifting
      flagsState.shield ||= scene.shield
      flagsState.artifact ||= scene.artifact

      if (Object.values(flagsState).some(Boolean)) {
        break 
      }
    }
  }

  logTrace(`Final actual_scenes: ${JSON.stringify(newGamestate.actual_scenes)}`)

  newGamestate.scripts = newGamestate.scripts.filter(
    (scene) => !newGamestate.actual_scenes.some(
      (actualScene) => actualScene.scene_title === scene.scene_title
    )
  )

  logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scripts)}`)

  for (const actualScene of newGamestate.actual_scenes) {
    logTrace(`Processing action for scene: ${actualScene.scene_title}`)
    newGamestate = await actionHandler(newGamestate, actualScene.scene_title)
  }

  const allActionsComplete = newGamestate.scripts.length === 0
  const noPendingPlayerActions = allPlayersStateCheck(newGamestate.players, 'action_finished')
  const gameCanEnd = allActionsComplete && noPendingPlayerActions

  if (gameCanEnd) {
    logTrace(`All scripts processed. Broadcasting END_GAME message.`)

        //TODO uncomment delay
    /* await randomDelay() */
    
    broadcast(newGamestate.room_id, {
      type: END_GAME,
      success: true,
      day_mode: true,
      night_mode: false,
      message: 'Successfully finished the game',
    })
  }

  await upsertRoomState(newGamestate)

  return newGamestate
}
