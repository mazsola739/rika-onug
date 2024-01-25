/* Doppelgänger instant night actions: Sentinel 25, Alpha Wolf 17, Mystic Wolf 22, Seer 9, Apprentice Seer 18, P.I. 23, Robber 8, 
Witch 27, Troublemaker 11, Village Idiot 26, Drunk 2, Diseased 32, Cupid 31, Instigator 34, Thing 85, Annoying Lad 55, Detector 56,
Role Retriever 66, Voodoo Lou 70 or Switcheroo 68. */
exports.doppelganger = [
    "doppelganger_kickoff_text",
    "doppelganger_verbose_intro_text",
    "doppelganger_verbose_or_text",
    "doppelganger_verbose_outro_text",
  ]
  exports.doppelganger_thecount = "doppelganger_thecount_kickoff_text" //id: 39 után
  exports.doppelganger_renfield = "doppelganger_renfield_kickoff_text" //id: 38 egyszerre
  exports.doppelganger_priest = "doppelganger_priest_kickoff_text" //id: 37 egyszerre !!!if no [28, 29, 31, 32, 34, 38, 39, 40, 41], then no need to
  exports.doppelganger_assassin = "doppelganger_assassin_kickoff_text" //id: 29 után
  exports.doppelganger_apprenticeassassin_assassin = "doppelganger_apprenticeassassin_assassin_kickoff_text" //id: 28 & 29 után
  exports.doppelganger_apprenticeassassin = "doppelganger_apprenticeassassin_kickoff_text" //id: 28 után
  exports.doppelganger_cow = "doppelganger_cow_kickoff_text" //id: 45 egyszerre
  exports.doppelganger_leader = "doppelganger_leader_kickoff_text" //id: 48 egyszerre
  exports.doppelganger_leader_zerbgroob = "doppelganger_leader_zerbgroob_text" //id: 48 egyszerre
  exports.doppelganger_bodysnatcher = "doppelganger_bodysnatcher_kickoff_text" //id: 74 után
  exports.doppelganger_evilometer = "doppelganger_evilometer_kickoff_text" //id 58 egyszerre
  exports.doppelganger_minion = "doppelganger_minion_kickoff_text" //id: 7 egyszerre
  exports.doppelganger_apprenticetanner = "doppelganger_apprenticetanner_kickoff_text" //id: 71 egyszerre
  exports.doppelganger_intern_madscientist = "doppelganger_intern_madscientist_kickoff_text" //id 62 egyszerre
  exports.doppelganger_intern = "doppelganger_intern_kickoff_text" //id 62 & 63 egyszerre
  exports.doppelganger_marksman = "doppelganger_marksman_kickoff_text" //id: 35 egyszerre
  exports.doppelganger_psychic = "doppelganger_psychic_kickoff_text" //id: 51 után
  exports.doppelganger_pickpocket = "doppelganger_pickpocket_kickoff_text" //id: 36 után
  exports.doppelganger_auraseer = "doppelganger_auraseer_kickoff_text" //id: 72 egyszerre
  exports.doppelganger_auraseer_marks = "doppelganger_auraseer_marks_kickoff_text" //id: 72 & marks egyszerre
  exports.doppelganger_gremlin = "doppelganger_gremlin_kickoff_text" //id: 33 után
  exports.doppelganger_groobzerb = "doppelganger_groobzerb_kickoff_text" //id: 47 vagy 54 egyszerre
  exports.doppelganger_rascal = "doppelganger_rascal_kickoff_text" //id: 52 után
  exports.doppelganger_insomniac = "doppelganger_insomniac_kickoff_text" //id: 4 egyszerre
  exports.doppelganger_selfawarenessgirl = "doppelganger_selfawarenessgirl_kickoff_text" //id 67 egyszerre
  exports.doppelganger_squire = "doppelganger_squire_kickoff_text" //id: 83 egyszerre
  exports.doppelganger_beholder_seer = "doppelganger_beholder_seer_kickoff_text" //id: 9 egyszerre
  exports.doppelganger_beholder_apprenticeseer = "doppelganger_beholder_apprenticeseer_kickoff_text" //id: 18 egyszerre
  exports.doppelganger_beholder_seer_apprenticeseer = "doppelganger_beholder_seer_apprenticeseer_kickoff_text" //id: 9 & 18 egyszerre
  exports.doppelganger_revealer = "doppelganger_revealer_kickoff_text" //id: 24 után
  exports.doppelganger_exposer = "doppelganger_exposer_kickoff_text" //id: 46 után
  exports.doppelganger_flipper = "doppelganger_flipper_kickoff_text" //id 59 után
  exports.doppelganger_empath = "doppelganger_empath_kickoff_text" //id: 77 után
  exports.doppelganger_curator = "doppelganger_curator_kickoff_text" //id: 20 után
  exports.doppelganger_mortician = "doppelganger_mortician_kickoff_text" //id: 49 után
  exports.doppelganger_familyman = "doppelganger_familyman_kickoff_text" //id 78 egyszerre
  

exports.doppelganger = {}



/* generateActions(): RoleActionType[] {
    const doppelgangerActions: RoleActionType[] = []

    const roleKeys = doppelgangerInstantActionsIds
      .filter((id) => this.deck.some((card) => card.id === id))
      .flatMap(
        (id) =>
          Object.entries(doppelganger_nightaction).find(
            ([, value]) => value === id
          )?.[0]
      )

    const displayNames = roleKeys.map((key) => roles[key as keyof typeof roles])

    const displayText =
      displayNames.length > 0
        ? `${displayNames.join(
            ` ${doppelganger.doppelganger_verbose_or_text} `
          )}`
        : ''

    const verboseText: RoleActionType[] = [
      {
        text: `${doppelganger.doppelganger_verbose_intro_text} ${displayText} ${doppelganger.doppelganger_verbose_outro_text}`,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      },
      generateTimedAction(2 * ACTION_TIME),
    ]

    doppelgangerActions.push(
      {
        text: doppelganger.doppelganger_wake_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      },
      ...(areAnyCardSelectedById(this.deck, doppelgangerInstantActionsIds)
        ? verboseText
        : []),
      ...(isCardSelectedById(this.deck, 7)
        ? [
            {
              text: doppelganger.doppelganger_minion_text,
              time: BASE_TIME,
              image: 'onuw_doppelganger',
            },
            generateTimedAction(ACTION_TIME),
            {
              text: minion.werewolves_thumb_away_text,
              time: BASE_TIME,
              image: 'onuw_werewolf',
            },
          ]
        : []),
      {
        text: doppelganger.doppelganger_close_text,
        time: BASE_TIME,
        image: 'onuw_doppelganger',
      }
    )

    return doppelgangerActions
  } */
