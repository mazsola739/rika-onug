import { END_GAME } from '../constants'
import { logTrace } from '../log'
import { repo, repositoryType } from '../repository'
import { allPlayersStateCheck, broadcast /* randomDelay */ } from '../utils'
import { isActivePlayer } from './activePlayer'
import { sceneHandler } from './sceneHandler'

export const chapterHandler = async (gamestate, room_id) => {
  try {
    // Log the start of the chapter handler process
    logTrace(`chapterHandler in room [${room_id}]`)

    // Initialize variables and prepare the gamestate
    const playersArray = Object.values(gamestate.players || {})
    let newGamestate = { ...gamestate }
    newGamestate.scenes.chapter = []

    let flagsState = {
      player_card_shifting: false,
      center_card_shifting: false,
      view_player_card: false,
      view_center_card: false,
      mark_shifting: false,
      view_mark: false,
      shield: false,
      artifact: false,
      group_action: false
    }

    const activePlayersInChapter = new Set()

    // Define a helper function to check for conflicts in scenes
    const hasConflict = scene => {
      const { player_card_shifting, center_card_shifting, view_player_card, view_center_card, mark_shifting, view_mark, shield, artifact, group_action } = scene

      if (flagsState.artifact || flagsState.shield || flagsState.group_action) {
        logTrace(`Conflict in scene due to active flags [artifact: ${flagsState.artifact}, shield: ${flagsState.shield}, group_action: ${flagsState.group_action}]. Halting scene processing.`)
        return true
      }
      if (flagsState.view_mark) {
        logTrace(`Conflict due to active view_mark. Halting scene processing.`)
        return true
      }

      return (
        (group_action && flagsState.group_action) ||
        (player_card_shifting && flagsState.player_card_shifting) ||
        (center_card_shifting && flagsState.center_card_shifting) ||
        (mark_shifting && flagsState.mark_shifting) ||
        (mark_shifting && flagsState.view_mark) ||
        (view_mark && flagsState.mark_shifting) ||
        (view_mark && flagsState.view_mark) ||
        (shield && flagsState.shield) ||
        (artifact && flagsState.artifact) ||
        (view_center_card && flagsState.center_card_shifting) ||
        (center_card_shifting && flagsState.view_center_card) ||
        (view_player_card && flagsState.player_card_shifting) ||
        (player_card_shifting && flagsState.view_player_card)
      )
    }

    // Ensure scripts is an array in the gamestate
    if (!Array.isArray(newGamestate.scenes.scripts)) {
      logTrace(`Scripts is not an array. Initializing to an empty array.`)
      newGamestate.scenes.scripts = []
    }

    // Process each scene in the scripts array
    for (const scene of newGamestate.scenes.scripts) {
      // Validate the scene structure
      if (!scene || typeof scene.scene_title !== 'string' || typeof scene.scene_number !== 'number') {
        logTrace(`Skipping invalid scene: ${JSON.stringify(scene)}`)
        continue
      }

      // Identify active players for the scene
      const scenePlayers = Array.isArray(playersArray)
        ? playersArray.filter(player => {
            const isActive = isActivePlayer(player.card)
            return isActive && isActive[scene.scene_title]
          })
        : []

      if (!Array.isArray(scenePlayers)) {
        logTrace(`scenePlayers is not an array: ${JSON.stringify(scenePlayers)}`)
        continue
      }

      // Check for overlapping players or flag conflicts
      const overlapExists = scenePlayers.some(player => activePlayersInChapter.has(player.player_number))
      if (overlapExists) {
        logTrace(`Overlap detected with scene: ${scene.scene_title}. Stopping further processing.`)
        break
      }

      if (hasConflict(scene)) {
        logTrace(`Flag conflict detected in scene: ${scene.scene_title}. Stopping further processing.`)
        break
      }

      // Update the chapter and flags state based on the scene
      if (scenePlayers.length > 0) {
        newGamestate.scenes.chapter.push({
          scene_title: scene.scene_title,
          scene_number: scene.scene_number
        })
        logTrace(`Scene added: ${scene.scene_title}`)
        scenePlayers.forEach(player => activePlayersInChapter.add(player.player_number))
        flagsState = { ...flagsState, ...scene }
      } else {
        newGamestate.scenes.chapter.push({
          scene_title: scene.scene_title,
          scene_number: scene.scene_number
        })
        logTrace(`No active player for scene: ${scene.scene_title}, added without updating flags.`)
      }
    }

    // Filter out processed scripts from the gamestate
    newGamestate.scenes.scripts = Array.isArray(newGamestate.scenes.scripts)
      ? newGamestate.scenes.scripts.filter(scene => !newGamestate.scenes.chapter.some(actualScene => actualScene.scene_title === scene.scene_title))
      : []
    logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scenes.scripts)}`)

    // Process actions for each scene in the chapter
    for (const actualScene of newGamestate.scenes.chapter) {
      logTrace(`Processing action for scene: ${actualScene.scene_title}`)
      newGamestate = await sceneHandler(newGamestate, actualScene.scene_title)
    }

    // Save the processed chapter into chapter_history
    newGamestate.scenes.chapter_history.push([...newGamestate.scenes.chapter])
    logTrace(`Chapter saved to chapter_history: ${JSON.stringify(newGamestate.scenes.chapter)}`)

    // Check if the game can end and broadcast the END_GAME message if applicable
    const allActionsComplete = Array.isArray(newGamestate.scenes.scripts) && newGamestate.scenes.scripts.length === 0
    const noPendingPlayerActions = allPlayersStateCheck(playersArray, 'action_finished')
    const gameCanEnd = allActionsComplete && noPendingPlayerActions

    if (gameCanEnd) {
      logTrace(`All scripts processed. Broadcasting END_GAME message.`)

      // TODO uncomment delay
      /* await randomDelay() */

      broadcast(newGamestate.room_id, {
        type: END_GAME,
        success: true,
        day_mode: true,
        night_mode: false,
        message: 'Successfully finished the game'
      })
    }

    // Persist the updated gamestate
    await repo[repositoryType].upsertRoomState(newGamestate)

    return newGamestate
  } catch (error) {
    logTrace(`Error in chapterHandler: ${error.message}`)
    throw error
  }
}
