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

const { generateTimedAction, pickRandomKey } = actionStoreUtils

class BodysnatcherStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const bodysnatcherActions: RoleActionType[] = []
    const randomActionKey = pickRandomKey(random_bodysnatcher)
    const randomActionText =
      random_bodysnatcher[randomActionKey as keyof typeof random_bodysnatcher]

    bodysnatcherActions.push({
      text: bodysnatcher.bodysnatcher_wake_text,
      time: BASE_TIME,
      image: 'onud_bodyguard',
    })

    if (randomActionKey === 'bodysnatcher_steal_text') {
      const chosenKey =
        bodysnatcherStoreKeys[
          Math.floor(Math.random() * bodysnatcherStoreKeys.length)
        ]
      const chosenText = identifier[chosenKey as keyof typeof identifier]

      bodysnatcherActions.push(
        { text: randomActionText, time: BASE_TIME, image: 'onud_bodyguard' },
        { text: chosenText, time: BASE_TIME, image: 'onud_bodyguard' }
      )
    } else {
      bodysnatcherActions.push({
        text: randomActionText,
        time: BASE_TIME,
        image: 'onud_bodyguard',
      })

      if (randomActionKey !== 'bodysnatcher_pretend_text') {
        bodysnatcherActions.push({
          text: bodysnatcher.bodysnatcher_end_text,
          time: BASE_TIME,
          image: 'onud_bodyguard',
        })
      }
    }

    bodysnatcherActions.push(generateTimedAction(ACTION_TIME), {
      text: bodysnatcher.bodysnatcher_close_text,
      time: BASE_TIME,
      image: 'onud_bodyguard',
    })

    return bodysnatcherActions
  }
}

export default BodysnatcherStore
export const bodysnatcherStore = new BodysnatcherStore()
