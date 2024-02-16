const { logDebug } = require("../../log")
const { checkConditions } = require("./check-conditions")
const { doppelgangerInstantActionsIds, werewolvesIds, seerIds, masonIds } = require("./constants")
const { roles } = require("./roles")
const { doppelganger_instant_action } = require("./roles/doppelgangerinstantaction")
const { getTokensByOriginalIds, containsAnyIds, containsAllIds } = require("./utils")

//TODO action_history
exports.interactionHandler = (gameState) => {
  const newGameState = { ...gameState }
  const sceneTitle = newGameState.actual_scene.scene_title
  const players = newGameState.players
  const selectedCards = newGameState.selected_cards

  const conditions = checkConditions(players)

  const hasInstantAction = containsAnyIds(selectedCards, doppelgangerInstantActionsIds)
  const hasBothMasons = containsAllIds(selectedCards, masonIds)
  const hasAnyMason = containsAnyIds(selectedCards, masonIds)
  const haOneMasonAndDoppelganger = containsAllIds(selectedCards, [1]) && hasAnyMason
  const hasMasons = hasBothMasons || haOneMasonAndDoppelganger //TODO check if its need to mason
  const hasSeers = containsAnyIds(selectedCards, seerIds) //TODO check i need it on beholder */

  let tokens = []

  switch (sceneTitle) {
  //! T W I L L I G H T  
  /* 
    case "ORACLE_QUESTION":
      if (conditions.hasOraclePlayer) {
        tokens = getTokensByOriginalIds(players, [50])
        return roles.oracle_question(newGameState, tokens)
      }
      break

    case "ORACLE_REACTION": //TODO make sure always have answer if oracle in selected cards
      if (conditions.hasOracle && oracleAnswerPlayer) {
        tokens = getTokensByOriginalIds(players, [50])
        return roles.oracle_reaction(newGameState, tokens)
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycatPlayer) {
        tokens = getTokensByOriginalIds(players, [30])
        return roles.copycat(newGameState, tokens)
      }
      break

    case "MIRROR_MAN": //COPYCAT
      if (conditions.hasMirrorManPlayer) {
        tokens = getTokensByOriginalIds(players, [64])
        return roles.mirrorman(newGameState, tokens)
      }
      break */

    case "DOPPELGÄNGER":
      if (conditions.hasDoppelgangerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION":
      if (conditions.hasDoppelgangerPlayer && hasInstantAction) {
        tokens = getTokensByOriginalIds(players, [1])
        return doppelganger_instant_action(newGameState, tokens)
      }
      break

  //! D U S K 
  /*
    case "VAMPIRES": //TODO check vampire ids
      if (conditions.hasAnyVampirePlayer) {
        tokens = getTokensByOriginalIds(players, [vampireIds]) 
        return roles.vampires(newGameState, tokens)
      }
      break

    case "THE_COUNT": 
      if (conditions.hasTheCountPlayer) {
        tokens = getTokensByOriginalIds(players, [39])
        return roles.thecount(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_THE_COUNT": //TODO 39 the count
      if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) {
        tokens = getTokensByOriginalIds(players, [1]) 
        return roles.doppelganger_thecount(newGameState, tokens)
      }
      break

    case "RENFIELD": 
      if (conditions.hasRenfieldPlayer) {
        tokens = getTokensByOriginalIds(players, [38])
        return roles.renfield(newGameState, tokens)
      }
      break

    case "DISEASED": 
      if (conditions.hasDiseasedPlayer) {
        tokens = getTokensByOriginalIds(players, [32])
        return roles.diseased(newGameState, tokens)
      }
      break

    case "CUPID": 
      if (conditions.hasCupidPlayer) {
        tokens = getTokensByOriginalIds(players, [31])
        return roles.cupid(newGameState, tokens)
      }
      break

    case "INSTIGATOR": 
      if (conditions.hasInstigatorPlayer) {
        tokens = getTokensByOriginalIds(players, [34])
        return roles.instigator(newGameState, tokens)
      }
      break

    case "PRIEST": 
      if (conditions.hasPriestPlayer) {
        tokens = getTokensByOriginalIds(players, [37])
        return roles.priest(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_PRIEST": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPriestPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_priest(newGameState, tokens)
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassinPlayer) { 
        tokens = getTokensByOriginalIds(players, [29])
        return roles.assassin(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_assassin(newGameState, tokens)
      }
      break

    case "APPRENTICE_ASSASSIN": 
      if (conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [28])
        return roles.apprenticeassassin(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_apprenticeassassin(newGameState, tokens)
      }
      break

    case "EVERYONE_MARK": 
      if (conditions.hasMarksPlayer) {
        tokens = getAllPlayerTokens(players)
        return roles.everyonemark(newGameState, tokens)
      }
      break*/
  //! N I G H T 
  /*
    case "LOVERS": //TODO mark_of_love   tokens = ?
      if (conditions.hasCupidPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.lovers(newGameState, tokens)
      }
      break */

    case "SENTINEL":  //!SHIELD & MARK_OF_FEAR
      if (conditions.hasSentinelPlayer) {
        tokens = getTokensByOriginalIds(players, [25])
        return roles.sentinel(newGameState, tokens)
      }
      break /*

    case "ALIENS": 
      if (conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.aliens(newGameState, tokens)
      }
      break

    case "COW": 
      if (conditions.hasCowPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.cow(newGameState, tokens)
      }
      break

    case "GROOB_ZERB": 
      if (conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.groobzerb(newGameState, tokens)}
      break

    case "LEADER": 
      if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.leader(newGameState, tokens)
      }
      break

    case "LEADER_ZERB_GROOB": 
      if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.leader_zerbgroob(newGameState, tokens)
      }
      break

    case "BODY_SNATCHER": 
      if (conditions.hasBodySnatcherPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.bodysnatcher(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasBodySnatcherPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_bodysnatcher(newGameState, tokens)
      }
      break

    case "SUPER_VILLAINS": 
      if (conditions.hasAnySuperVillainsPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.supervillains(newGameState, tokens)
      }
      break

    case "TEMPTRESS": 
      if (conditions.hasTemptressPlayer) {
        tokens = getTokensByOriginalIds(players, [69])
        return roles.temptress(newGameState, tokens)
      }
      break

    case "DR_PEEKER": 
      if (conditions.hasDrPeekerPlayer) {
        tokens = getTokensByOriginalIds(players, [57])
        return roles.drpeeker(newGameState, tokens)
      }
      break

    case "RAPSCALLION": 
      if (conditions.hasRapscallionPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.rapscallion(newGameState, tokens)
      }
      break

    case "EVILOMETER": 
      if (conditions.hasEvilometerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.evilometer(newGameState, tokens)
      }
      break */

    case "WEREWOLVES":
      if (conditions.hasAnyWerewolfPlayers) {
        tokens = getTokensByOriginalIds(players, werewolvesIds)
        return roles.werewolves(newGameState, tokens)
      }
      break

    case "ALPHA_WOLF":
      if (conditions.hasAlphaWolfPlayer) {
        tokens = getTokensByOriginalIds(players, [17])
        return roles.alphawolf(newGameState, tokens)
      }
      break

    case "MYSTIC_WOLF":
      if (conditions.hasMysticWolfPlayer) {
        tokens = getTokensByOriginalIds(players, [22])
        return roles.mysticwolf(newGameState, tokens)
      }
      break

    case "MINION":
      if (conditions.hasMinionPlayer) {
        tokens = getTokensByOriginalIds(players, [7])
        return roles.minion(newGameState, tokens)
      }
      break

    case "APPRENTICE_TANNER":
      if (conditions.hasApprenticeTannerPlayer && conditions.hasTannerPlayer) {
        tokens = getTokensByOriginalIds(players, [71])
        return roles.apprenticetanner(newGameState, tokens)
      }
      break /*

    case "INTERN": 
      if (conditions.hasInternPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.intern(newGameState, tokens)
      }
      break */

    case "MASONS":  //! TODO mason players
      if (conditions.hasMasonPlayers) {
        tokens = getTokensByOriginalIds(players, masonIds)
        return roles.masons(newGameState, tokens)
      }
      break

    case "THING":
      if (conditions.hasThingPlayer) {
        tokens = getTokensByOriginalIds(players, [85])
        return roles.thing(newGameState, tokens, 85)
      }
      break

    case "ANNOYING_LAD": //? same as thing
      if (conditions.hasAnnoyingLadPlayer) {
        tokens = getTokensByOriginalIds(players, [55])
        return roles.thing(newGameState, tokens, 55)
      }
      break

    case "SEER":
      if (conditions.hasSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [9])
        return roles.seer(newGameState, tokens)
      }
      break

    case "APPRENTICE_SEER":
      if (conditions.hasApprenticeSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [18])
        return roles.apprenticeseer(newGameState, tokens)
      } 
      break /*

    case "PARANORMAL_INVESTIGATOR": 
      if (conditions.hasParanormalInvestigatorPlayer) {
        tokens = getTokensByOriginalIds(players, [23])
        return roles.paranormalinvestigator(newGameState, tokens)
      }
      break

    case "MARKSMAN": 
      if (conditions.hasMarksmanPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.marksman(newGameState, tokens)
      }
      break

    case "NOSTRADAMUS": 
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.nostradamus(newGameState, tokens)
      }
      break

    case "NOSTRADAMUS_REACTION": 
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.nostradamus_reaction(newGameState, tokens)
      }
      break

    case "PSYCHIC": 
      if (conditions.hasPsychicPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.psychic(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_PSYCHIC": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPsychicPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_psychic(newGameState, tokens)
      }
      break

    case "DETECTOR": //SEER
      if (conditions.hasDetectorPlayer) {
        tokens = getTokensByOriginalIds(players, [56])
        return roles.detector(newGameState, tokens)
      }
      break */

    case "ROBBER":
      if (conditions.hasRobberPlayer) {
        tokens = getTokensByOriginalIds(players, [8])
        return roles.robber(newGameState, tokens, 8)
      }
      break /*

    case "WITCH": 
      if (conditions.hasWitchPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.witch(newGameState, tokens)
      }
      break

    case "PICKPOCKET": 
      if (conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.pickpocket(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_pickpocket(newGameState, tokens)
      }
      break */

    case "ROLE_RETRIEVER": //? same as robber
      if (conditions.hasRoleRetrieverPlayer) {
        tokens = getTokensByOriginalIds(players, [66])
        return roles.robber(newGameState, tokens, 66)
      }
      break /*

    case "VOODOO_LOU": 
      if (conditions.hasVoodooLouPlayer) {
        tokens = getTokensByOriginalIds(players, [70])
        return roles.voodoolou(newGameState, tokens)}
          break*/

    case "TROUBLEMAKER":
      if (conditions.hasTroublemakerPlayer) {
        tokens = getTokensByOriginalIds(players, [11])
        return roles.troublemaker(newGameState, tokens, 11)
      }
      break /*

    case "VILLAGE_IDIOT": 
      if (conditions.hasVillageIdiotPlayer) {
        tokens = getTokensByOriginalIds(players, [26])
        return roles.villageidiot(newGameState, tokens)
      }
      break

    case "AURA_SEER": 
      if (conditions.hasAuraSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.auraseer(newGameState, tokens)
      }
      break

    case "GREMLIN": 
      if (conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.gremlin(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_GREMLIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_gremlin(newGameState, tokens)
      }
      break

    case "RASCAL": 
      if (conditions.hasRascalPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.rascal(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_RASCAL": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_rascal(newGameState, tokens)
      }
      break */

    case "SWITCHEROO": //? same as troublemaker
      if (conditions.hasSwitcherooPlayer) {
        tokens = getTokensByOriginalIds(players, [68])
        return roles.troublemaker(newGameState, tokens, 68)}
      break

    case "DRUNK":
      if (conditions.hasDrunkPlayer) {
        tokens = getTokensByOriginalIds(players, [2])
        return roles.drunk(newGameState, tokens)
      }
      break

    case "INSOMNIAC":
      if (conditions.hasInsomniacPlayer) {
        tokens = getTokensByOriginalIds(players, [4])
        return roles.insomniac(newGameState, tokens, 4)
      }
      break

    case "SELF_AWARENESS_GIRL": //? Same as insomniac
      if (conditions.hasSelfAwarenessGirlPlayer) {
        tokens = getTokensByOriginalIds(players, [67])
        return roles.insomniac(newGameState, tokens, 67)
      }
      break /*

    case "SQUIRE": 
      if (conditions.hasSquirePlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.squire(newGameState, tokens)
      }
      break

    case "BEHOLDER": 
      if (conditions.hasBeholderPlayer && hasSeers) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.beholder(newGameState, tokens)
      }
      break */

    case "REVEALER":
      if (conditions.hasRevealerPlayer) {
        tokens = getTokensByOriginalIds(players, [24])
        return roles.revealer(newGameState, tokens, 24)
      }
      break

    case "DOPPELGÄNGER_REVEALER":
      if (conditions.hasDoppelgangerPlayer && conditions.hasRevealerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.revealer(newGameState, tokens, 1)
      }
    break /*

    case "EXPOSER":
      if (conditions.hasExposerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.exposer(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelgangerPlayer && conditions.hasExposerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_exposer(newGameState, tokens) 
    break */

    case "FLIPPER": //? Same as revealer
      if (conditions.hasFlipperPlayer) {
        tokens = getTokensByOriginalIds(players, [59])
        return roles.revealer(newGameState, tokens, 59)
      }
      break /*

    case "DOPPELGÄNGER_FLIPPER": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_flipper(newGameState, tokens)
      }
      break

    case "EMPATH": 
      if (conditions.hasEmpathPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.empath(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_EMPATH": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasEmpathPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_empath(newGameState, tokens)
      }
      break

    case "CURATOR":  //! ARTIFACT visibility
      if (conditions.hasCuratorPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.curator(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_CURATOR": //! ARTIFACT visibility
      if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_curator(newGameState, tokens) 
      }
      break

    case "BLOB": 
      if (conditions.hasBlobPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.blob(newGameState, tokens)
      }
      break

    case "MORTICIAN": 
      if (conditions.hasMorticianPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.mortician(newGameState, tokens)
      }
      break

    case "DOPPELGÄNGER_MORTICIAN": 
      if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_mortician(newGameState, tokens)
      }
      break

    case "FAMILY_MAN": 
      if (conditions.hasFamilyManPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.familyman(newGameState, tokens)
      }
      break */

    default:
  logDebug(
    `INTERACTION_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`
  )

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
