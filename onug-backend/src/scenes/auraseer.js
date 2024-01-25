const auraseer = "auraseer_kickoff_text"
const auraseer_mark = "auraseer_mark_kickoff_text"
//TODO
exports.auraseer = () => []


/* generateActions(): RoleActionType[] {
    const auraseerActions: RoleActionType[] = []

    const auraseerWakeText = this.hasDusk
      ? auraseer.auraseer_marks_wake_text
      : auraseer.auraseer_wake_text

    const doppelgangerWakeText = this.hasDusk
      ? doppelganger.doppelganger_auraseer_marks_wake_text
      : doppelganger.doppelganger_auraseer_wake_text

    auraseerActions.push(
      {
        text: auraseerWakeText,
        time: BASE_TIME,
        image: 'onub_aura_seer',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: auraseer.auraseer_close_text,
        time: BASE_TIME,
        image: 'onub_aura_seer',
      }
    )

    //Doppelganger
    if (isCardSelectedById(this.deck, 1)) {
      auraseerActions.push(
        {
          text: doppelgangerWakeText,
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

    auraseerActions.push({
      text: auraseer.auraseer_thumbsaway_text,
      time: BASE_TIME,
      image: 'onub_aura_seer',
    })

    return auraseerActions
  } */