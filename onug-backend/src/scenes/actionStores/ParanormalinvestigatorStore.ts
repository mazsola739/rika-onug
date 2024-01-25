/* 

class ParanormalinvestigatorStore {
  constructor() {
    makeAutoObservable(this)
  }

  get hasDusk(): boolean {
    return selectedDeckStore.hasDusk()
  }

  generateActions(): RoleActionType[] {
    const paranormalinvestigatorActions: RoleActionType[] = []

    paranormalinvestigatorActions.push(
      {
        text: this.hasDusk
          ? paranormalinvestigator.paranormalinvestigator_duskwake_text
          : paranormalinvestigator.paranormalinvestigator_wake_text,
        time: BASE_TIME,
        image: 'onud_paranormal_investigator',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: paranormalinvestigator.paranormalinvestigator_close_text,
        time: BASE_TIME,
        image: 'onud_paranormal_investigator',
      }
    )

    return paranormalinvestigatorActions
  }
} */