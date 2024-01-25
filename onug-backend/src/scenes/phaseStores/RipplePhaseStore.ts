

/* class RipplePhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  get totalPlayers(): number {
    return selectedDeckStore.totalPlayers
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
  }
}
 */
