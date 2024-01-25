
/* class SwitcherooStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const switcherooActions: RoleActionType[] = []

    switcherooActions.push(
      {
        text: switcheroo.switcheroo_wake_text,
        time: BASE_TIME,
        image: 'onus_switcheroo',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: switcheroo.switcheroo_close_text,
        time: BASE_TIME,
        image: 'onus_switcheroo',
      }
    )

    return switcherooActions
  }
}
 */