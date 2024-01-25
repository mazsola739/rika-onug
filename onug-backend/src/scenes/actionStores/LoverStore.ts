/* 
class LoverStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const loversActions: RoleActionType[] = []

    loversActions.push(
      {
        text: lovers.lovers_wake_text,
        time: BASE_TIME,
        image: 'markoflove',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: lovers.lovers_close_text,
        time: BASE_TIME,
        image: 'markoflove',
      }
    )

    return loversActions
  }
}
 */