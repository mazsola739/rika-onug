exports.oracle = "oracle_kickoff_text"
exports.random_oracle = [
  "random_oracle_aliens", //yes no question - update if alien team
  "random_oracle_werewolf", //yes no question - update if werewolf team
  "random_oracle_vampire", //yes no question - update if vampire team
  "random_oracle_alienexchange", //yes no, if yes: make sure aliens get card exchange action! (swap now?), if no make sure they not gets exchange action - no update
  "random_oracle_exchange", //yes no, if yes select center card and swap, - update known and actual card
  "random_oracle_center", //YES NO, if yes select up to 3 cards from center, show - no update
  "random_oracle_ripple", //yes no, make sure ripple or not from answer - no update
  "random_oracle_evenodd", //tell everyone if oracle even or odd number
  "random_oracle_playernum", //choose player number, and show the selected player
  "random_oracle_number" //guess number
]
exports.random_oracle_aliens = [
  "oracle_alienteam_text",
  "oracle_alienteam_yes_text",
  "oracle_alienteam_yes2_text",
  "oracle_teamswitch_yes_text",
  "oracle_teamswitch_no_text",
]
exports.random_oracle_werewolf = [
  "oracle_werewolfteam_text",
  "oracle_werewolfteam_yes_text",
  "oracle_teamswitch_yes_text",
  "oracle_teamswitch_no_text",
  "random_oracle_evenodd",
  "random_oracle_playernum",
  "random_oracle_number",
]
exports.random_oracle_vampire = [
  "oracle_vampireteam_text",
  "oracle_vampireteam_yes_text",
  "oracle_teamswitch_yes_text",
  "oracle_teamswitch_no_text",
]
exports.random_oracle_alienexchange = [
  "oracle_alienexchange_text",
  "oracle_alienexchange_yes_text",
  "oracle_alienexchange_no_text",
]
exports.random_oracle_exchange = [
  "oracle_centerexchange_text",
  "oracle_teamswitch_no_text",
  "oracle_centerexchange_yes_text",
  "oracle_centerexchange_yes2_text",
]
exports.random_oracle_center = [
  "oracle_viewcenter_text",
  "oracle_ripple_no_text",
  "oracle_view_yes1_text",
  "oracle_view_yes2_text",
  "oracle_view_yes3_text",
]
exports.random_oracle_ripple = [
  "oracle_ripple_text",
  "oracle_ripple_yes_text",
  "oracle_ripple_no_text",
]
exports.random_oracle_evenodd = [
  "oracle_evenodd_text",
  "oracle_evenodd_odd_text",
  "oracle_evenodd_even_text",
]
exports.random_oracle_playernum = [
  "oracle_viewplayer_text",
  "oracle_viewplayer_result_text",
  "oracle_viewplayer_result2_text",
]
exports.random_oracle_number = [
  "oracle_guessnumber_text",
  "oracle_guessnumber_success_text",
  "oracle_guessnumber_failure_text",
]

exports.oracle = {}

/*   generateActions(): RoleActionType[] {
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
  } */