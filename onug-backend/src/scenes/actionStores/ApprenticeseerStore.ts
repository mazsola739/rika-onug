/* class ApprenticeseerStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const apprenticeseerActions: RoleActionType[] = []

    apprenticeseerActions.push(
      {
        text: apprenticeseer.apprenticeseer_wake_text,
        time: BASE_TIME,
        image: 'onud_apprentice_seer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: apprenticeseer.apprenticeseer_close_text,
        time: BASE_TIME,
        image: 'onud_apprentice_seer',
      }
    )

    return apprenticeseerActions
  }
} */

