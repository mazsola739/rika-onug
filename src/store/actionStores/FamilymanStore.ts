import { BASE_TIME, familyman_close, familyman_wake } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

const { getRandomKeyFromObject } = actionStoreUtils

class FamilymanStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const familymanActions: RoleActionType[] = []

    const firstActionKey = getRandomKeyFromObject(familyman_wake)

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
      },
      {
        text: getSecondActionText(firstActionKey),
        time: BASE_TIME,
      }
    )

    return familymanActions
  }
}

export default FamilymanStore
export const familymanStore = new FamilymanStore()
