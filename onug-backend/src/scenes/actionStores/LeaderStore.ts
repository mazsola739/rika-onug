/* 
class LeaderStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const leaderActions: RoleActionType[] = []

    leaderActions.push(
      {
        text: leader.leader_wake_text,
        time: BASE_TIME,
        image: 'onua_leader',
      },
      generateTimedAction(ACTION_TIME),

      ...(areAllCardsSelectedById(this.deck, [47, 54])
        ? zerbgroobStore.generateActions()
        : []),
      {
        text: leader.leader_close_text,
        time: BASE_TIME,
        image: 'onua_leader',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      leaderActions.push(
        {
          text: doppelganger.doppelganger_leader_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        areAllCardsSelectedById(this.deck, [47, 54]) && {
          text: doppelganger.doppelganger_leader_zerbgroob_text,
          time: BASE_TIME,
          image: 'onua_zerb_alien',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return leaderActions
  }
}
 */