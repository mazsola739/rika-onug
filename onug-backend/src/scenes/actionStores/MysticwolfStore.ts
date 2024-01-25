/* 
class MysticwolfStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const mysticwolfActions: RoleActionType[] = []

    mysticwolfActions.push(
      {
        text: mysticwolf.mysticwolf_wake_text,
        time: BASE_TIME,
        image: 'onud_mystic_wolf',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: mysticwolf.mysticwolf_close_text,
        time: BASE_TIME,
        image: 'onud_mystic_wolf',
      }
    )

    return mysticwolfActions
  }
}
 */