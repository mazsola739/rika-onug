exports.mortician = "mortician_kickoff_text" //doppelganger! show 1 or 2 neighbor cards - no update
exports.random_mortician = ["mortician_1card_text", "mortician_2cards_text"]

exports.mortician = {}

/* generateActions(): RoleActionType[] {
    const morticiansActions: RoleActionType[] = []

    const chosenMorticianKey = getRandomItemFromArray(morticianStoreAllKeys)
    const chosenMorticianText =
      identifier[chosenMorticianKey as keyof typeof identifier]

    const pushMorticianAction = (
      actionText: string,
      extraActionText?: string
    ) => {
      morticiansActions.push({
        text: actionText,
        time: BASE_TIME,
        image: 'onua_mortician',
      })
      if (extraActionText) {
        morticiansActions.push({
          text: extraActionText,
          time: BASE_TIME,
          image: 'onua_mortician',
        })
      }
    }
    const pushDoppelgangerMorticianAction = (
      actionText: string,
      extraActionText?: string
    ) => {
      morticiansActions.push({
        text: actionText,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      })
      if (extraActionText) {
        morticiansActions.push({
          text: extraActionText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        })
      }
    }

    morticiansActions.push({
      text: mortician.mortician_wake_text,
      time: BASE_TIME,
      image: 'onua_mortician',
    })

    const randomMorticianActionKey = selectRandomKey(random_mortician)
    switch (randomMorticianActionKey) {
      case 'mortician_1card_text':
        pushMorticianAction(
          random_mortician[randomMorticianActionKey],
          chosenMorticianText
        )
        break
      case 'mortician_2cards_text':
        pushMorticianAction(
          random_mortician[randomMorticianActionKey],
          identifier.identifier_bothneighbors_text
        )
        break
      case 'mortician_pretend_text':
        pushMorticianAction(random_mortician[randomMorticianActionKey])
        break
    }

    morticiansActions.push(generateTimedAction(ACTION_TIME), {
      text: mortician.mortician_close_text,
      time: BASE_TIME,
      image: 'onua_mortician',
    })

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      const randomDoppelgangerActionKey = selectRandomKey(random_mortician)
      switch (randomDoppelgangerActionKey) {
        case 'mortician_1card_text':
          pushDoppelgangerMorticianAction(
            random_mortician[randomDoppelgangerActionKey],
            chosenMorticianText
          )
          break
        case 'mortician_2cards_text':
          pushDoppelgangerMorticianAction(
            random_mortician[randomDoppelgangerActionKey],
            identifier.identifier_bothneighbors_text
          )
          break
        case 'mortician_pretend_text':
          pushDoppelgangerMorticianAction(
            random_mortician[randomDoppelgangerActionKey]
          )
          break
      }

      morticiansActions.push(generateTimedAction(ACTION_TIME), {
        text: doppelganger.doppelganger_close_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      })
    }

    return morticiansActions
  } */