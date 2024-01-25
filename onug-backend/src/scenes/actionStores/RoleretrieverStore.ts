
/* class RoleretrieverStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const roleretrieverActions: RoleActionType[] = []

    roleretrieverActions.push(
      {
        text: roleretriever.roleretriever_wake_1_text,
        time: BASE_TIME,
        image: 'onus_role_retriever',
      },
      {
        text: roleretriever.roleretriever_wake_2_text,
        time: BASE_TIME,
        image: 'onus_role_retriever',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: roleretriever.roleretriever_close_text,
        time: BASE_TIME,
        image: 'onus_role_retriever',
      }
    )

    return roleretrieverActions
  }
}
 */