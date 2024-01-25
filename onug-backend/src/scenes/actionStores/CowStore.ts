/* 
class CowStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const cowActions: RoleActionType[] = []

    cowActions.push(
      { text: cow.cow_fistout_text, time: BASE_TIME, image: 'onua_cow' },
      generateTimedAction(ACTION_TIME),
      { text: cow.cow_fistaway_text, time: BASE_TIME, image: 'onua_cow' }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      cowActions.push(
        {
          text: doppelganger.doppelganger_cow_wake_text,
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

    return cowActions
  }
}
 */
