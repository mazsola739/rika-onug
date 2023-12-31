import { detector, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class DetectorStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const detectorActions: RoleActionType[] = []

    detectorActions.push(
      {
        text: detector.detector_wake_text,
        time: BASE_TIME,
      },
      generateTimedAction(ACTION_TIME),
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
