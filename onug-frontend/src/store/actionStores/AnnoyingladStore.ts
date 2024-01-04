import { annoyinglad, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class AnnoyingladStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const annoyingladActions: RoleActionType[] = []

    annoyingladActions.push(
      {
        text: annoyinglad.annoyinglad_wake_text,
        time: BASE_TIME,
        image: 'onus_annoying_lad',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: annoyinglad.annoyinglad_close_text,
        time: BASE_TIME,
        image: 'onus_annoying_lad',
      }
    )

    return annoyingladActions
  }
}

export default AnnoyingladStore
export const annoyingladStore = new AnnoyingladStore()
