import { nostradamus, BASE_TIME, ACTION_TIME, nostradamusTeam } from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { utils } from 'utils'

//TODO nostradamus doppelganger?

const { generateTimedAction } = utils

const ID = 0 //TODO delete

class NostradamusStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const nostradamusActions: RoleActionType[] = []

    const getTeamText = (id: number) => {
      for (const [team, criteria] of Object.entries(nostradamusTeam)) {
        if (criteria.includes(Number(id))) {
          return `nostradamus.nostradamus_team_${team}_text`
        }
      }

      return 'nostradamus.nostradamus_team_villager_text'
    }

    nostradamusActions.push(
      {
        text: nostradamus.nostradamus_wake_text,
        time: BASE_TIME,
        image: 'onub_nostradamus',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: nostradamus.nostradamus_teamstart_text,
        time: BASE_TIME,
        image: 'onub_nostradamus',
      },
      {
        text: getTeamText(ID),
        time: BASE_TIME,
        image: 'onub_nostradamus',
      },
      {
        text: nostradamus.nostradamus_close_text,
        time: BASE_TIME,
        image: 'onub_nostradamus',
      }
    )

    return nostradamusActions
  }
}

export default NostradamusStore
export const nostradamusStore = new NostradamusStore()
