exports.rascal = [ //doppelganger!
  "rascal_kickoff_text",
  "rascal_witchend_text",
  "rascal_drunkend_text",
  "rascal_robberend_text",
]
exports.random_rascal = [
  "rascal_idiot_text", //may village idiot action
  "rascal_troublemaker_text", //rascalAnyTwoKeys may pick 2 players suggested by game - update selected players actual cards
  "rascal_witch_text", //rascalAnyOneKeys may view card suggested position - update expect if own know
  "rascal_drunk_text", //rascalAnyOneKeys must change card - update selected and own actual cards
  "rascal_robber_text", //rascalAnyOneKeys may swap card with suggested players, show new card - update own known and actual, and selected player actual
]
exports.rascalAnyOneKeys = [
  'identifier_higher_text',
  'identifier_lower_text',
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_oneneighbor_text',
  'identifier_center_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
]
exports.rascalAnyTwoKeys = [
  'identifier_any2_text',
  'identifier_any2even_text',
  'identifier_any2odd_text',
  'identifier_any2higher_text',
  'identifier_any2lower_text',
  'identifier_2leftneighbors_text',
  'identifier_2rightneighbors_text',
]

exports.rascal = {}

/*   generateActions(): RoleActionType[] {
    const rascalActions: RoleActionType[] = []

    const randomRascalActionKey = selectRandomKey(random_rascal)

    const randomDoppelgangerActionKey = selectRandomKey(random_rascal)

    rascalActions.push(
      { text: rascal.rascal_wake_text, time: BASE_TIME, image: 'onua_rascal' },
      {
        text: random_rascal[
          randomRascalActionKey as keyof typeof random_rascal
        ],
        time: BASE_TIME,
        image: 'onua_rascal',
      }
    )

    if (randomRascalActionKey !== 'rascal_idiot_text') {
      let identifierKeys: string[] = []
      let endText: string

      if (randomRascalActionKey === 'rascal_troublemaker_text') {
        identifierKeys = rascalStoreAnyTwoKeys
      } else {
        identifierKeys = rascalStoreAnyOneKeys
        endText =
          rascal[
            `rascal_${
              randomRascalActionKey.split('_')[1]
            }end_text` as keyof typeof rascal
          ]
      }

      const selectedIdentifierKey =
        identifierKeys[getRandomNumber(0, identifierKeys.length - 1)]
      const selectedIdentifierValue =
        identifier[selectedIdentifierKey as keyof typeof identifier]
      rascalActions.push({
        text: selectedIdentifierValue,
        time: BASE_TIME,
        image: 'onua_rascal',
      })

      if (endText) {
        rascalActions.push({
          text: endText,
          time: BASE_TIME,
          image: 'onua_rascal',
        })
      }
    }

    rascalActions.push(generateTimedAction(ACTION_TIME), {
      text: rascal.rascal_close_text,
      time: BASE_TIME,
      image: 'onua_rascal',
    })

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      rascalActions.push(
        {
          text: doppelganger.doppelganger_rascal_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: random_rascal[
            randomDoppelgangerActionKey as keyof typeof random_rascal
          ],
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    if (randomDoppelgangerActionKey !== 'rascal_idiot_text') {
      let identifierKeys: string[] = []
      let endText: string

      if (randomDoppelgangerActionKey === 'rascal_troublemaker_text') {
        identifierKeys = rascalStoreAnyTwoKeys
      } else {
        identifierKeys = rascalStoreAnyOneKeys
        endText =
          rascal[
            `rascal_${
              randomDoppelgangerActionKey.split('_')[1]
            }end_text` as keyof typeof rascal
          ]
      }

      const selectedIdentifierKey =
        identifierKeys[getRandomNumber(0, identifierKeys.length - 1)]
      const selectedIdentifierValue =
        identifier[selectedIdentifierKey as keyof typeof identifier]
      rascalActions.push({
        text: selectedIdentifierValue,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      })

      if (endText) {
        rascalActions.push({
          text: endText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        })
      }
    }

    if (isCardSelectedById(this.deck, 1)) {
      rascalActions.push(generateTimedAction(ACTION_TIME), {
        text: doppelganger.doppelganger_close_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      })
    }

    return rascalActions
  } */