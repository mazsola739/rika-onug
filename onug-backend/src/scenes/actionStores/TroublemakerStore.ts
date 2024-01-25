/* 
class TroublemakerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const troublemakerActions: RoleActionType[] = []

    troublemakerActions.push(
      {
        text: troublemaker.troublemaker_wake_text,
        time: BASE_TIME,
        image: 'onuw_troublemaker',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: troublemaker.troublemaker_close_text,
        time: BASE_TIME,
        image: 'onuw_troublemaker',
      }
    )

    return troublemakerActions
  }
}
 */