import { drunk, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class DrunkStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const drunkActions: RoleActionType[] = []

    drunkActions.push(
      {
        text: drunk.drunk_wake_text,
        time: BASE_TIME,
        image: 'onuw_drunk',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: drunk.drunk_close_text,
        time: BASE_TIME,
        image: 'onuw_drunk',
      }
    )

    return drunkActions
  }
}

export default DrunkStore
export const drunkStore = new DrunkStore()
