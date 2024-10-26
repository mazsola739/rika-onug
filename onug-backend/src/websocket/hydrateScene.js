import { logDebug, logError } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { getNextScene } from '../scenes/getNextScene'
import { interactionResponseHandler } from '../scenes/interactionResponseHandler'

export const hydrateScene = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`)

    const { room_id, token, selected_card_positions, selected_mark_positions, selected_answer, scene_finished } = message

/*     if (!room_id || !token) {
      logError('Invalid request: room_id or token missing')
      return
    } */

    const gamestate = await readGamestate(room_id)


    logDebug(`scene_finished value: ${scene_finished} and type: ${typeof scene_finished}`)

    if (scene_finished) {
    
      let newGamestate = {...gamestate, scene_locked: false}

      if (newGamestate.scene_locked === false) {
        newGamestate = getNextScene(newGamestate)
        logDebug(`After getNextScene call, scene_locked: ${newGamestate.scene_locked}`)
      }

      await upsertRoomState(newGamestate)
    } else {
      let newGamestate = {...gamestate}
      newGamestate = interactionResponseHandler(gamestate, token, selected_card_positions, selected_mark_positions, selected_answer)
    
      await upsertRoomState(newGamestate)
    }

    await upsertRoomState(gamestate)

  } catch (error) {
    logError(`Error processing interaction: ${error.message}`)
    logError(JSON.stringify(error.stack))
  }
}
