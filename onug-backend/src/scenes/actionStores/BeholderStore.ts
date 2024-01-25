

/* class BeholderStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const beholderActions: RoleActionType[] = []

    // Only ID 9 is active
    if (
      isCardSelectedById(this.deck, 9) &&
      !isCardSelectedById(this.deck, 18)
    ) {
      beholderActions.push(
        {
          text: beholder.beholder_seer_wake_text,
          time: BASE_TIME,
          image: 'onub_beholder',
        },
        generateTimedAction(2 * ACTION_TIME)
      )

      //Doppelganger
      if (isCardSelectedById(this.deck, 1)) {
        beholderActions.push(
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          },
          {
            text: doppelganger.doppelganger_beholder_seer_wake_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          },
          generateTimedAction(2 * ACTION_TIME),
          {
            text: beholder.beholder_seer_thumbaway_text,
            time: BASE_TIME,
            image: 'onuw_seer',
          },
          {
            text: doppelganger.doppelganger_close_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          }
        )
      } else {
        beholderActions.push(
          {
            text: beholder.beholder_seer_thumbaway_text,
            time: BASE_TIME,
            image: 'onuw_seer',
          },
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          }
        )
      }
    }

    // Only ID 18 is active
    if (
      isCardSelectedById(this.deck, 18) &&
      !isCardSelectedById(this.deck, 9)
    ) {
      beholderActions.push(
        {
          text: beholder.beholder_apprenticeseer_wake_text,
          time: BASE_TIME,
          image: 'onub_beholder',
        },
        generateTimedAction(2 * ACTION_TIME)
      )

      //Doppelganger
      if (isCardSelectedById(this.deck, 1)) {
        beholderActions.push(
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          },
          {
            text: doppelganger.doppelganger_beholder_apprenticeseer_wake_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          },
          generateTimedAction(2 * ACTION_TIME),
          {
            text: beholder.beholder_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
            image: 'onud_apprentice_seer',
          },
          {
            text: doppelganger.doppelganger_close_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          }
        )
      } else {
        beholderActions.push(
          {
            text: beholder.beholder_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
            image: 'onud_apprentice_seer',
          },
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
            image: 'onub_beholder',
          }
        )
      }
    }

    // Both ID 9 and ID 18 are active
    if (isCardSelectedById(this.deck, 9) && isCardSelectedById(this.deck, 18)) {
      beholderActions.push(
        {
          text: beholder.beholder_seer_apprenticeseer_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(2 * ACTION_TIME)
      )

      //Doppelganger
      if (isCardSelectedById(this.deck, 1)) {
        beholderActions.push(
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
            image: 'onub_beholder',
          },
          {
            text: doppelganger.doppelganger_beholder_seer_apprenticeseer_wake_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          },
          generateTimedAction(2 * ACTION_TIME),
          {
            text: beholder.beholder_seer_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
            image: 'onuw_seer',
          },
          {
            text: doppelganger.doppelganger_close_text,
            time: BASE_TIME,
            image: 'onuw_doppelganger',
          }
        )
      } else {
        beholderActions.push(
          {
            text: beholder.beholder_seer_apprenticeseer_thumbaway_text,
            time: BASE_TIME,
            image: 'onuw_seer',
          },
          {
            text: beholder.beholder_close_text,
            time: BASE_TIME,
            image: 'onub_beholder',
          }
        )
      }
    }

    return beholderActions
  }
} */

