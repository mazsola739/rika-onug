const { roles } = require("./roles");

exports.interactionHandler = (gameState) => {
  const sceneTitle = gameState.sceneTitle;
  const selectedCards = gameState.selected_cards;

  //TODO player cards to get who has wich role

  const conditions = {
    hasOracle: hasRole(selectedCards, 50),
    hasCopycat: hasRole(selectedCards, 30),
    hasMirrorMan: hasRole(selectedCards, 64),
    hasDoppelganger: hasRole(selectedCards, 1),
    hasInstantAction: containsAnyIds(
      selectedCards,
      doppelgangerInstantActionsIds
    ),
    hasAnyVampire: containsAnyIds(selectedCards, vampireIds),
    hasTheCount: hasRole(selectedCards, 39),
    hasRenfield: hasRole(selectedCards, 38),
    hasDiseased: hasRole(selectedCards, 32),
    hasCupid: hasRole(selectedCards, 31),
    hasInstigator: hasRole(selectedCards, 34),
    hasPriest: hasRole(selectedCards, 37),
    hasAssassin: hasRole(selectedCards, 29),
    hasApprenticeAssassin: hasRole(selectedCards, 28),
    hasSentinel: hasRole(selectedCards, 25),
    hasAnyAlien: containsAnyIds(selectedCards, alienIds),
    hasCow: hasRole(selectedCards, 45),
    hasGroobAndZerb: containsAllIds(selectedCards, groobAndZerbIds),
    hasLeader: hasRole(selectedCards, 48),
    hasBodySnatcher: hasRole(selectedCards, 74),
    hasAnySuperVillains: containsAnyIds(selectedCards, superVillainsIds),
    hasTemptress: hasRole(selectedCards, 69),
    hasDrPeeker: hasRole(selectedCards, 57),
    hasRapscallion: hasRole(selectedCards, 65),
    hasEvilometer: hasRole(selectedCards, 58),
    hasAnyWerewolf: containsAnyIds(selectedCards, werewolvesIds),
    hasDreamWolf: hasRole(selectedCards, 21),
    hasAlphaWolf: hasRole(selectedCards, 17),
    hasMysticWolf: hasRole(selectedCards, 22),
    hasMinion: hasRole(selectedCards, 7),
    hasApprenticeTanner: hasRole(selectedCards, 71),
    hasTanner: hasRole(selectedCards, 10),
    hasMadScientist: hasRole(selectedCards, 63),
    hasIntern: hasRole(selectedCards, 62),
    hasBothMasons: containsAllIds(selectedCards, masonIds),
    hasAnyMason: containsAnyIds(selectedCards, masonIds),
    haOneMasonAndDoppelganger:
      conditions.hasDoppelganger && conditions.hasAnyMason,
    hasMasons:
      conditions.hasBothMasons || conditions.haOneMasonAndDoppelganger,
    hasThing: hasRole(selectedCards, 85),
    hasAnnoyingLad: hasRole(selectedCards, 55),
    hasSeer: hasRole(selectedCards, 9),
    hasApprenticeSeer: hasRole(selectedCards, 18),
    hasParanormalInvestigator: hasRole(selectedCards, 23),
    hasMarksman: hasRole(selectedCards, 35),
    hasNostradamus: hasRole(selectedCards, 80),
    hasPsychic: hasRole(selectedCards, 51),
    hasDetector: hasRole(selectedCards, 56),
    hasRobber: hasRole(selectedCards, 8),
    hasWitch: hasRole(selectedCards, 27),
    hasPickpocket: hasRole(selectedCards, 36),
    hasRoleRetriever: hasRole(selectedCards, 66),
    hasVoodooLou: hasRole(selectedCards, 70),
    hasTroublemaker: hasRole(selectedCards, 11),
    hasVillageIdiot: hasRole(selectedCards, 26),
    hasMarks: containsAnyIds(selectedCards, hasMarkIds),
    hasAuraSeer: hasRole(selectedCards, 72),
    hasGremlin: hasRole(selectedCards, 33),
    hasRascal: hasRole(selectedCards, 52),
    hasSwitcheroo: hasRole(selectedCards, 68),
    hasDrunk: hasRole(selectedCards, 2),
    hasInsomniac: hasRole(selectedCards, 4),
    hasSelfAwarenessGirl: hasRole(selectedCards, 67),
    hasSquire: hasRole(selectedCards, 83),
    hasSeers: containsAnyIds(selectedCards, seerIds),
    hasBeholder: hasRole(selectedCards, 73) && conditions.hasSeers,
    hasRevealer: hasRole(selectedCards, 24),
    hasExposer: hasRole(selectedCards, 46),
    hasFlipper: hasRole(selectedCards, 59),
    hasEmpath: hasRole(selectedCards, 77),
    hasCurator: hasRole(selectedCards, 20),
    hasBlob: hasRole(selectedCards, 44),
    hasMortician: hasRole(selectedCards, 49),
    hasFamilyMan: hasRole(selectedCards, 78),
  };

  switch (sceneTitle) {
    // case "CARD_SELECTION":// (Scene Number 0)
    // case "EVERYONE_CARD":// (Scene Number: 1)
    /*  T W I L L I G H T  */
    case "ORACLE_QUESTION": // (Scene Number: 2)
      if (conditions.hasOracle) return roles.oracle_question();
      break;
    case "ORACLE_REACTION": // (Scene Number: 3)
      const oracleQuestion = gameState.oracle_question;
      const oracleAnswer = gameState.oracle_answer; //TODO make sure always have answer if oracle in selected cards
      if (conditions.hasOracle && oracleAnswer)
        return roles.oracle_reaction(oracleQuestion, oracleAnswer);
      break;
    case "COPYCAT": // (Scene Number: 4)
      if (conditions.hasCopycat) return roles.copycat();
      break;
    case "MIRROR_MAN": // (Scene Number: 5)
      if (conditions.hasMirrorMan) return roles.mirrorman();
      break;
    case "DOPPELGÄNGER": // (Scene Number: 6)
      if (conditions.hasDoppelganger) return roles.doppelganger();
      break;
    case "DOPPELGÄNGER_INSTANT_ACTION": // (Scene Number: 7)
      const instantRoles = getRolesNames(
        selectedCards,
        doppelgangerInstantActionsIds,
        instantRoleIds
      );
      if (conditions.hasDoppelganger && conditions.hasInstantAction)
        return roles.doppelganger_instant_action(instantRoles);
      break;
    /*  D U S K */
    case "VAMPIRES": // (Scene Number: 8)
      if (conditions.hasAnyVampire) return roles.vampires();
      break;
    case "THE_COUNT": // (Scene Number: 9)
      if (conditions.hasTheCount) return roles.thecount();
      break;
    case "DOPPELGÄNGER_THE_COUNT": // (Scene Number: 10)
      if (conditions.hasDoppelganger && conditions.hasTheCount)
        return roles.doppelganger_thecount();
      break;
    case "RENFIELD": // (Scene Number: 11)
      if (conditions.hasRenfield)
        return roles.renfield(conditions.hasDoppelganger);
      break;
    case "DISEASED": // (Scene Number: 12)
      if (conditions.hasDiseased) return roles.diseased();
      break;
    case "CUPID": // (Scene Number: 13)
      if (conditions.hasCupid) return roles.cupid();
      break;
    case "INSTIGATOR": // (Scene Number: 14)
      if (conditions.hasInstigator) return roles.instigator();
      break;
    case "PRIEST": // (Scene Number: 15)
      if (conditions.hasPriest) return roles.priest();
      break;
    case "DOPPELGÄNGER_PRIEST": // (Scene Number: 16)
      if (conditions.hasDoppelganger && conditions.hasPriest)
        return roles.doppelganger_priest();
      break;
    case "ASSASSIN": // (Scene Number: 17)
      if (conditions.hasAssassin) return roles.assassin();
      break;
    case "DOPPELGÄNGER_ASSASSIN": // (Scene Number: 18)
      if (conditions.hasDoppelganger && conditions.hasAssassin)
        return roles.doppelganger_assassin();
      break;
    case "APPRENTICE_ASSASSIN": // (Scene Number: 19)
      if (conditions.hasApprenticeAssassin)
        return roles.apprenticeassassin(conditions.hasAssassin);
      break;
    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": // (Scene Number: 20)
      if (conditions.hasDoppelganger && conditions.hasApprenticeAssassin)
        return roles.doppelganger_apprenticeassassin(conditions.hasAssassin);
      break;
    case "EVERYONE_MARK": // (Scene Number: 21)
      if (conditions.hasMarks) return roles.everyonemark();
      break;
    /*  N I G H T */
    case "LOVERS": // (Scene Number: 22)
      if (conditions.hasCupid) return roles.lovers();
      break;
    case "SENTINEL": // (Scene Number: 24)
      if (conditions.hasSentinel) return roles.sentinel();
      break;
    case "ALIENS": // (Scene Number: 25)
      if (conditions.hasAnyAlien) return roles.aliens(totalPlayers);
      break;
    case "COW": // (Scene Number: 26)
      if (conditions.hasCow) return roles.cow(conditions.hasDoppelganger);
      break;
    case "GROOB_ZERB": // (Scene Number: 27)
      if (conditions.hasGroobAndZerb)
        return roles.groobzerb(conditions.hasDoppelganger);
      break;
    case "LEADER": // (Scene Number: 28)
      if (conditions.hasLeader && conditions.hasAnyAlien)
        return roles.leader(conditions.hasDoppelganger);
      break;
    case "LEADER_ZERB_GROOB": // (Scene Number: 29)
      if (conditions.hasLeader && conditions.hasGroobAndZerb)
        return roles.leader_zerbgroob();
      break;
    case "BODY_SNATCHER": // (Scene Number: 30)
      if (conditions.hasBodySnatcher) return roles.bodysnatcher();
      break;
    case "DOPPELGÄNGER_BODY_SNATCHER": // (Scene Number: 31)
      if (conditions.hasDoppelganger && conditions.hasBodySnatcher)
        return roles.doppelganger_bodysnatcher();
      break;
    case "SUPER_VILLAINS": // (Scene Number: 32)
      if (conditions.hasAnySuperVillains) return roles.supervillains();
      break;
    case "TEMPTRESS": // (Scene Number: 33)
      if (conditions.hasTemptress) return roles.temptress();
      break;
    case "DR_PEEKER": // (Scene Number: 34)
      if (conditions.hasDrPeeker) return roles.drpeeker();
      break;
    case "RAPSCALLION": // (Scene Number: 35)
      if (conditions.hasRapscallion) return roles.rapscallion();
      break;
    case "EVILOMETER": // (Scene Number: 36)
      if (conditions.hasEvilometer)
        return roles.evilometer(conditions.hasDoppelganger);
      break;
    case "WEREWOLVES": // (Scene Number: 37)
      if (conditions.hasAnyWerewolf)
        return roles.werewolves(conditions.hasDreamWolf);
      break;
    case "ALPHA_WOLF": // (Scene Number: 38)
      if (conditions.hasAlphaWolf) return roles.alphawolf();
      break;
    case "MYSTIC_WOLF": // (Scene Number: 39)
      if (conditions.hasMysticWolf) return roles.mysticwolf();
      break;
    case "MINION": // (Scene Number: 40)
      if (conditions.hasMinion)
        return roles.minion(conditions.hasDoppelganger);
      break;
    case "APPRENTICE_TANNER": // (Scene Number: 41)
      if (conditions.hasApprenticeTanner && conditions.hasTanner)
        return roles.apprenticetanner(conditions.hasDoppelganger);
      break;
    case "MAD_SCIENTIST": // (Scene Number: 42)
      if (conditions.hasMadScientist) return roles.madscientist();
      break;
    case "INTERN": // (Scene Number: 43)
      if (conditions.hasIntern)
        return roles.intern(
          conditions.hasDoppelganger,
          conditions.hasMadScientist
        );
      break;
    case "MASONS": // (Scene Number: 44)
      if (conditions.hasMasons) return roles.masons();
      break;
    case "THING": // (Scene Number: 45)
      if (conditions.hasThing) return roles.thing();
      break;
    case "ANNOYING_LAD": // (Scene Number: 46)
      if (conditions.hasAnnoyingLad) return roles.annoyinglad();
      break;
    case "SEER": // (Scene Number: 47)
      if (conditions.hasSeer) return roles.seer();
      break;
    case "APPRENTICE_SEER": // (Scene Number: 48)
      if (conditions.hasApprenticeSeer) return roles.apprenticeseer();
      break;
    case "PARANORMAL_INVESTIGATOR": // (Scene Number: 49)
      if (conditions.hasParanormalInvestigator)
        return roles.paranormalinvestigator();
      break;
    case "MARKSMAN": // (Scene Number: 50)
      if (conditions.hasMarksman)
        return roles.marksman(conditions.hasDoppelganger);
      break;
    case "NOSTRADAMUS": // (Scene Number: 51)
      if (conditions.hasNostradamus) return roles.nostradamus();
      break;
    case "NOSTRADAMUS_REACTION": // (Scene Number: 52)
      const nostradamusTeam = getTeamName(lastViewedCardId);
      if (conditions.hasNostradamus)
        return roles.nostradamus_reaction(nostradamusTeam);
      break;
    case "PSYCHIC": // (Scene Number: 53)
      if (conditions.hasPsychic) return roles.psychic();
      break;
    case "DOPPELGÄNGER_PSYCHIC": // (Scene Number: 54)
      if (conditions.hasDoppelganger && conditions.hasPsychic)
        return roles.doppelganger_psychic();
      break;
    case "DETECTOR": // (Scene Number: 55)
      if (conditions.hasDetector) return roles.detector();
      break;
    case "ROBBER": // (Scene Number: 56)
      if (conditions.hasRobber) return roles.robber();
      break;
    case "WITCH": // (Scene Number: 57)
      if (conditions.hasWitch) return roles.witch();
      break;
    case "PICKPOCKET": // (Scene Number: 58)
      if (conditions.hasPickpocket) return roles.pickpocket();
      break;
    case "DOPPELGÄNGER_PICKPOCKET": // (Scene Number: 59)
      if (conditions.hasDoppelganger && conditions.hasPickpocket)
        return roles.doppelganger_pickpocket();
      break;
    case "ROLE_RETRIEVER": // (Scene Number: 60)
      if (conditions.hasRoleRetriever) return roles.roleretriever();
      break;
    case "VOODOO_LOU": // (Scene Number: 61)
      if (conditions.hasVoodooLou) return roles.voodoolou();
      break;
    case "TROUBLEMAKER": // (Scene Number: 62)
      if (conditions.hasTroublemaker) return roles.troublemaker();
      break;
    case "VILLAGE_IDIOT": // (Scene Number: 63)
      if (conditions.hasVillageIdiot) return roles.villageidiot();
      break;
    case "AURA_SEER": // (Scene Number: 64)
      if (conditions.hasAuraSeer)
        return roles.auraseer(
          conditions.hasDoppelganger,
          conditions.hasMarks
        );
      break;
    case "GREMLIN": // (Scene Number: 65)
      if (conditions.hasGremlin) return roles.gremlin();
      break;
    case "DOPPELGÄNGER_GREMLIN": // (Scene Number: 66)
      if (conditions.hasDoppelganger && conditions.hasGremlin)
        return roles.doppelganger_gremlin();
      break;
    case "RASCAL": // (Scene Number: 67)
      if (conditions.hasRascal) return roles.rascal();
      break;
    case "DOPPELGÄNGER_RASCAL": // (Scene Number: 68)
      if (conditions.hasDoppelganger && conditions.hasRascal)
        return roles.doppelganger_rascal();
      break;
    case "SWITCHEROO": // (Scene Number: 69)
      if (conditions.hasSwitcheroo) return roles.switcheroo();
      break;
    case "DRUNK": // (Scene Number: 70)
      if (conditions.hasDrunk) return roles.drunk();
      break;
    case "INSOMNIAC": // (Scene Number: 71)
      if (conditions.hasInsomniac)
        return roles.insomniac(conditions.hasDoppelganger);
      break;
    case "SELF_AWARENESS_GIRL": // (Scene Number: 72)
      if (conditions.hasSelfAwarenessGirl)
        return roles.selfawarenessgirl(conditions.hasDoppelganger);
      break;
    case "SQUIRE": // (Scene Number: 73)
      if (conditions.hasSquire)
        return roles.squire(conditions.hasDoppelganger);
      break;
    case "BEHOLDER": // (Scene Number: 74)
      if (conditions.hasBeholder)
        return roles.beholder(
          conditions.hasSeer,
          conditions.hasApprenticeSeer,
          conditions.hasDoppelganger
        );
      break;
    case "REVEALER": // (Scene Number: 75)
      if (conditions.hasRevealer) return roles.revealer();
      break;
    case "DOPPELGÄNGER_REVEALER": // (Scene Number: 76)
      if (conditions.hasDoppelganger && conditions.hasRevealer)
        return roles.doppelganger_revealer();
      break;
    case "EXPOSER": // (Scene Number: 74)
      if (conditions.hasExposer) return roles.exposer();
      break;
    case "DOPPELGÄNGER_EXPOSER": // (Scene Number: 75)
      if (conditions.hasDoppelganger && conditions.hasExposer)
        return roles.doppelganger_exposer();
      break;
    case "FLIPPER": // (Scene Number: 76)
      if (conditions.hasFlipper) return roles.flipper();
      break;
    case "DOPPELGÄNGER_FLIPPER": // (Scene Number: 77)
      if (conditions.hasDoppelganger && conditions.hasFlipper)
        return roles.doppelganger_flipper();
      break;
    case "EMPATH": // (Scene Number: 78)
      if (conditions.hasEmpath) return roles.empath(totalPlayers);
      break;
    case "DOPPELGÄNGER_EMPATH": // (Scene Number: 79)
      if (conditions.hasDoppelganger && conditions.hasEmpath)
        return roles.doppelganger_empath(totalPlayers);
      break;
    case "CURATOR": // (Scene Number: 80)
      if (conditions.hasCurator) return roles.curator();
      break;
    case "DOPPELGÄNGER_CURATOR": // (Scene Number: 81)
      if (conditions.hasDoppelganger && conditions.hasCurator)
        return roles.doppelganger_curator();
      break;
    case "BLOB": // (Scene Number: 82)
      if (conditions.hasBlob) return roles.blob();
      break;
    case "MORTICIAN": // (Scene Number: 83)
      if (conditions.hasMortician) return roles.mortician();
      break;
    case "DOPPELGÄNGER_MORTICIAN": // (Scene Number: 84)
      if (conditions.hasMortician && conditions.hasDoppelganger)
        return roles.doppelganger_mortician();
      break;
    case "FAMILY_MAN": // (Scene Number: 85)
      if (conditions.hasFamilyMan)
        return roles.familyman(conditions.hasDoppelganger);
    default:
      return "Unknown scene: " + sceneTitle;

    //Ripple Scene:
    /*  RIPPLE":// (Scene Number: 69) */
    //Day Scenes:
    /*  INVESTIGATION":// (Scene Number: 70)
  VOTE":// (Scene Number: 71)
  WINNERS":// (Scene Number: 72) */
  }
};
