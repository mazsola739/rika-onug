import { logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { actionHandler } from './actionHandler'

export const sceneHandler = async (gamestate) => {
    logTrace(`sceneHandler in room [${gamestate.room_id}]`)
    
    let newGamestate = { ...gamestate, actual_scenes: [] }

    const areAllFlagsFalse = (scene) => {
        return (
            !scene.player_card_shifting &&
            !scene.center_card_shifting &&
            !scene.view_player_card &&
            !scene.view_center_card &&
            !scene.mark_shifting &&
            !scene.view_mark &&
            !scene.shield &&
            !scene.artifact
        )
    }

    let foundTrueFlag = false

    for (const scene of newGamestate.scripts) {
        logTrace(`Checking scene: ${scene.scene_title}`)

        if (areAllFlagsFalse(scene)) {
    
            newGamestate.actual_scenes.push({
                scene_title: scene.scene_title,
                scene_number: scene.scene_number,
            })
            logTrace(`Added to actual_scenes: ${scene.scene_title}`)
        } else if (!foundTrueFlag) {
    
            newGamestate.actual_scenes.push({
                scene_title: scene.scene_title,
                scene_number: scene.scene_number,
            })
            logTrace(`Added to actual_scenes (true flag): ${scene.scene_title}`)
            foundTrueFlag = true
            break
        }
    }

    logTrace(`Final actual_scenes: ${JSON.stringify(newGamestate.actual_scenes)}`)

    newGamestate.scripts = newGamestate.scripts.filter(scene =>
        !newGamestate.actual_scenes.some(actualScene => actualScene.scene_title === scene.scene_title)
    )

    logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scripts)}`)

    for (const actualScene of newGamestate.actual_scenes) {
        logTrace(`Processing action for scene: ${actualScene.scene_title}`)
        newGamestate = await actionHandler(newGamestate, actualScene.scene_title)
        await upsertRoomState(newGamestate)
    }

    await upsertRoomState(newGamestate)

    return newGamestate
}
