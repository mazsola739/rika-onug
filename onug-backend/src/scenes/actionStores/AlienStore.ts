

/* class AlienStore {
  isNewAlienOrHelper = false

  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  get totalPlayers(): number {
    return selectedDeckStore.totalPlayers
  }

  generateActions(): RoleActionType[] {
    const alienActions: RoleActionType[] = []
    const chosenAlienActions: RoleActionType[] = []

    const chosenAlienActionKey = selectRandomKey(random_aliens)

    if (chosenAlienActionKey.includes('view')) {
      const identifierKey = getRandomItemFromArray(alienStoreAnyKeys)
      const playerText: string =
        identifierKey === 'activePlayers'
          ? pickRandomUpToThreePlayers(this.totalPlayers, 'or')
          : identifier[identifierKey]

      chosenAlienActions.push(
        {
          text: random_aliens[chosenAlienActionKey],
          time: BASE_TIME,
          image: 'onua_alien',
        },
        { text: playerText, time: BASE_TIME, image: 'onua_alien' }
      )
    } else if (
      chosenAlienActionKey.includes('newalien') ||
      chosenAlienActionKey.includes('alienhelper')
    ) {
      this.isNewAlienOrHelper = true
      const playerKey = getRandomItemFromArray(alienStoreAllKeys)
      const playerText: string = identifier[playerKey]

      chosenAlienActions.push(
        { text: playerText, time: BASE_TIME, image: 'onua_alien' },
        {
          text: random_aliens[chosenAlienActionKey],
          time: BASE_TIME,
          image: 'onua_alien',
        }
      )
    } else {
      chosenAlienActions.push({
        text: random_aliens[chosenAlienActionKey],
        time: BASE_TIME,
        image: 'onua_alien',
      })
    }

    alienActions.push(
      { text: aliens.alien_wake_text, time: BASE_TIME, image: 'onua_alien' },
      ...chosenAlienActions,

      generateTimedAction(ACTION_TIME)
    )
    this.isNewAlienOrHelper &&
      alienActions.push({
        text: aliens.alien_fistaway_text,
        time: BASE_TIME,
        image: 'onua_alien',
      })
    alienActions.push(
      ...(isCardSelectedById(this.deck, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME, image: 'onua_alien' }
    )

    return alienActions
  }
} 
 */