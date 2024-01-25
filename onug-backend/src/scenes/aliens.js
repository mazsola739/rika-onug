const aliens = "alien_kickoff_text" 
const random_aliens = [
  "alien_view_text", 
  "alien_allview_text", 
  "alien_stare_text",
  "alien_left_text",
  "alien_right_text", 
  "alien_show_text", 
  "alien_timer_text", 
  "alien_newalien_text", 
  "alien_alienhelper_text", 
]
const alienAnyKeys = [
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "activePlayers", 
]
const alienAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
]

exports.aliens = () => []

//TODO
/* generateActions(): RoleActionType[] {
    const alienActions: RoleActionType[] = []
    const chosenAlienActions: RoleActionType[] = []

    const chosenAlienActionKey = selectRandomKey(random_aliens)

    if (chosenAlienActionKey.includes('view')) {
      const identifierKey = getRandomItemFromArray(alienStoreAnyKeys)
      const playerText: string =
        identifierKey === 'activePlayers'
          ? pickRandomUpToThreePlayers(totalPlayers, 'or')
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
      ...(isCardSelectedById(selected cards, 45) ? cowStore.generateActions() : []),
      { text: aliens.alien_close_text, time: BASE_TIME, image: 'onua_alien' }
    )

    return alienActions
  } */