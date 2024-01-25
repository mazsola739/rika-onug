
/* class SquireStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const squireActions: RoleActionType[] = []

    squireActions.push(
      {
        text: squire.squire_wake_text,
        time: BASE_TIME,
        image: 'onub_squire',
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: squire.squire_close_text,
        time: BASE_TIME,
        image: 'onub_squire',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      squireActions.push(
        {
          text: doppelganger.doppelganger_squire_wake_text,
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

    squireActions.push({
      text: squire.squire_thumbaway_text,
      time: BASE_TIME,
      image: 'onuw_werewolf',
    })

    return squireActions
  }
} */
