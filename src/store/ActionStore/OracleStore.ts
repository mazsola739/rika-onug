import { BASE_TIME, oracle, random_orac, random_oracle } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//todo randomization
type OracleActionKeys = keyof typeof random_orac
const { generateTimedAction, getRandomKeyFromObject } = actionStoreUtils

class OracleStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const oracleActions: RoleActionType[] = []

    const firstActionKey: OracleActionKeys = getRandomKeyFromObject(random_orac)
    const getAction =
      random_oracle[firstActionKey as keyof typeof random_oracle]

    const transformToDesiredFormat = (
      data: Record<string, string>
    ): RoleActionType[] => {
      const transformedData: RoleActionType[] = []

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          transformedData.push({ text: data[key], time: BASE_TIME })
        }
      }

      return transformedData
    }

    const actions: RoleActionType[] = []

    switch (firstActionKey) {
      case 'random_oracle_aliensen':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_werewolf':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_vampire':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_aliensenexchange':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_exchange':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_center':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_ripple':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_evenodd':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_playernum':
        actions.push(...transformToDesiredFormat(getAction))
        break
      case 'random_oracle_number':
        actions.push(...transformToDesiredFormat(getAction))
        break
      default:
        actions.push(...transformToDesiredFormat(getAction))
        break
    }

    oracleActions.push(
      {
        text: oracle.oracle_wake_text,
        time: BASE_TIME,
      },
      ...actions,
      generateTimedAction(this.actionTime),
      {
        text: oracle.oracle_close_text,
        time: BASE_TIME,
      }
    )

    return oracleActions
  }
}

export default OracleStore
export const oracleStore = new OracleStore()
