exports.ripple = "ripple_intro_text"
exports.ripple_random = [
  "random_ripple_1minute", //vote time only 1 minute
  "random_ripple_repeat", //repeat the night with 1 person see everything
  "random_ripple_repeat1p", //repeat the night action for 1 player
  "random_ripple_insomniac", //selected players 
  "random_ripple_nospeak",
  "random_ripple_faceaway",
  "random_ripple_troublemaker",
  "random_ripple_steal",
  "random_ripple_witch",
  "random_ripple_view1",
  "random_ripple_view2",
  "random_ripple_reveal",
  "random_ripple_dualview",
  "random_ripple_twovote",
  "random_ripple_shuffle",
  "random_ripple_drunk",
  "random_ripple_voteapp",
  "random_ripple_repeatrole",
  "random_ripple_iamalien",
]
exports.random_ripple_1minute = "ripple_1minute_text"
exports.random_ripple_repeat = ["ripple_repeat_text", "ripple_repeat_2_text"]
exports.random_ripple_repeat1p = [
  "ripple_repeat_text",
  "ripple_repeat_2_text",
  "ripple_openeyes_text",
]
exports.random_ripple_insomniac = "ripple_insomniac_text"
exports.random_ripple_nospeak = "ripple_nospeak_text"
exports.random_ripple_faceaway = "ripple_faceaway_text"
exports.random_ripple_troublemaker = [
  "ripple_troublemaker_text",
  "ripple_troublemaker_end_text",
]
exports.random_ripple_steal = ["ripple_robber_text", "ripple_robber_end_text"]
exports.random_ripple_witch = "ripple_witch_text"
exports.random_ripple_view1 = "ripple_view1_text"
exports.random_ripple_view2 = "ripple_view2_text"
exports.random_ripple_reveal = [
  "ripple_revealer_text",
  "ripple_revealer_end_text",
]
exports.random_ripple_dualview = ["ripple_dualseer_text", "ripple_view2_text"]
exports.random_ripple_twovote = "ripple_doublevote_text"
exports.random_ripple_shuffle = [
  "ripple_dualshuffle1_text",
  "ripple_dualshuffle2_text",
  "ripple_dualshuffle3_text",
]
exports.random_ripple_drunk = ["ripple_drunk_text", "ripple_drunk_end_text"]
exports.random_ripple_voteapp = "ripple_app_text"
exports.random_ripple_repeatrole = "ripple_repeatrole_text"
exports.random_ripple_iamalien = "ripple_iamalien_text"
/* 
export const rippleStoreAnyKeys: string[] = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]

export const rippleStoreAllKeys: string[] = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]

export const rippleNeighborKeys: string[] = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

export const rippleCenterAnyKeys: string[] = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_center_text',
]
 */
exports.rippleAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'activePlayers',
]
exports.rippleAllKeys = [
  'identifier_everyone_text',
  'identifier_oddplayers_text',
  'identifier_evenplayers_text',
  'activePlayers',
]
exports.rippleNeighborKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]
exports.rippleCenterAnyKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_center_text',
]
const identifier_player = [
  "identifier_player1_text",
  "identifier_player2_text",
  "identifier_player3_text",
  "identifier_player4_text",
  "identifier_player5_text",
  "identifier_player6_text",
  "identifier_player7_text",
  "identifier_player8_text",
  "identifier_player9_text",
  "identifier_player10_text",
  "identifier_player11_text",
  "identifier_player12_text",
]

exports.ripple = () => [] //TODO

/*   const shuffleAndSplitDeck = (deck: ActionCardType[]): ActionCardType[] => {
  const shuffledDeck = shuffleCardsArray([...deck])
  const rippleDeck: ActionCardType[] = []

  rippleDeck.push(
    shuffledDeck.splice(getRandomNumber(0, shuffledDeck.length - 1), 1)[0]
  )

  while (shuffledDeck.length > 0) {
    const randomIndex = getRandomNumber(0, shuffledDeck.length - 1)
    if (Math.random() < 0.5) {
      rippleDeck.push(shuffledDeck.splice(randomIndex, 1)[0])
    } else {
      shuffledDeck.splice(randomIndex, 1)
    }
  }

  return rippleDeck
}

rippleDeck(): ActionCardType[] {
    const newdeck = [...this.deck]
    return shuffleAndSplitDeck(newdeck)
  }

  generateActions(): RoleActionType[] {
    const rippleActions: RoleActionType[] = []

    const random1Player = pickRandomOnePlayer(this.totalPlayers)
    const random2Players = pickRandomTwoPlayers(this.totalPlayers)
    const randomRippleAllKey = getRandomItemFromArray(rippleStoreAllKeys)
    const chosenRippleAllText =
      identifier[randomRippleAllKey as keyof typeof identifier] ||
      (randomRippleAllKey === 'activePlayers'
        ? pickRandomUpToThreePlayers(selectedDeckStore.totalPlayers, 'and')
        : randomRippleAllKey)

    const randomRippleAnyKey = getRandomItemFromArray(rippleStoreAnyKeys)
    const chosenRippleAnyText =
      identifier[randomRippleAnyKey as keyof typeof identifier] ||
      (randomRippleAnyKey === 'activePlayers'
        ? pickRandomUpToThreePlayers(selectedDeckStore.totalPlayers, 'or')
        : randomRippleAnyKey)

    const randomRippleNeighborKey = getRandomItemFromArray(rippleNeighborKeys)
    const chosenRippleNeighborText =
      identifier[randomRippleNeighborKey as keyof typeof identifier]

    const randomRippleCenterAnyKey = getRandomItemFromArray(rippleCenterAnyKeys)
    const randomRippleCenterAnyText: string =
      identifier[randomRippleCenterAnyKey]

    if (randomActionKey === 'random_ripple_none') {
      rippleActions
    } else {
      rippleActions.push({
        text: `RIPPLE: ${ripple.ripple_intro_text}`,
        time: BASE_TIME,
        image: '',
      })

      if (randomActionKey === 'random_ripple_1minute') {
        rippleActions.push({
          text: random_ripple_1minute.ripple_1minute_text,
          time: BASE_TIME,
          image: '',
        })
      }

      if (randomActionKey === 'random_ripple_repeat') {
        rippleActions.push(
          {
            text: random_ripple_repeat.ripple_repeat_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_repeat.ripple_repeat_2_text,
            time: BASE_TIME,
            image: '',
          }
        )
      }

      if (randomActionKey === 'random_ripple_repeat1p') {
        rippleActions.push(
          {
            text: random_ripple_repeat1p.ripple_repeat_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_repeat1p.ripple_repeat_2_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_repeat1p.ripple_openeyes_text,
            time: BASE_TIME,
            image: '',
          }
        )
      }

      if (randomActionKey === 'random_ripple_insomniac') {
        rippleActions.push(
          {
            text: chosenRippleAllText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_insomniac.ripple_insomniac_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_nospeak') {
        rippleActions.push(
          {
            text: chosenRippleAllText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_nospeak.ripple_nospeak_text,
            time: BASE_TIME,
            image: '',
          }
        )
      }

      if (randomActionKey === 'random_ripple_faceaway') {
        rippleActions.push(
          {
            text: chosenRippleAllText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_faceaway.ripple_faceaway_text,
            time: BASE_TIME,
            image: '',
          }
        )
      }

      if (randomActionKey === 'random_ripple_troublemaker') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_troublemaker.ripple_troublemaker_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random2Players,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_troublemaker.ripple_troublemaker_end_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_steal') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_steal.ripple_robber_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: chosenRippleAnyText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_steal.ripple_robber_end_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_witch') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_witch.ripple_witch_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: chosenRippleAnyText,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_view1') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_view1.ripple_view1_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: chosenRippleAnyText,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_view2') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_view2.ripple_view2_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: chosenRippleAnyText,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_reveal') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_reveal.ripple_revealer_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: chosenRippleNeighborText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_reveal.ripple_revealer_end_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_dualview') {
        const interactionText = getRandomItemFromArray([
          'ripple_dualseer_text',
          'ripple_view2_text',
        ])
        rippleActions.push(
          {
            text: random2Players,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_dualview[interactionText],
            time: BASE_TIME,
            image: '',
          },
          {
            text: randomRippleCenterAnyText,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_twovote') {
        rippleActions.push(
          {
            text: chosenRippleAllText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_twovote.ripple_doublevote_text,
            time: BASE_TIME,
            image: '',
          }
        )
      }

      if (randomActionKey === 'random_ripple_shuffle') {
        const randomShuffle2Players = pickRandomTwoPlayersArray(
          this.totalPlayers
        )
        const randomPlayer1 = randomShuffle2Players[0]
        const randomPlayer2 = randomShuffle2Players[1]

        rippleActions.push(
          {
            text: `${randomPlayer1} and ${randomPlayer2}`,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_shuffle.ripple_dualshuffle1_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: randomPlayer1,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME),
          {
            text: randomPlayer1,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_shuffle.ripple_dualshuffle2_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: randomPlayer2,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_shuffle.ripple_dualshuffle3_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_drunk') {
        rippleActions.push(
          {
            text: random1Player,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_drunk.ripple_drunk_text,
            time: BASE_TIME,
            image: '',
          },
          {
            text: chosenRippleAnyText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_drunk.ripple_drunk_end_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_voteapp') {
        rippleActions.push({
          text: random_ripple_voteapp.ripple_app_text,
          time: BASE_TIME,
          image: '',
        })
      }

      if (randomActionKey === 'random_ripple_repeatrole') {
        const repeatrole: RepeatroleType[] = [
          {
            name: 'role_aliens',
            isExist: areAnyCardSelectedById(
              this.deck,
              [42, 43, 47, 53, 54, 74]
            ),
            specialCondition: () => !alienStore.isNewAlienOrHelper,
          },
          {
            name: 'role_alphawolf',
            isExist: isCardSelectedById(this.deck, 17),
          },
          {
            name: 'role_apprenticeseer',
            isExist: isCardSelectedById(this.deck, 18),
          },
          { name: 'body_snatcher', isExist: isCardSelectedById(this.deck, 74) },
          { name: 'role_diseased', isExist: isCardSelectedById(this.deck, 7) },
          { name: 'role_drunk', isExist: isCardSelectedById(this.deck, 2) },
          { name: 'role_exposer', isExist: isCardSelectedById(this.deck, 46) },
          { name: 'role_gremlin', isExist: isCardSelectedById(this.deck, 33) },
          { name: 'role_insomniac', isExist: isCardSelectedById(this.deck, 4) },
          { name: 'role_marksman', isExist: isCardSelectedById(this.deck, 35) },
          {
            name: 'role_masons',
            isExist: areAllCardsSelectedById(this.deck, [5, 6]),
          },
          {
            name: 'role_mysticwolf',
            isExist: isCardSelectedById(this.deck, 22),
          },
          {
            name: 'role_nostradamus',
            isExist: isCardSelectedById(this.deck, 80),
          },
          {
            name: 'role_paranormalinvestigator',
            isExist: isCardSelectedById(this.deck, 23),
          },
          {
            name: 'role_pickpocket',
            isExist: isCardSelectedById(this.deck, 36),
          },
          { name: 'role_psychic', isExist: isCardSelectedById(this.deck, 51) },
          { name: 'role_revealer', isExist: isCardSelectedById(this.deck, 24) },
          { name: 'role_robber', isExist: isCardSelectedById(this.deck, 8) },
          { name: 'role_rascal', isExist: isCardSelectedById(this.deck, 52) },
          { name: 'role_seer', isExist: isCardSelectedById(this.deck, 9) },
          { name: 'role_thing', isExist: isCardSelectedById(this.deck, 85) },
          {
            name: 'role_troublemaker',
            isExist: isCardSelectedById(this.deck, 11),
          },
          {
            name: 'role_villageidiot',
            isExist: isCardSelectedById(this.deck, 26),
          },
          {
            name: 'role_werewolves',
            isExist: areAnyCardSelectedById(this.deck, [15, 16, 17, 22, 21]),
          },
          { name: 'role_witch', isExist: isCardSelectedById(this.deck, 27) },
        ]

        const roleText = getRandomRoleDisplayName(repeatrole)

        rippleActions.push(
          {
            text: roleText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_repeatrole.ripple_repeatrole_text,
            time: BASE_TIME,
            image: '',
          },
          generateTimedAction(2 * ACTION_TIME)
        )
      }

      if (randomActionKey === 'random_ripple_iamalien') {
        rippleActions.push(
          {
            text: chosenRippleAllText,
            time: BASE_TIME,
            image: '',
          },
          {
            text: random_ripple_iamalien.ripple_iamalien_text,
            time: BASE_TIME,
            image: '',
          }
        )
      }
    }

    return rippleActions
  }

  isRepeat(): boolean {
    return (
      randomActionKey === 'random_ripple_repeat' ||
      randomActionKey === 'random_ripple_repeat1p'
    )
  } */