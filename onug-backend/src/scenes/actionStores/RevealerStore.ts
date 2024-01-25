
/* class RevealerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const revealerActions: RoleActionType[] = []

    revealerActions.push(
      {
        text: revealer.revealer_wake_text,
        time: BASE_TIME,
        image: 'onud_revealer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: revealer.revealer_close_text,
        time: BASE_TIME,
        image: 'onud_revealer',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      revealerActions.push(
        {
          text: doppelganger.doppelganger_revealer_wake_text,
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

    return revealerActions
  }
}
 */