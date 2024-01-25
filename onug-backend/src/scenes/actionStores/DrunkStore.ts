/* 
class DrunkStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const drunkActions: RoleActionType[] = []

    drunkActions.push(
      {
        text: drunk.drunk_wake_text,
        time: BASE_TIME,
        image: 'onuw_drunk',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: drunk.drunk_close_text,
        time: BASE_TIME,
        image: 'onuw_drunk',
      }
    )

    return drunkActions
  }
}
 */