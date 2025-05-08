import { END_GAME } from '../constants'
import { logTrace } from '../log'
import { repo, repositoryType } from '../repository'
import { allPlayersStateCheck, broadcast /* randomDelay */ } from '../utils'
import { isActivePlayer } from './activePlayer'
import { sceneHandler } from './sceneHandler'

export const chapterHandler = async (gamestate, room_id) => {
  try {
    // Step 1: Log the start of the chapter handler process
    logTrace(`chapterHandler in room [${room_id}]`)

    // Step 2: Initialize variables and prepare the gamestate
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
      vote: false
    }

    const activePlayersInChapter = new Set()

    // Step 3: Define a helper function to check for conflicts in scenes
    const hasConflict = scene => {
      const { player_card_shifting, center_card_shifting, view_player_card, view_center_card, mark_shifting, view_mark, shield, artifact, vote } = scene

      if (flagsState.artifact || flagsState.shield || flagsState.vote) {
        logTrace(`Conflict in scene due to active flags [artifact: ${flagsState.artifact}, shield: ${flagsState.shield}, vote: ${flagsState.vote}]. Halting scene processing.`)
        return true
      }
      if (flagsState.view_mark) {
        logTrace(`Conflict due to active view_mark. Halting scene processing.`)
        return true
      }

      return (
        (vote && flagsState.vote) ||
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

    // Step 4: Ensure scripts is an array in the gamestate
    if (!Array.isArray(newGamestate.scenes.scripts)) {
      logTrace(`Scripts is not an array. Initializing to an empty array.`)
      newGamestate.scenes.scripts = []
    }

    // Step 5: Process each scene in the scripts array
    for (const scene of newGamestate.scenes.scripts) {
      // Step 5.1: Validate the scene structure
      if (!scene || typeof scene.scene_title !== 'string' || typeof scene.scene_number !== 'number') {
        logTrace(`Skipping invalid scene: ${JSON.stringify(scene)}`)
        continue
      }

      // Step 5.2: Identify active players for the scene
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

      // Step 5.3: Check for overlapping players or flag conflicts
      const overlapExists = scenePlayers.some(player => activePlayersInChapter.has(player.player_number))
      if (overlapExists) {
        logTrace(`Overlap detected with scene: ${scene.scene_title}. Stopping further processing.`)
        break
      }

      if (hasConflict(scene)) {
        logTrace(`Flag conflict detected in scene: ${scene.scene_title}. Stopping further processing.`)
        break
      }

      // Step 5.4: Update the chapter and flags state based on the scene
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

    // Step 6: Filter out processed scripts from the gamestate
    newGamestate.scenes.scripts = Array.isArray(newGamestate.scenes.scripts)
      ? newGamestate.scenes.scripts.filter(scene => !newGamestate.scenes.chapter.some(actualScene => actualScene.scene_title === scene.scene_title))
      : []
    logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scenes.scripts)}`)

    // Step 7: Process actions for each scene in the chapter
    for (const actualScene of newGamestate.scenes.chapter) {
      logTrace(`Processing action for scene: ${actualScene.scene_title}`)
      newGamestate = await sceneHandler(newGamestate, actualScene.scene_title)
    }

    // Step 8: Check if the game can end and broadcast the END_GAME message if applicable
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

    // Step 9: Persist the updated gamestate
    await repo[repositoryType].upsertRoomState(newGamestate)

    // Step 10: Return the updated gamestate
    return newGamestate
  } catch (error) {
    // Step 11: Handle errors and log them
    logTrace(`Error in chapterHandler: ${error.message}`)
    throw error
  }
}
