exports.priest = "priest_kickoff_text" //if no [28, 29, 31, 32, 34, 38, 39, 40, 41], then no need to start doppelganger! swap hes mark to mark of clarity, may choose another player to swap mark of clarity - update actual player information and own known


exports.priest = {}

/*   generateActions(): RoleActionType[] {
    const priestActions: RoleActionType[] = []

    priestActions.push(
      {
        text: priest.priest_wake_text,
        time: BASE_TIME,
        image: 'onuv_priest',
      },
      generateTimedAction(2 * ACTION_TIME),
      {
        text: priest.priest_close_text,
        time: BASE_TIME,
        image: 'onuv_priest',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      priestActions.push(
        {
          text: doppelganger.doppelganger_priest_wake_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        },
        generateTimedAction(2 * ACTION_TIME),
        {
          text: doppelganger.doppelganger_close_text,
          time: BASE_TIME,
          image: 'onuw_doppelganger',
        }
      )
    }

    return priestActions
  } */