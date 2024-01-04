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
import { actionStoreUtils } from 'utils'

const { getRandomValueFromObject } = actionStoreUtils

class MadscientistStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const madscientistActions: RoleActionType[] = []

    madscientistActions.push(
      {
        text: madscientist.madscientist_wake_text,
        time: BASE_TIME,
        image: 'onus_mad_scientist',
      },
      {
        text: getRandomValueFromObject(random_madscientist_intro),
        time: BASE_TIME,
        image: 'onus_mad_scientist',
      },
      {
        text: getRandomValueFromObject(random_madscientist_therefore),
        time: BASE_TIME,
        image: 'onus_mad_scientist',
      },
      {
        text: getRandomValueFromObject(random_madscientist_result),
        time: BASE_TIME,
        image: 'onus_mad_scientist',
      },
      {
        text: getRandomValueFromObject(random_madscientist_transition),
        time: BASE_TIME,
        image: 'onus_mad_scientist',
      },
      {
        text: madscientist.madscientist_close_text,
        time: BASE_TIME,
        image: 'onus_mad_scientist',
      }
    )

    return madscientistActions
  }
}

export default MadscientistStore
export const madscientistStore = new MadscientistStore()
