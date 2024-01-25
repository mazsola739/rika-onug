exports.nostradamus = [ //start look up to 3 cards, if card team non-villager or non-hero stop view, if 3rd still villager or hero, tell to everyone new team
  "nostradamus_kickoff_text",
  "nostradamus_teamstart_text",
  "nostradamus_team_alien_text",
  "nostradamus_team_werewolf_text",
  "nostradamus_team_vampire_text",
  "nostradamus_team_villain_text",
  "nostradamus_team_villager_text",
  "nostradamus_team_hero_text",
  "nostradamus_team_assassin_text",
  "nostradamus_team_apprenticeassassin_text",
  "nostradamus_team_tanner_text",
  "nostradamus_team_synthetic_text",
  "nostradamus_team_blob_text",
  "nostradamus_team_family_text",
  "nostradamus_team_mortician_text",
  "nostradamus_team_mad_text",
  "nostradamus_team_doppelganger_text",
]


exports.nostradamus = {}

/*   generateActions(): RoleActionType[] {
    const nostradamusActions: RoleActionType[] = []

    const getTeamText = (id: number) => {
      for (const [team, criteria] of Object.entries(nostradamusTeam)) {
        if (criteria.includes(Number(id))) {
          return `nostradamus.nostradamus_team_${team}_text`
        }
      }

      return 'nostradamus.nostradamus_team_villager_text'
    }

    nostradamusActions.push(
      {
        text: nostradamus.nostradamus_wake_text,
        time: BASE_TIME,
        image: 'onub_nostradamus',
      },
      generateTimedAction(ACTION_TIME),
      {
        text: nostradamus.nostradamus_teamstart_text,
        time: BASE_TIME,
        image: 'onub_nostradamus',
      },
      {
        text: getTeamText(ID),
        time: BASE_TIME,
        image: 'onub_nostradamus',
      },
      {
        text: nostradamus.nostradamus_close_text,
        time: BASE_TIME,
        image: 'onub_nostradamus',
      }
    )

    return nostradamusActions
  } */

