
/* 
class OracleStore {
  constructor() {
    makeAutoObservable(this)
  }

  generateActions(): RoleActionType[] {
    const oracleActions: RoleActionType[] = []

    const randomOracKey = selectRandomKey(random_orac)
    const randomNumber = getRandomNumber(1, 10)
    const randomAction = random_oracle[randomOracKey]
    const randomActionIntro = Object.values(randomAction)[0]

    const randomOracleAction: RoleActionType[] = [
      { text: randomActionIntro, time: BASE_TIME, image: 'onua_oracle' },
      generateTimedAction(ACTION_TIME),
    ]

    const player = (answerPlayer: number) => {
      const totalPlayers = selectedDeckStore.totalPlayers

      const randomAnswerKey = getRandomItemFromArray(oracleResultKeys)

      const randomText =
        random_oracle.random_oracle_playernum[
          randomAnswerKey as keyof typeof random_oracle.random_oracle_playernum
        ]

      const answer = [
        { text: randomText, time: BASE_TIME, image: 'onua_oracle' },
      ]

      if (randomAnswerKey === 'oracle_viewplayer_result_text') {
        return answer.push({
          text: `Player ${answerPlayer}`,
          time: BASE_TIME,
          image: 'onua_oracle',
        })
      } else if (randomAnswerKey === 'oracle_viewplayer_result2_text') {
        return answer.push({
          text: `Player ${getRandomNumber(1, totalPlayers)}`,
          time: BASE_TIME,
          image: 'onua_oracle',
        })
      }

      return randomOracleAction.push(...answer)
    }

    const evenOdd = (answerEvenOdd: string) => {
      const action = [
        {
          text: randomAction[`oracle_evenodd_${answerEvenOdd}_text`],
          time: BASE_TIME,
          image: 'onua_oracle',
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
          time: BASE_TIME,
          image: 'onua_oracle',
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
        answerKey = yesAnswers[getRandomNumber(0, yesAnswers.length - 1)]
      } else {
        const noAnswers = Object.keys(randomAction).filter((key) =>
          key.includes('no')
        )
        answerKey = noAnswers[getRandomNumber(0, noAnswers.length - 1)]
      }

      const answer = [
        {
          text: randomAction[answerKey as keyof typeof randomAction],
          time: BASE_TIME,
          image: 'onua_oracle',
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
        image: 'onua_oracle',
      },
      ...randomOracleAction,
      {
        text: oracle.oracle_close_text,
        time: BASE_TIME,
        image: 'onua_oracle',
      }
    )

    return oracleActions
  }
} */

