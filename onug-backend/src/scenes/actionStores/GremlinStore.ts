/* 
class GremlinStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const gremlinActions: RoleActionType[] = []

    gremlinActions.push(
      {
        text: gremlin.gremlin_wake_text,
        time: BASE_TIME,
        image: 'onuv_gremlin',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: gremlin.gremlin_close_text,
        time: BASE_TIME,
        image: 'onuv_gremlin',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      gremlinActions.push(
        {
          text: doppelganger.doppelganger_gremlin_wake_text,
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

    return gremlinActions
  }
}
 */