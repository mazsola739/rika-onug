/* 
class FlipperStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const flipperActions: RoleActionType[] = []

    flipperActions.push(
      {
        text: flipper.flipper_wake_text,
        time: BASE_TIME,
        image: 'onus_flipper',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: flipper.flipper_close_text,
        time: BASE_TIME,
        image: 'onus_flipper',
      }
    )

    return flipperActions
  }
}
 */