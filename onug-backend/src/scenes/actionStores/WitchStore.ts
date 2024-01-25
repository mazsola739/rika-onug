/* 
class WitchStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const witchActions: RoleActionType[] = []

    witchActions.push(
      {
        text: witch.witch_wake_text,
        time: BASE_TIME,
        image: 'onud_witch',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: witch.witch_close_text,
        time: BASE_TIME,
        image: 'onud_witch',
      }
    )

    return witchActions
  }
}
 */