
/* class MarksmanStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const marksmanActions: RoleActionType[] = []

    marksmanActions.push(
      {
        text: marksman.marksman_wake_text,
        time: BASE_TIME,
        image: 'onuv_marksman',
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: marksman.marksman_close_text,
        time: BASE_TIME,
        image: 'onuv_marksman',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      marksmanActions.push(
        {
          text: doppelganger.doppelganger_marksman_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(2 * ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return marksmanActions
  }
}
 */