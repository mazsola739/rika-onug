exports.empath = "empath_kickoff_text" //doppelganger! - show vote result - no update
exports.empathAllKeys = [
  "identifier_everyone_text",
  "identifier_oddplayers_text",
  "identifier_evenplayers_text",
  "activePlayers", //up to 3 random players example: identifier_player1_text with 'and'
]
exports.random_empath = [
  "empath_action1_text",
  "empath_action2_text",
  "empath_action3_text",
  "empath_action4_text",
  "empath_action5_text",
  "empath_action6_text",
  "empath_action7_text",
  "empath_action8_text",
  "empath_action9_text",
  "empath_action10_text",
  "empath_action11_text",
  "empath_action12_text",
  "empath_action13_text",
  "empath_action14_text",
]

exports.empath = {}

/* generateActions(): RoleActionType[] {
    const empathActions: RoleActionType[] = []

    const randomEmpathInteractionKey =
      getRandomItemFromArray(empathStoreAllKeys)
    const chosenEmpathText =
      identifier[randomEmpathInteractionKey as keyof typeof identifier] ||
      (randomEmpathInteractionKey === 'activePlayers'
        ? pickRandomUpToThreePlayers(selectedDeckStore.totalPlayers, 'and')
        : randomEmpathInteractionKey)
    const randomEmpathActionText = getRandomValueFromObject(random_empath)

    // Doppelganger
    const randomDoppelgangerInteractionKey =
      getRandomItemFromArray(empathStoreAllKeys)
    const chosenDoppelgangerText =
      identifier[randomDoppelgangerInteractionKey as keyof typeof identifier] ||
      (randomDoppelgangerInteractionKey === 'activePlayers'
        ? pickRandomUpToThreePlayers(selectedDeckStore.totalPlayers, 'and')
        : randomDoppelgangerInteractionKey)
    const randomDoppelgangerActionText = getRandomValueFromObject(random_empath)

    empathActions.push(
      { text: empath.empath_wake_text, time: BASE_TIME, image: 'onub_empath' },
      { text: chosenEmpathText, time: BASE_TIME, image: 'onub_empath' },
      { text: randomEmpathActionText, time: BASE_TIME, image: 'onub_empath' },
      generateTimedAction(ACTION_TIME),
      { text: empath.empath_close_text, time: BASE_TIME, image: 'onub_empath' }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      empathActions.push(
        {
          text: doppelganger.doppelganger_empath_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: chosenDoppelgangerText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: randomDoppelgangerActionText,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_empath_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return empathActions
  } */