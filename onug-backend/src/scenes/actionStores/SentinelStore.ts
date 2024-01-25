/* 
class SentinelStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const sentinelActions: RoleActionType[] = []

    sentinelActions.push(
      {
        text: sentinel.sentinel_wake_text,
        time: BASE_TIME,
        image: 'onud_sentinel',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: sentinel.sentinel_close_text,
        time: BASE_TIME,
        image: 'onud_sentinel',
      }
    )

    return sentinelActions
  }
}
 */