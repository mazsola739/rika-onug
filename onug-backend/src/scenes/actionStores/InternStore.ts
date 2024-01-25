/* 
class InternStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const internActions: RoleActionType[] = []

    if (isCardSelectedById(this.deck, 63)) {
      internActions.push(
        {
          text: intern.intern_wake_1_text,
          time: BASE_TIME,
          image: 'onus_intern',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: intern.intern_wake_2_text,
          time: BASE_TIME,
          image: 'onus_intern',
        }
      )
    } else {
      internActions.push({
        text: intern.intern_wake_alone_text,
        time: BASE_TIME,
        image: 'onus_intern',
      })
    }

    internActions.push({
      text: intern.intern_close_text,
      time: BASE_TIME,
      image: 'onus_intern',
    })

    return internActions
  }
}
 */