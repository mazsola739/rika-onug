exports.revealer = "revealer_kickoff_text" //doppelganger! select any other player card, flip, flip it back if its non-villager (from this moment dont hide from players whos doin thier action) - update board card


exports.revealer = {}

/* generateActions(): RoleActionType[] {
    const revealerActions: RoleActionType[] = []

    revealerActions.push(
      {
        text: revealer.revealer_wake_text,
        time: BASE_TIME,
        image: 'onud_revealer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: revealer.revealer_close_text,
        time: BASE_TIME,
        image: 'onud_revealer',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      revealerActions.push(
        {
          text: doppelganger.doppelganger_revealer_wake_text,
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

    return revealerActions
  } */