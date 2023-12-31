import {
  alienTeam,
  wolfTeam,
  vampireTeam,
  assassinTeam,
  tannerTeam,
  syntheticTeam,
  blobTeam,
  morticianTeam,
  apprenticeassassinTeam,
  doppelgangerTeam,
  nostradamus,
  BASE_TIME,
  ACTION_TIME,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { generateTimedAction } = actionStoreUtils

const ID = 0 //TODO delete

class NostradamusStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const nostradamusActions: RoleActionType[] = []

    const getTeamText = (id: number) => {
      const teams = {
        alien: alienTeam,
        werewolf: wolfTeam,
        vampire: vampireTeam,
        assassin: assassinTeam,
        tanner: tannerTeam,
        synthetic: syntheticTeam,
        blob: blobTeam,
        mortician: morticianTeam,
        apprenticeassassin: apprenticeassassinTeam,
        doppelganger: doppelgangerTeam,
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
      generateTimedAction(ACTION_TIME),
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
