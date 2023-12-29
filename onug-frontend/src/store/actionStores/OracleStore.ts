import { BASE_TIME, oracle, random_orac, random_oracle } from 'constant'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//todo randomization

type OracleKeys = keyof typeof random_oracle

const ANSWER = 'yes' //todo delete
const NUMBER = 1 //todo delete

const { generateTimedAction, getRandomKeyFromObject } = actionStoreUtils

class OracleStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const oracleActions: RoleActionType[] = []

    /*    const actionKey: OracleKeys = getRandomKeyFromObject(
      random_orac
    ) as OracleKeys

     const getRandomAction = (): RoleActionType[] => {
      const actionObject = random_oracle[actionKey]
      const actionKeys = Object.keys(actionObject)
      const firstElement =
        actionObject[actionKeys[0] as keyof typeof actionObject]
      const result: RoleActionType = {
        text: firstElement,
        time: BASE_TIME,
      }

      return [result]
    }

    const getRandomOracleAction = (
      answer: string | number
    ): RoleActionType[] => {
      const actionObject = random_oracle[randomActionKey]
      const actionKeys = Object.keys(actionObject)
      const firstElementKey = actionKeys[0]

      if (firstElementKey === 'answer_yes' || firstElementKey === 'answer_no') {
        const answerKey = answer === 'yes' ? 'answer_yes' : 'answer_no'
        const possibleAnswers = actionObject[answerKey]
        const possibleAnswersKeys = Object.keys(possibleAnswers)
        const randomAnswerKey =
          possibleAnswersKeys[
            Math.floor(Math.random() * possibleAnswersKeys.length)
          ]
        const randomYesNoAnswer = possibleAnswers[randomAnswerKey]
        return [{ text: randomYesNoAnswer, time: BASE_TIME }]
      }

      if (
        firstElementKey === 'oracle_evenodd_odd_text' ||
        firstElementKey === 'oracle_evenodd_even_text'
      ) {
        return [
          {
            text: random_oracle.random_oracle_evenodd[
              `oracle_evenodd_${answer}_text`
            ],
            time: BASE_TIME,
          },
        ]
      }

      if (
        firstElementKey === 'oracle_guessnumber_success_text' ||
        firstElementKey === 'oracle_guessnumber_failure_text'
      ) {
        const randomNumber = Math.floor(Math.random() * 10) + 1 // Random number between 1 to 10
        if (randomNumber === answer) {
          return [
            {
              text: random_oracle.random_oracle_number
                .oracle_guessnumber_success_text,
              time: BASE_TIME,
            },
          ]
        } else {
          return [
            {
              text: random_oracle.random_oracle_number
                .oracle_guessnumber_failure_text,
              time: BASE_TIME,
            },
          ]
        }
      }

      throw new Error('Unhandled action key')
    } */

    oracleActions.push(
      {
        text: oracle.oracle_wake_text,
        time: BASE_TIME,
      },
      /*     ...randomAction, */
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
