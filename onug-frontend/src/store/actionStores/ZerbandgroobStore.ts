import { leader, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

class ZerbandgroobStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const zerbgroobActions: RoleActionType[] = []

    zerbgroobActions.push(
      {
        text: leader.leader_zerbgroob_text,
        time: BASE_TIME,
        image: 'onua_zerb_alien',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: leader.leader_zerbgroob_thumbaway_text,
        time: BASE_TIME,
        image: 'onua_zerb_alien',
      }
    )

    return zerbgroobActions
  }
}

export default ZerbandgroobStore
export const zerbgroobStore = new ZerbandgroobStore()
