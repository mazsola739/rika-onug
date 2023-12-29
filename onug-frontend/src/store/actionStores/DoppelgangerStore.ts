import {
  BASE_TIME,
  doppelganger,
  doppelgangerActionsIds,
  doppelganger_nightaction,
  minion,
  roles,
} from 'constant'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//TODO supervillains + heroes

const { areAnyCardsSelectedById, generateTimedAction, isCardSelectedById } =
  actionStoreUtils

class DoppelgangerStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const doppelgangerActions: RoleActionType[] = []

    const roleKeys = doppelgangerActionsIds
      .filter((id) => this.deck.some((card) => card.id === id))
      .flatMap(
        (id) =>
          Object.entries(doppelganger_nightaction).find(
            ([, value]) => value === id
          )?.[0]
      )

    const displayNames = roleKeys.map((key) => roles[key as keyof typeof roles])

    let displayText = ''
    if (displayNames.length > 0) {
      displayText = displayNames.join(
        ` ${doppelganger.doppelganger_verbose_or_text} `
      )
    }

    const verboseText: RoleActionType[] = [
      {
        text: `${doppelganger.doppelganger_verbose_intro_text} ${displayText} ${doppelganger.doppelganger_verbose_outro_text}`,
        time: BASE_TIME,
      },
    ]

    doppelgangerActions.push(
      { text: doppelganger.doppelganger_wake_text, time: BASE_TIME },
      ...(areAnyCardsSelectedById(this.deck, doppelgangerActionsIds)
        ? verboseText
        : []),
      ...(isCardSelectedById(this.deck, 7)
        ? [
            { text: doppelganger.doppelganger_minion_text, time: BASE_TIME },
            generateTimedAction(this.actionTime),
            { text: minion.werewolves_thumb_away_text, time: BASE_TIME },
          ]
        : []),
      { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
    )

    return doppelgangerActions
  }
}

export default DoppelgangerStore
export const doppelgangerStore = new DoppelgangerStore()
