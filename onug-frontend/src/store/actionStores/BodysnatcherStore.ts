import {
  random_bodysnatcher,
  bodysnatcher,
  BASE_TIME,
  bodysnatcherStoreKeys,
  identifier,
  ACTION_TIME,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

class BodysnatcherStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const bodysnatcherActions: RoleActionType[] = []
    const randomActionKey =
      Object.keys(random_bodysnatcher)[
        Math.floor(Math.random() * Object.keys(random_bodysnatcher).length)
      ]
    const randomActionText =
      random_bodysnatcher[randomActionKey as keyof typeof random_bodysnatcher]

    bodysnatcherActions.push({
      text: bodysnatcher.bodysnatcher_wake_text,
      time: BASE_TIME,
    })

    if (randomActionKey === 'bodysnatcher_steal_text') {
      const chosenKey =
        bodysnatcherStoreKeys[
          Math.floor(Math.random() * bodysnatcherStoreKeys.length)
        ]
      const chosenText = identifier[chosenKey as keyof typeof identifier]

      bodysnatcherActions.push(
        { text: randomActionText, time: BASE_TIME },
        { text: chosenText, time: BASE_TIME }
      )
    } else {
      bodysnatcherActions.push({ text: randomActionText, time: BASE_TIME })

      if (randomActionKey !== 'bodysnatcher_pretend_text') {
        bodysnatcherActions.push({
          text: bodysnatcher.bodysnatcher_end_text,
          time: BASE_TIME,
        })
      }
    }

    bodysnatcherActions.push(generateTimedAction(ACTION_TIME), {
      text: bodysnatcher.bodysnatcher_close_text,
      time: BASE_TIME,
    })

    return bodysnatcherActions
  }
}

export default BodysnatcherStore
export const bodysnatcherStore = new BodysnatcherStore()
