 const { logError } = require("../../log")
const { containsAnyIds, containsAllIds, getTokensByOriginalIds, getAllPlayerTokens } = require("../narration/utils")
const { doppelgangerInstantActionsIds , vampireIds, alienIds, groobAndZerbIds, superVillainsIds, werewolvesIds, hasMarkIds, seerIds, masonIds } = require("./constants")
const { roles } = require("./roles") 
const { doppelganger_instant_action }  = require("./roles/doppelgangerinstantaction")

//TODO action_history 
exports.interactionHandler = gameState => {
  const newGameState = {...gameState} 
  const sceneTitle = gameState.actual_scene.scene_title
  const players = gameState.players 
 
  const conditions = { 
    hasOraclePlayer:                  containsAnyIds(players, [50]),
    hasCopycatPlayer:                 containsAnyIds(players, [30]),
    hasMirrorManPlayer:               containsAnyIds(players, [64]),
    hasDoppelgangerPlayer:            containsAnyIds(players, [1]),
    hasInstantAction:                 containsAnyIds(players, doppelgangerInstantActionsIds),
    hasAnyVampirePlayers:             containsAnyIds(players, vampireIds),
    hasTheCountPlayer:                containsAnyIds(players, [39]),
    hasRenfieldPlayer:                containsAnyIds(players, [38]),
    hasDiseasedPlayer:                containsAnyIds(players, [32]),
    hasCupidPlayer:                   containsAnyIds(players, [31]),
    hasInstigatorPlayer:              containsAnyIds(players, [34]), 
    hasPriestPlayer:                  containsAnyIds(players, [37]),
    hasAssassinPlayer:                containsAnyIds(players, [29]),
    hasApprenticeAssassinPlayer:      containsAnyIds(players, [28]),
    hasSentinelPlayer:                containsAnyIds(players, [25]),
    hasAnyAlienPlayers:               containsAnyIds(players, alienIds),
    hasCowPlayer:                     containsAnyIds(players, [45]),
    hasGroobAndZerbPlayers:           containsAllIds(players, groobAndZerbIds),
    hasLeaderPlayer:                  containsAnyIds(players, [48]),
    hasBodySnatcherPlayer:            containsAnyIds(players, [74]),
    hasAnySuperVillainsPlayers:       containsAnyIds(players, superVillainsIds),
    hasTemptressPlayer:               containsAnyIds(players, [69]),
    hasDrPeekerPlayer:                containsAnyIds(players, [57]),
    hasRapscallionPlayer:             containsAnyIds(players, [65]),
    hasEvilometerPlayer:              containsAnyIds(players, [58]),
    hasAnyWerewolfPlayers:            containsAnyIds(players, werewolvesIds),
    hasDreamWolfPlayer:               containsAnyIds(players, [21]),
    hasAlphaWolfPlayer:               containsAnyIds(players, [17]),
    hasMysticWolfPlayer:              containsAnyIds(players, [22]),
    hasMinionPlayer:                  containsAnyIds(players, [7]),
    hasApprenticeTannerPlayer:        containsAnyIds(players, [71]),
    hasTannerPlayer:                  containsAnyIds(players, [10]),
    hasMadScientistPlayer:            containsAnyIds(players, [63]),
    hasInternPlayer:                  containsAnyIds(players, [62]),
    hasMasonPlayers:                  containsAllIds(players, masonIds) || containsAnyIds(players, [1]) && containsAnyIds(players, masonIds),
    hasThingPlayer:                   containsAnyIds(players, [85]),
    hasAnnoyingLadPlayer:             containsAnyIds(players, [55]),
    hasSeerPlayer:                    containsAnyIds(players, [9]),
    hasApprenticeSeerPlayer:          containsAnyIds(players, [18]),
    hasParanormalInvestigatorPlayer:  containsAnyIds(players, [23]),
    hasMarksmanPlayer:                containsAnyIds(players, [35]),
    hasNostradamusPlayer:             containsAnyIds(players, [80]),
    hasPsychicPlayer:                 containsAnyIds(players, [51]),
    hasDetectorPlayer:                containsAnyIds(players, [56]),
    hasRobberPlayer:                  containsAnyIds(players, [8]),
    hasWitchPlayer:                   containsAnyIds(players, [27]),
    hasPickpocketPlayer:              containsAnyIds(players, [36]),
    hasRoleRetrieverPlayer:           containsAnyIds(players, [66]),
    hasVoodooLouPlayer:               containsAnyIds(players, [70]),
    hasTroublemakerPlayer:            containsAnyIds(players, [11]),
    hasVillageIdiotPlayer:            containsAnyIds(players, [26]),
    hasMarks:                         containsAnyIds(players, hasMarkIds),
    hasAuraSeerPlayer:                containsAnyIds(players, [72]),
    hasGremlinPlayer:                 containsAnyIds(players, [33]),
    hasRascalPlayer:                  containsAnyIds(players, [52]),
    hasSwitcherooPlayer:              containsAnyIds(players, [68]),
    hasDrunkPlayer:                   containsAnyIds(players, [2]),
    hasInsomniacPlayer:               containsAnyIds(players, [4]),
    hasSelfAwarenessGirlPlayer:       containsAnyIds(players, [67]),
    hasSquirePlayer:                  containsAnyIds(players, [83]),
    hasBeholderPlayer:                containsAnyIds(players, [73]) && containsAnyIds(players, seerIds),
    hasRevealerPlayer:                containsAnyIds(players, [24]),
    hasExposerPlayer:                 containsAnyIds(players, [46]),
    hasFlipperPlayer:                 containsAnyIds(players, [59]),
    hasEmpathPlayer:                  containsAnyIds(players, [77]),
    hasCuratorPlayer:                 containsAnyIds(players, [20]),
    hasBlobPlayer:                    containsAnyIds(players, [44]),
    hasMorticianPlayer:               containsAnyIds(players, [49]),
    hasFamilyManPlayer:               containsAnyIds(players, [78]),
  }

  let tokens

  switch (sceneTitle) {
    // case "JOKE":// (Scene Number 0)
    // case "EPIC_BATTLE":// (Scene Number: 1)
    /*  T W I L L I G H T */ /*
    case "ORACLE_QUESTION": // (Scene Number: 2)
      tokens = getTokensByOriginalIds(players, [50]);

      if (conditions.hasOraclePlayer) return roles.oracle_question(newGameState, tokens)

    case "ORACLE_REACTION": // (Scene Number: 3)
      tokens = getTokensByOriginalIds(players, [50]);

      if (conditions.hasOracle && oracleAnswerPlayer) return roles.oracle_reaction(newGameState, tokens) //TODO make sure always have answer if oracle in selected cards

    case "COPYCAT": // (Scene Number: 4)
      tokens = getTokensByOriginalIds(players, [30]);

      if (conditions.hasCopycatPlayer) return roles.copycat(newGameState, tokens)

    case "MIRROR_MAN": // (Scene Number: 5)
      tokens = getTokensByOriginalIds(players, [64]);

      if (conditions.hasMirrorManPlayer) return roles.mirrorman(newGameState, tokens)*/

    case "DOPPELGÄNGER": // (Scene Number: 6)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer) return roles.doppelganger(newGameState, tokens)

    case "DOPPELGÄNGER_INSTANT_ACTION": // (Scene Number: 7)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasInstantAction) return doppelganger_instant_action(newGameState, tokens)

    /*  D U S K  */ /*

    case "VAMPIRES": // (Scene Number: 8)
      tokens = getTokensByOriginalIds(players, [vampireIds]); //TODO check vampire ids

      if (conditions.hasAnyVampirePlayer) return roles.vampires(newGameState, tokens)

    case "THE_COUNT": // (Scene Number: 9)
      tokens = getTokensByOriginalIds(players, [39]);

      if (conditions.hasTheCountPlayer) return roles.thecount(newGameState, tokens)

    case "DOPPELGÄNGER_THE_COUNT": // (Scene Number: 10)
      tokens = getTokensByOriginalIds(players, [1]); //TODO 39 the count

      if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) return roles.doppelganger_thecount(newGameState, tokens)

    case "RENFIELD": // (Scene Number: 11)
      tokens = getTokensByOriginalIds(players, [38]);

      if (conditions.hasRenfieldPlayer) return roles.renfield(newGameState, tokens)

    case "DISEASED": // (Scene Number: 12)
      tokens = getTokensByOriginalIds(players, [32]);

      if (conditions.hasDiseasedPlayer) return roles.diseased(newGameState, tokens)

    case "CUPID": // (Scene Number: 13)
      tokens = getTokensByOriginalIds(players, [31]);

      if (conditions.hasCupidPlayer) return roles.cupid(newGameState, tokens)

    case "INSTIGATOR": // (Scene Number: 14)
      tokens = getTokensByOriginalIds(players, [34]);

      if (conditions.hasInstigatorPlayer) return roles.instigator(newGameState, tokens)

    case "PRIEST": // (Scene Number: 15)
      tokens = getTokensByOriginalIds(players, [37]);

      if (conditions.hasPriestPlayer) return roles.priest(newGameState, tokens)

    case "DOPPELGÄNGER_PRIEST": // (Scene Number: 16)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasPriestPlayer) return roles.doppelganger_priest(newGameState, tokens)

    case "ASSASSIN": // (Scene Number: 17)
      tokens = getTokensByOriginalIds(players, [29]);

      if (conditions.hasAssassinPlayer) return roles.assassin(newGameState, tokens)

    case "DOPPELGÄNGER_ASSASSIN": // (Scene Number: 18)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) return roles.doppelganger_assassin(newGameState, tokens)

    case "APPRENTICE_ASSASSIN": // (Scene Number: 19)
      tokens = getTokensByOriginalIds(players, [28]);

      if (conditions.hasApprenticeAssassinPlayer) return roles.apprenticeassassin(newGameState, tokens)

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": // (Scene Number: 20)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) return roles.doppelganger_apprenticeassassin(newGameState, tokens)

    case "EVERYONE_MARK": // (Scene Number: 21)
      tokens = getAllPlayerTokens(players)

      if (conditions.hasMarksPlayer) return roles.everyonemark(newGameState, tokens)*/

    /*  N I G H T  */ /*

    case "LOVERS": // (Scene Number: 22)
      tokens = //TODO mark_of_love

      if (conditions.hasCupidPlayer) return roles.lovers(newGameState, tokens)*/

    case "SENTINEL": // (Scene Number: 23) //!SHIELD & MARK_OF_FEAR
      tokens = getTokensByOriginalIds(players, [25]);

      if (conditions.hasSentinelPlayer) return roles.sentinel(newGameState, tokens)/*

    case "ALIENS": // (Scene Number: 24)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasAnyAlienPlayer) return roles.aliens(newGameState, tokens)

    case "COW": // (Scene Number: 25)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasCowPlayer) return roles.cow(newGameState, tokens)

    case "GROOB_ZERB": // (Scene Number: 26)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasGroobAndZerbPlayer) return roles.groobzerb(newGameState, tokens)

    case "LEADER": // (Scene Number: 27)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) return roles.leader(newGameState, tokens)

    case "LEADER_ZERB_GROOB": // (Scene Number: 28)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) return roles.leader_zerbgroob(newGameState, tokens)

    case "BODY_SNATCHER": // (Scene Number: 29)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasBodySnatcherPlayer) return roles.bodysnatcher(newGameState, tokens)

    case "DOPPELGÄNGER_BODY_SNATCHER": // (Scene Number: 30)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasBodySnatcherPlayer) return roles.doppelganger_bodysnatcher(newGameState, tokens)

    case "SUPER_VILLAINS": // (Scene Number: 31)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasAnySuperVillainsPlayer) return roles.supervillains(newGameState, tokens)

    case "TEMPTRESS": // (Scene Number: 32)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasTemptressPlayer) return roles.temptress(newGameState, tokens)

    case "DR_PEEKER": // (Scene Number: 33)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDrPeekerPlayer) return roles.drpeeker(newGameState, tokens)

    case "RAPSCALLION": // (Scene Number: 34)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasRapscallionPlayer) return roles.rapscallion(newGameState, tokens)

    case "EVILOMETER": // (Scene Number: 35)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasEvilometerPlayer) return roles.evilometer(newGameState, tokens)*/

    case "WEREWOLVES": // (Scene Number: 36)
      tokens = getTokensByOriginalIds(players, werewolvesIds);

      if (conditions.hasAnyWerewolfPlayers) return roles.werewolves(newGameState, tokens)

    case "ALPHA_WOLF": // (Scene Number: 37)
      tokens = getTokensByOriginalIds(players, [17]);

      if (conditions.hasAlphaWolfPlayer) return roles.alphawolf(newGameState, tokens)

    case "MYSTIC_WOLF": // (Scene Number: 38)
      tokens = getTokensByOriginalIds(players, [22]);

      if (conditions.hasMysticWolfPlayer) return roles.mysticwolf(newGameState, tokens)

    case "MINION": // (Scene Number: 39)
      tokens = getTokensByOriginalIds(players, [7]);

      if (conditions.hasMinionPlayer) return roles.minion(newGameState, tokens)

    case "APPRENTICE_TANNER": // (Scene Number: 40)
      tokens = getTokensByOriginalIds(players, [71]);

      if (conditions.hasApprenticeTannerPlayer && conditions.hasTannerPlayer) return roles.apprenticetanner(newGameState, tokens)/*

    case "MAD_SCIENTIST": // (Scene Number: 41)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasMadScientistPlayer) return roles.madscientist(newGameState, tokens)

    case "INTERN": // (Scene Number: 42)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasInternPlayer) return roles.intern(newGameState, tokens)*/

    case "MASONS": // (Scene Number: 43) //! TODO mason players
      tokens = getTokensByOriginalIds(players, masonIds);

      if (conditions.hasMasonPlayers) return roles.masons(newGameState, tokens)/*

    case "THING": // (Scene Number: 44)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasThingPlayer) return roles.thing(newGameState, tokens)

    case "ANNOYING_LAD": // (Scene Number: 45)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasAnnoyingLadPlayer) return roles.annoyinglad(newGameState, tokens)*/

    case "SEER": // (Scene Number: 46)
      tokens = getTokensByOriginalIds(players, [9]);

      if (conditions.hasSeerPlayer) return roles.seer(newGameState, tokens)

    case "APPRENTICE_SEER": // (Scene Number: 47)
      tokens = getTokensByOriginalIds(players, [18]);

      if (conditions.hasApprenticeSeerPlayer) return roles.apprenticeseer(newGameState, tokens)/*

    case "PARANORMAL_INVESTIGATOR": // (Scene Number: 48)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasParanormalInvestigatorPlayer) return roles.paranormalinvestigator(newGameState, tokens)

    case "MARKSMAN": // (Scene Number: 49)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasMarksmanPlayer) return roles.marksman(newGameState, tokens)

    case "NOSTRADAMUS": // (Scene Number: 50)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasNostradamusPlayer) return roles.nostradamus(newGameState, tokens)

    case "NOSTRADAMUS_REACTION": // (Scene Number: 51)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasNostradamusPlayer) return roles.nostradamus_reaction(newGameState, tokens)

    case "PSYCHIC": // (Scene Number: 52)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasPsychicPlayer) return roles.psychic(newGameState, tokens)

    case "DOPPELGÄNGER_PSYCHIC": // (Scene Number: 53)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasPsychicPlayer) return roles.doppelganger_psychic(newGameState, tokens)

    case "DETECTOR": // (Scene Number: 54)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDetectorPlayer) return roles.detector(newGameState, tokens)*/

    case "ROBBER": // (Scene Number: 55)
      tokens = getTokensByOriginalIds(players, [8]);

      if (conditions.hasRobberPlayer) return roles.robber(newGameState, tokens)/*

    case "WITCH": // (Scene Number: 56)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasWitchPlayer) return roles.witch(newGameState, tokens)

    case "PICKPOCKET": // (Scene Number: 57)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasPickpocketPlayer) return roles.pickpocket(newGameState, tokens)

    case "DOPPELGÄNGER_PICKPOCKET": // (Scene Number: 58)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) return roles.doppelganger_pickpocket(newGameState, tokens)

    case "ROLE_RETRIEVER": // (Scene Number: 59)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasRoleRetrieverPlayer) return roles.roleretriever(newGameState, tokens)

    case "VOODOO_LOU": // (Scene Number: 60)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasVoodooLouPlayer) return roles.voodoolou(newGameState, tokens)*/

    case "TROUBLEMAKER": // (Scene Number: 61)
      tokens = getTokensByOriginalIds(players, [11]);

      if (conditions.hasTroublemakerPlayer) return roles.troublemaker(newGameState, tokens)/*

    case "VILLAGE_IDIOT": // (Scene Number: 62)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasVillageIdiotPlayer) return roles.villageidiot(newGameState, tokens)

    case "AURA_SEER": // (Scene Number: 63)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasAuraSeerPlayer) return roles.auraseer(newGameState, tokens)

    case "GREMLIN": // (Scene Number: 64)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasGremlinPlayer) return roles.gremlin(newGameState, tokens)

    case "DOPPELGÄNGER_GREMLIN": // (Scene Number: 65)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) return roles.doppelganger_gremlin(newGameState, tokens)

    case "RASCAL": // (Scene Number: 66)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasRascalPlayer) return roles.rascal(newGameState, tokens)

    case "DOPPELGÄNGER_RASCAL": // (Scene Number: 67)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) return roles.doppelganger_rascal(newGameState, tokens)

    case "SWITCHEROO": // (Scene Number: 68)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasSwitcherooPlayer) return roles.switcheroo(newGameState, tokens)*/

    case "DRUNK": // (Scene Number: 69)
      tokens = getTokensByOriginalIds(players, [2]);

      if (conditions.hasDrunkPlayer) return roles.drunk(newGameState, tokens)

    case "INSOMNIAC": // (Scene Number: 70)
      tokens = getTokensByOriginalIds(players, [4]);

      if (conditions.hasInsomniacPlayer) return roles.insomniac(newGameState, tokens)

    case "SELF_AWARENESS_GIRL": // (Scene Number: 71)
      tokens = getTokensByOriginalIds(players, [67]);

      if (conditions.hasSelfAwarenessGirlPlayer) return roles.selfawarenessgirl(newGameState, tokens)/*

    case "SQUIRE": // (Scene Number: 72)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasSquirePlayer) return roles.squire(newGameState, tokens)

    case "BEHOLDER": // (Scene Number: 73)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasBeholderPlayer) return roles.beholder(newGameState, tokens)

    case "REVEALER": // (Scene Number: 74) //! FLIPPED
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasRevealerPlayer) return roles.revealer(newGameState, tokens)

    case "DOPPELGÄNGER_REVEALER": // (Scene Number: 75)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasRevealerPlayer) return roles.doppelganger_revealer(newGameState, tokens) //! FLIPPED

    case "EXPOSER": // (Scene Number: 76) //! FLIPPED
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasExposerPlayer) return roles.exposer(newGameState, tokens)

    case "DOPPELGÄNGER_EXPOSER": // (Scene Number: 77)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasExposerPlayer) return roles.doppelganger_exposer(newGameState, tokens) //! FLIPPED

    case "FLIPPER": // (Scene Number: 78)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasFlipperPlayer) return roles.flipper(newGameState, tokens)

    case "DOPPELGÄNGER_FLIPPER": // (Scene Number: 79)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) return roles.doppelganger_flipper(newGameState, tokens)

    case "EMPATH": // (Scene Number: 80)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasEmpathPlayer) return roles.empath(newGameState, tokens)

    case "DOPPELGÄNGER_EMPATH": // (Scene Number: 81)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasEmpathPlayer) return roles.doppelganger_empath(newGameState, tokens)

    case "CURATOR": // (Scene Number: 82) //! ARTIFACT visibility
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasCuratorPlayer) return roles.curator(newGameState, tokens)

    case "DOPPELGÄNGER_CURATOR": // (Scene Number: 83)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) return roles.doppelganger_curator(newGameState, tokens) //! ARTIFACT visibility

    case "BLOB": // (Scene Number: 84)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasBlobPlayer) return roles.blob(newGameState, tokens)

    case "MORTICIAN": // (Scene Number: 85)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasMorticianPlayer) return roles.mortician(newGameState, tokens)

    case "DOPPELGÄNGER_MORTICIAN": // (Scene Number: 86)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) return roles.doppelganger_mortician(newGameState, tokens)

    case "FAMILY_MAN": // (Scene Number: 87)
      tokens = getTokensByOriginalIds(players, [1]);

      if (conditions.hasFamilyManPlayer) return roles.familyman(newGameState, tokens)*/

    default:
      logError(`INTERACTION_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`)
    
      /* 
    //Ripple Scene:
      RIPPLE":// (Scene Number: 88) 
    //Day Scenes:
      INVESTIGATION":// (Scene Number: 89)
      VOTE":// (Scene Number: 90)
      WINNERS":// (Scene Number: 91)  
      */
  }

  return newGameState
}
