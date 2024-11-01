import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
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

    const playerShiftConflict = player_card_shifting && flagsState.player_card_shifting
    const centerShiftConflict = center_card_shifting && flagsState.center_card_shifting
    const markShiftConflict = mark_shifting && flagsState.mark_shifting
    const shieldConflict = shield && flagsState.shield
    const artifactConflict = artifact && flagsState.artifact

    if (playerShiftConflict || centerShiftConflict || markShiftConflict || shieldConflict || artifactConflict) {
      return false
    }

    if (view_player_card && !flagsState.player_card_shifting) {
      return true
    }
    if (view_center_card && !flagsState.center_card_shifting) {
      return true
    }

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

      flagsState.player_card_shifting = flagsState.player_card_shifting || scene.player_card_shifting
      flagsState.center_card_shifting = flagsState.center_card_shifting || scene.center_card_shifting
      flagsState.mark_shifting = flagsState.mark_shifting || scene.mark_shifting
      flagsState.shield = flagsState.shield || scene.shield
      flagsState.artifact = flagsState.artifact || scene.artifact

      logTrace(`_______________________flags: ${flagsState}`)

      if (scene.player_card_shifting || scene.center_card_shifting || scene.mark_shifting || scene.shield || scene.artifact) {
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

  await upsertRoomState(newGamestate)

  return newGamestate
}
