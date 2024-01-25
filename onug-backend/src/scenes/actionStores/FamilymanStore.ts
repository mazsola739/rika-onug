/* 
class FamilymanStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const familymanActions: RoleActionType[] = []

    const firstActionKey = selectRandomKey(familyman_wake)

    const getSecondActionText = (key: string): string => {
      if (key.includes('1p')) {
        return familyman_close.familyman_is_end_text
      } else {
        return familyman_close.familyman_are_end_text
      }
    }

    familymanActions.push(
      {
        text: familyman_wake[firstActionKey as keyof typeof familyman_wake],
        time: BASE_TIME,
        image: 'onub_family_man',
      },
      {
        text: getSecondActionText(firstActionKey),
        time: BASE_TIME,
        image: 'onub_family_man',
      }
    )

    return familymanActions
  }
}
 */