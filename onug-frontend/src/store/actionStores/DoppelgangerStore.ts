import {
  doppelgangerInstantActionsIds,
  doppelganger_nightaction,
  roles,
  doppelganger,
  BASE_TIME,
  ACTION_TIME,
  minion,
} from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { utils } from 'utils'

//TODO supervillains + heroes

const { areAnyCardSelectedById, generateTimedAction, isCardSelectedById } =
  utils

class DoppelgangerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const doppelgangerActions: RoleActionType[] = []

    const roleKeys = doppelgangerInstantActionsIds
      .filter((id) => this.deck.some((card) => card.id === id))
      .flatMap(
        (id) =>
          Object.entries(doppelganger_nightaction).find(
            ([, value]) => value === id
          )?.[0]
      )

    const displayNames = roleKeys.map((key) => roles[key as keyof typeof roles])

    const displayText =
      displayNames.length > 0
        ? `${displayNames.join(
            ` ${doppelganger.doppelganger_verbose_or_text} `
          )}`
        : ''

    const verboseText: RoleActionType[] = [
      {
        text: `${doppelganger.doppelganger_verbose_intro_text} ${displayText} ${doppelganger.doppelganger_verbose_outro_text}`,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      },
      generateTimedAction(2 * ACTION_TIME),
    ]

    doppelgangerActions.push(
      {
        text: doppelganger.doppelganger_wake_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      },
      ...(areAnyCardSelectedById(this.deck, doppelgangerInstantActionsIds)
        ? verboseText
        : []),
      ...(isCardSelectedById(this.deck, 7)
        ? [
            {
              text: doppelganger.doppelganger_minion_text,
              time: BASE_TIME,
              image: 'onuw_doppelganger',
            },
            generateTimedAction(ACTION_TIME),
            {
              text: minion.werewolves_thumb_away_text,
              time: BASE_TIME,
              image: 'onuw_werewolf',
            },
          ]
        : []),
      {
        text: doppelganger.doppelganger_close_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      }
    )

    return doppelgangerActions
  }
}

export default DoppelgangerStore
export const doppelgangerStore = new DoppelgangerStore()
