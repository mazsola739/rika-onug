import { BASE_TIME, detector } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class DetectorStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const detectorActions: RoleActionType[] = []

    detectorActions.push(
      {
        text: detector.detector_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(this.actionTime),
      {
        text: detector.detector_close_text,
        time: BASE_TIME,
      }
    )

    return detectorActions
  }
}

export default DetectorStore
export const detectorStore = new DetectorStore()
