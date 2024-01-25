
/* class ThecountStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const thecountActions: RoleActionType[] = []

    thecountActions.push(
      {
        text: thecount.thecount_wake_text,
        time: BASE_TIME,
        image: 'onuv_the_count',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: thecount.thecount_close_text,
        time: BASE_TIME,
        image: 'onuv_the_count',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      thecountActions.push(
        {
          text: doppelganger.doppelganger_thecount_wake_text,
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

    return thecountActions
  }
} */
