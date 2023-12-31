import { BASE_TIME, oracle, random_orac, random_oracle } from 'constant'
import { selectedDeckStore } from 'store'
import { RoleActionType } from 'types'
import { actionStoreUtils } from 'utils'

//todo random_oracle_alienexchange effect on aliens
//todo random_oracle_ripple effect on ripple
//todo random_oracle_number effect on wining condition
const YESNO = 'yes' //todo delete
const EVENODD = 'even' //todo delete
const NUMBER = 1 //todo delete
const PLAYER = 1 //todo delete

const {
  generateTimedAction,
  getRandomIndexFromArray,
  getRandomKeyFromObject,
  getRandomNumber,
} = actionStoreUtils

class OracleStore {
  actionTime: number

  constructor(actionTime = 10) {
    this.actionTime = actionTime
  }

  generateActions(): RoleActionType[] {
    const oracleActions: RoleActionType[] = []

    const randomOracKey = getRandomKeyFromObject(random_orac)
    const randomNumber = getRandomNumber(1, 10)
    const randomAction = random_oracle[randomOracKey]
    const randomActionIntro = Object.values(randomAction)[0]

    const randomOracleAction: RoleActionType[] = [
      { text: randomActionIntro, time: BASE_TIME },
      generateTimedAction(this.actionTime),
    ]

    const player = (answerPlayer: number) => {
      const totalPlayers = selectedDeckStore.totalPlayers

      const resultKeys = [
        'oracle_viewplayer_result_text',
        'oracle_viewplayer_result2_text',
      ]

      const randomAnswerKey =
        resultKeys[Math.floor(Math.random() * resultKeys.length)]

      const randomText =
        random_oracle.random_oracle_playernum[
          randomAnswerKey as keyof typeof random_oracle.random_oracle_playernum
        ]

      const answer = [{ text: randomText, time: BASE_TIME }]

      if (randomAnswerKey === 'oracle_viewplayer_result_text') {
        return answer.push({ text: `Player ${answerPlayer}`, time: BASE_TIME })
      } else if (randomAnswerKey === 'oracle_viewplayer_result2_text') {
        return answer.push({
          text: `Player ${getRandomNumber(1, totalPlayers)}`,
          time: BASE_TIME,
        })
      }

      return randomOracleAction.push(...answer)
    }

    const evenOdd = (answerEvenOdd: string) => {
      const action = [
        {
          text: randomAction[`oracle_evenodd_${answerEvenOdd}_text`],
          time: BASE_TIME,
        },
      ]

      return randomOracleAction.push(...action)
    }

    const guessNumber = (answerNumber: number) => {
      const action = [
        {
          text: randomAction[
            randomNumber === answerNumber
              ? 'oracle_guessnumber_success_text'
              : 'oracle_guessnumber_failure_text'
          ],
          time: 5,
        },
      ]

      return randomOracleAction.push(...action)
    }

    const yesNo = (answerYesNo: string) => {
      let answerKey: string

      if (answerYesNo === 'yes') {
        const yesAnswers = Object.keys(randomAction).filter((key) =>
          key.includes('yes')
        )
        answerKey = yesAnswers[getRandomIndexFromArray(yesAnswers)]
      } else {
        const noAnswers = Object.keys(randomAction).filter((key) =>
          key.includes('no')
        )
        answerKey = noAnswers[getRandomIndexFromArray(noAnswers)]
      }

      const answer = [
        {
          text: randomAction[answerKey as keyof typeof randomAction],
          time: BASE_TIME,
        },
      ]

      return randomOracleAction.push(...answer)
    }

    if (randomOracKey === 'random_oracle_playernum') {
      player(PLAYER)
    } else if (randomOracKey === 'random_oracle_evenodd') {
      evenOdd(EVENODD)
    } else if (randomOracKey === 'random_oracle_number') {
      guessNumber(NUMBER)
    } else {
      yesNo(YESNO)
    }

    oracleActions.push(
      {
        text: oracle.oracle_wake_text,
        time: BASE_TIME,
      },
      ...randomOracleAction,
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
