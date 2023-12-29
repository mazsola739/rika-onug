import { BASE_TIME, nostradamus } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

const ID = 0 //TODO delete

class NostradamusStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const nostradamusActions: RoleActionType[] = []

    const getTeamText = (id: number) => {
      const teams = {
        alien: [42, 43, 47, 54, 74],
        werewolf: [7, 15, 16, 17, 21, 22, 83],
        vampire: [38, 39, 40, 41],
        assassin: [29],
        tanner: [10, 71],
        synthetic: [53],
        blob: [44],
        mortician: [49],
        apprenticeassassin: [28],
        doppelganger: [1],
      }

      for (const [team, criteria] of Object.entries(teams)) {
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
      },
      generateTimedAction(this.actionTime),
      {
        text: nostradamus.nostradamus_teamstart_text,
        time: BASE_TIME,
      },
      {
        text: getTeamText(ID),
        time: BASE_TIME,
      },
      {
        text: nostradamus.nostradamus_close_text,
        time: BASE_TIME,
      }
    )

    return nostradamusActions
  }
}

export default NostradamusStore
export const nostradamusStore = new NostradamusStore()
