/* 
class SeerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const seerActions: RoleActionType[] = []

    seerActions.push(
      {
        text: seer.seer_wake_text,
        time: BASE_TIME,
        image: 'onuw_seer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: seer.seer_close_text,
        time: BASE_TIME,
        image: 'onuw_seer',
      }
    )

    return seerActions
  }
}
 */