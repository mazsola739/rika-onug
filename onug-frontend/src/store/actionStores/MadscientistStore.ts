import {
  madscientist,
  BASE_TIME,
  random_madscientist_intro,
  random_madscientist_therefore,
  random_madscientist_result,
  random_madscientist_transition,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'

class MadscientistStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const madscientistActions: RoleActionType[] = []

    const getRandomText = (texts: Record<string, string>): string => {
      const keys = Object.keys(texts)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      return texts[randomKey]
    }

    madscientistActions.push(
      {
        text: madscientist.madscientist_wake_text,
        time: BASE_TIME,
      },
      {
        text: getRandomText(random_madscientist_intro),
        time: BASE_TIME,
      },
      {
        text: getRandomText(random_madscientist_therefore),
        time: BASE_TIME,
      },
      {
        text: getRandomText(random_madscientist_result),
        time: BASE_TIME,
      },
      {
        text: getRandomText(random_madscientist_transition),
        time: BASE_TIME,
      },
      {
        text: madscientist.madscientist_close_text,
        time: BASE_TIME,
      }
    )

    return madscientistActions
  }
}

export default MadscientistStore
export const madscientistStore = new MadscientistStore()
