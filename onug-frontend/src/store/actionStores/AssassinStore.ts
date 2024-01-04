import { assassins, BASE_TIME, ACTION_TIME, doppelganger } from 'constant'
import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ActionCardType, RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const {
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  generateTimedAction,
  isCardSelectedById,
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
        {
          text: assassins.assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.assassin_close_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        {
          text: doppelganger.doppelganger_assassin_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    // Only ID 29 is active
    if (
      isCardSelectedById(this.deck, 29) &&
      !areAnyCardsSelectedById(this.deck, [1, 28])
    ) {
      assassinActions.push(
        {
          text: assassins.assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.assassin_close_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        }
      )
    }

    // Doppelganger & ID 28 is active
    if (
      areAllCardsSelectedById(this.deck, [1, 28]) &&
      !isCardSelectedById(this.deck, 29)
    ) {
      assassinActions.push(
        {
          text: assassins.apprenticeassassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_apprentice_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_close_text,
          time: BASE_TIME,
          image: 'onuv_apprentice_assassin',
        },
        {
          text: doppelganger.doppelganger_apprenticeassassin_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    // Only ID 28 is active
    if (
      isCardSelectedById(this.deck, 28) &&
      !areAnyCardsSelectedById(this.deck, [1, 29])
    ) {
      assassinActions.push(
        {
          text: assassins.apprenticeassassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_apprentice_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_close_text,
          time: BASE_TIME,
          image: 'onuv_apprentice_assassin',
        }
      )
    }

    //Doppelganger && id 28 & 29 is active
    if (areAllCardsSelectedById(this.deck, [1, 28, 29])) {
      assassinActions.push(
        {
          text: assassins.assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_close_text,
          time: BASE_TIME,
          image: 'onuv_apprentice_assassin',
        },
        {
          text: doppelganger.doppelganger_apprenticeassassin_assassin_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: assassins.assassin_close_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        {
          text: doppelganger.doppelganger_assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    // Both ID 28 and ID 29 are active but no doppelganger
    if (
      areAllCardsSelectedById(this.deck, [28, 29]) &&
      !isCardSelectedById(this.deck, 1)
    ) {
      assassinActions.push(
        {
          text: assassins.assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.apprenticeassassin_assassin_wake_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: assassins.assassin_and_apprenticeassassin_close_text,
          time: BASE_TIME,
          image: 'onuv_assassin',
        }
      )
    }

    return assassinActions
  }
}

export default AssassinStore
export const assassinStore = new AssassinStore()
