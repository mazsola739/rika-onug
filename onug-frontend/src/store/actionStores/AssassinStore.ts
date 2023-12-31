import { assassins, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//TODO review

const {
  generateTimedAction,
  isCardSelectedById,
  areAnyCardsSelectedById,
  areAllCardsSelectedById,
} = actionStoreUtils

class AssassinStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const assassinActions: RoleActionType[] = []

    // Doppelganger & ID 29 is active
    if (
      areAllCardsSelectedById(this.deck, [1, 29]) &&
      !isCardSelectedById(this.deck, 28)
    ) {
      assassinActions.push(
        { text: assassins.assassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: assassins.assassin_close_text, time: BASE_TIME },
        { text: doppelganger.doppelganger_assassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    // Only ID 29 is active
    if (
      isCardSelectedById(this.deck, 29) &&
      !areAnyCardsSelectedById(this.deck, [1, 28])
    ) {
      assassinActions.push(
        { text: assassins.assassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: assassins.assassin_close_text, time: BASE_TIME }
      )
    }

    // Doppelganger & ID 28 is active
    if (
      areAllCardsSelectedById(this.deck, [1, 28]) &&
      !isCardSelectedById(this.deck, 29)
    ) {
      assassinActions.push(
        { text: assassins.apprenticeassassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: assassins.apprenticeassassin_close_text, time: BASE_TIME },
        {
          text: doppelganger.doppelganger_apprenticeassassin_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    // Only ID 28 is active
    if (
      isCardSelectedById(this.deck, 28) &&
      !areAnyCardsSelectedById(this.deck, [1, 29])
    ) {
      assassinActions.push(
        { text: assassins.apprenticeassassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        { text: assassins.apprenticeassassin_close_text, time: BASE_TIME }
      )
    }

    //Doppelganger && id 28 & 29 is active
    if (areAllCardsSelectedById(this.deck, [1, 28, 29])) {
      assassinActions.push(
        { text: assassins.assassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_assassin_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_close_text,
          time: BASE_TIME,
        },
        {
          text: doppelganger.doppelganger_apprenticeassassin_assassin_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME },
        { text: assassins.assassin_close_text, time: BASE_TIME },
        {
          text: doppelganger.doppelganger_assassin_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        { text: doppelganger.doppelganger_close_text, time: BASE_TIME }
      )
    }

    // Both ID 28 and ID 29 are active but no doppelganger
    if (
      areAllCardsSelectedById(this.deck, [28, 29]) &&
      !isCardSelectedById(this.deck, 1)
    ) {
      assassinActions.push(
        { text: assassins.assassin_wake_text, time: BASE_TIME },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_assassin_wake_text,
          time: BASE_TIME,
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.assassin_and_apprenticeassassin_close_text,
          time: BASE_TIME,
        }
      )
    }

    return assassinActions
  }
}

export default AssassinStore
export const assassinStore = new AssassinStore()
