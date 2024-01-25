exports.pickpocket = "pickpocket_kickoff_text" //doppelganger! may select another player, swap own mark with selected, show new mark - update known and actual player info


exports.pickpocket = {}

/*   generateActions(): RoleActionType[] {
    const pickpocketActions: RoleActionType[] = []

    pickpocketActions.push(
      {
        text: pickpocket.pickpocket_wake_text,
        time: BASE_TIME,
        image: 'onuv_pickpocket',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: pickpocket.pickpocket_close_text,
        time: BASE_TIME,
        image: 'onuv_pickpocket',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      pickpocketActions.push(
        {
          text: doppelganger.doppelganger_pickpocket_wake_text,
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

    return pickpocketActions
  } */