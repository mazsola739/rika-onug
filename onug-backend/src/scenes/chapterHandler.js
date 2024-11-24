import { END_GAME } from '../constants'
import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { allPlayersStateCheck } from '../utils'
import { broadcast } from '../websocket'
import { isActivePlayer } from './activePlayer'
import { sceneHandler } from './sceneHandler'

export const chapterHandler = async gamestate => {
  try {
    logTrace(`chapterHandler in room [${gamestate.room_id}]`)

    const playersArray = Object.values(gamestate.players || {})
    let newGamestate = { ...gamestate, chapter: [] }

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

    const hasConflict = scene => {
      const { player_card_shifting, center_card_shifting, view_player_card, view_center_card, mark_shifting, view_mark, shield, artifact, vote } = scene

      if (flagsState.artifact || flagsState.shield || flagsState.vote) {
        logTrace(`Conflict due to active artifact, shield, or vote flag. Halting scene processing.`)
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

    if (!Array.isArray(newGamestate.scripts)) {
      logTrace(`Scripts is not an array. Initializing to an empty array.`)
      newGamestate.scripts = []
    }

    for (const scene of newGamestate.scripts) {
      if (!scene || typeof scene.scene_title !== 'string' || typeof scene.scene_number !== 'number') {
        logTrace(`Skipping invalid scene: ${JSON.stringify(scene)}`)
        continue
      }

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

      const overlapExists = scenePlayers.some(player => activePlayersInChapter.has(player.player_number))
      if (overlapExists) {
        logTrace(`Overlap detected with scene: ${scene.scene_title}. Stopping further processing.`)
        break
      }

      if (hasConflict(scene)) {
        logTrace(`Flag conflict detected in scene: ${scene.scene_title}. Stopping further processing.`)
        break
      }

      if (scenePlayers.length > 0) {
        newGamestate.chapter.push({
          scene_title: scene.scene_title,
          scene_number: scene.scene_number
        })
        logTrace(`Scene added: ${scene.scene_title}`)
        scenePlayers.forEach(player => activePlayersInChapter.add(player.player_number))
        flagsState = { ...flagsState, ...scene }
      } else {
        newGamestate.chapter.push({
          scene_title: scene.scene_title,
          scene_number: scene.scene_number
        })
        logTrace(`No active player for scene: ${scene.scene_title}, added without updating flags.`)
      }
    }

    newGamestate.scripts = Array.isArray(newGamestate.scripts) ? newGamestate.scripts.filter(scene => !newGamestate.chapter.some(actualScene => actualScene.scene_title === scene.scene_title)) : []
    logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scripts)}`)

    for (const actualScene of newGamestate.chapter) {
      logTrace(`Processing action for scene: ${actualScene.scene_title}`)
      newGamestate = await sceneHandler(newGamestate, actualScene.scene_title)
    }

    const allActionsComplete = Array.isArray(newGamestate.scripts) && newGamestate.scripts.length === 0
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

    await upsertRoomState(newGamestate)
    return newGamestate
  } catch (error) {
    logTrace(`Error in chapterHandler: ${error.message}`)
    throw error
  }
}
