import { selfawarenessgirl, BASE_TIME, ACTION_TIME } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

const { generateTimedAction } = utils

class SelfawarenessgirlStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const selfawarenessgirlActions: RoleActionType[] = []

    selfawarenessgirlActions.push(
      {
        text: selfawarenessgirl.selfawarenessgirl_wake_text,
        time: BASE_TIME,
        image: 'onus_self_awareness_girl',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: selfawarenessgirl.selfawarenessgirl_close_text,
        time: BASE_TIME,
        image: 'onus_self_awareness_girl',
      }
    )

    return selfawarenessgirlActions
  }
}

export default SelfawarenessgirlStore
export const selfawarenessgirlStore = new SelfawarenessgirlStore()
