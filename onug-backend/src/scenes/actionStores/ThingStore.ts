/* 
class ThingStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const thingActions: RoleActionType[] = []

    thingActions.push(
      {
        text: thing.thing_wake_text,
        time: BASE_TIME,
        image: 'onub_thing',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: thing.thing_close_text,
        time: BASE_TIME,
        image: 'onub_thing',
      }
    )

    return thingActions
  }
} */
