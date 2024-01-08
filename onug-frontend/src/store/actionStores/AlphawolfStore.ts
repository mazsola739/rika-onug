import { alphawolf, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

class AlphawolfStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const alphawolfActions: RoleActionType[] = []

    alphawolfActions.push(
      {
        text: alphawolf.alphawolf_wake_text,
        time: BASE_TIME,
        image: 'onud_alpha_wolf',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: alphawolf.alphawolf_close_text,
        time: BASE_TIME,
        image: 'onud_alpha_wolf',
      }
    )

    return alphawolfActions
  }
}

export default AlphawolfStore
export const alphawolfStore = new AlphawolfStore()
