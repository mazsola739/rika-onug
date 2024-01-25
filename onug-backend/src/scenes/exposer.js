exports.exposer = "exposer_kickoff_text" //doppelganger! select center cards, dont hide (only from this moment to the next players when their turn comes) - no update expect if it was own known
exports.random_exposer = [
  "exposer_flip1_text",
  "exposer_flip2_text",
  "exposer_flip3_text",
]


exports.exposer = {}

/*   generateActions(): RoleActionType[] {
    const exposerActions: RoleActionType[] = []

    const randomExposerAction = getRandomValueFromObject(random_exposer)
    const randomDoppelgangerAction = getRandomValueFromObject(random_exposer)

    exposerActions.push(
      {
        text: exposer.exposer_wake_text,
        time: BASE_TIME,
        image: 'onua_exposer',
      },
      {
        text: randomExposerAction,
        time: BASE_TIME,
        image: 'onua_exposer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: exposer.exposer_close_text,
        time: BASE_TIME,
        image: 'onua_exposer',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      exposerActions.push(
        {
          text: doppelganger.doppelganger_exposer_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        {
          text: randomDoppelgangerAction,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }
    return exposerActions
  } */