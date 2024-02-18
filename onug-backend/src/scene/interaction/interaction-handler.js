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
  //! TODO if must action, random selecting?
  switch (sceneTitle) {
    //! T W I L L I G H T
    /* 
    case "ORACLE_QUESTION":
      if (conditions.hasOraclePlayer) {
        tokens = getTokensByOriginalIds(players, [50])
        return roles.oracle_question(newGameState, tokens, sceneTitle)
      }
      break

    case "ORACLE_REACTION": //TODO make sure always have answer if oracle in selected cards
      if (conditions.hasOracle && oracleAnswerPlayer) {
        tokens = getTokensByOriginalIds(players, [50])
        return roles.oracle_reaction(newGameState, tokens, sceneTitle)
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycatPlayer) {
        tokens = getTokensByOriginalIds(players, [30])
        return roles.copycat(newGameState, tokens, sceneTitle)
      }
      break

    case "MIRROR_MAN": //COPYCAT
      if (conditions.hasMirrorManPlayer) {
        tokens = getTokensByOriginalIds(players, [64])
        return roles.copycat(newGameState, tokens, sceneTitle)
      }
      break */

    case 'DOPPELGÄNGER':
      if (conditions.hasDoppelgangerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_INSTANT_ACTION':
      if (conditions.hasDoppelgangerPlayer && hasInstantAction) {
        tokens = getTokensByOriginalIds(players, [1])
        return doppelganger_instant_action(newGameState, tokens, sceneTitle)
      }
      break

    //! D U S K
    /*
    case "VAMPIRES": //TODO check vampire ids
      if (conditions.hasAnyVampirePlayer) {
        tokens = getTokensByOriginalIds(players, [vampireIds]) 
        return roles.vampires(newGameState, tokens, sceneTitle)
      }
      break

    case "THE_COUNT": 
      if (conditions.hasTheCountPlayer) {
        tokens = getTokensByOriginalIds(players, [39])
        return roles.thecount(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_THE_COUNT": //TODO 39 the count
      if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) {
        tokens = getTokensByOriginalIds(players, [1]) 
        return roles.doppelganger_thecount(newGameState, tokens, sceneTitle)
      }
      break

    case "RENFIELD": 
      if (conditions.hasRenfieldPlayer) {
        tokens = getTokensByOriginalIds(players, [38])
        return roles.renfield(newGameState, tokens, sceneTitle)
      }
      break

    case "DISEASED": 
      if (conditions.hasDiseasedPlayer) {
        tokens = getTokensByOriginalIds(players, [32])
        return roles.diseased(newGameState, tokens, sceneTitle)
      }
      break

    case "CUPID": 
      if (conditions.hasCupidPlayer) {
        tokens = getTokensByOriginalIds(players, [31])
        return roles.cupid(newGameState, tokens, sceneTitle)
      }
      break

    case "INSTIGATOR": 
      if (conditions.hasInstigatorPlayer) {
        tokens = getTokensByOriginalIds(players, [34])
        return roles.instigator(newGameState, tokens, sceneTitle)
      }
      break

    case "PRIEST": 
      if (conditions.hasPriestPlayer) {
        tokens = getTokensByOriginalIds(players, [37])
        return roles.priest(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_PRIEST": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPriestPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_priest(newGameState, tokens, sceneTitle)
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassinPlayer) { 
        tokens = getTokensByOriginalIds(players, [29])
        return roles.assassin(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_assassin(newGameState, tokens, sceneTitle)
      }
      break

    case "APPRENTICE_ASSASSIN": 
      if (conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [28])
        return roles.apprenticeassassin(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_apprenticeassassin(newGameState, tokens, sceneTitle)
      }
      break

    case "EVERYONE_MARK": 
      if (conditions.hasMarksPlayer) {
        tokens = getAllPlayerTokens(players)
        return roles.everyonemark(newGameState, tokens, sceneTitle)
      }
      break*/
    //! N I G H T
    /*
    case "LOVERS": //TODO mark_of_love   tokens = ?
      if (conditions.hasCupidPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.lovers(newGameState, tokens, sceneTitle)
      }
      break */

    case 'SENTINEL': //!SHIELD & MARK_OF_FEAR
      if (conditions.hasSentinelPlayer) {
        tokens = getTokensByOriginalIds(players, [25])
        return roles.sentinel(newGameState, tokens, sceneTitle)
      }
      break /*

    case "ALIENS": 
      if (conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.aliens(newGameState, tokens, sceneTitle)
      }
      break

    case "COW": 
      if (conditions.hasCowPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.cow(newGameState, tokens, sceneTitle)
      }
      break

    case "GROOB_ZERB": 
      if (conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.groobzerb(newGameState, tokens, sceneTitle)}
      break

    case "LEADER": 
      if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.leader(newGameState, tokens, sceneTitle)
      }
      break

    case "LEADER_ZERB_GROOB": 
      if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.leader_zerbgroob(newGameState, tokens, sceneTitle)
      }
      break

    case "BODY_SNATCHER": 
      if (conditions.hasBodySnatcherPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.bodysnatcher(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasBodySnatcherPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_bodysnatcher(newGameState, tokens, sceneTitle)
      }
      break

    case "SUPER_VILLAINS": 
      if (conditions.hasAnySuperVillainsPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.supervillains(newGameState, tokens, sceneTitle)
      }
      break

    case "TEMPTRESS": 
      if (conditions.hasTemptressPlayer) {
        tokens = getTokensByOriginalIds(players, [69])
        return roles.temptress(newGameState, tokens, sceneTitle)
      }
      break

    case "DR_PEEKER": 
      if (conditions.hasDrPeekerPlayer) {
        tokens = getTokensByOriginalIds(players, [57])
        return roles.drpeeker(newGameState, tokens, sceneTitle)
      }
      break

    case "RAPSCALLION": 
      if (conditions.hasRapscallionPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.rapscallion(newGameState, tokens, sceneTitle)
      }
      break

    case "EVILOMETER": 
      if (conditions.hasEvilometerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.evilometer(newGameState, tokens, sceneTitle)
      }
      break */

    case 'WEREWOLVES': //! doppelganger?
      if (conditions.hasAnyWerewolfPlayers) {
        tokens = getTokensByOriginalIds(players, werewolvesIds)
        return roles.werewolves(newGameState, tokens, sceneTitle)
      }
      break

    case 'ALPHA_WOLF':
      if (conditions.hasAlphaWolfPlayer) {
        tokens = getTokensByOriginalIds(players, [17])
        return roles.alphawolf(newGameState, tokens, sceneTitle)
      }
      break

    case 'MYSTIC_WOLF':
      if (conditions.hasMysticWolfPlayer) {
        tokens = getTokensByOriginalIds(players, [22])
        return roles.mysticwolf(newGameState, tokens, sceneTitle)
      }
      break

    case 'MINION': //! doppelganger?
      if (conditions.hasMinionPlayer) {
        tokens = getTokensByOriginalIds(players, [7])
        return roles.minion(newGameState, tokens, sceneTitle)
      }
      break

    case 'APPRENTICE_TANNER': //! doppelganger?
      if (conditions.hasApprenticeTannerPlayer && conditions.hasTannerPlayer) {
        tokens = getTokensByOriginalIds(players, [71])
        return roles.apprenticetanner(newGameState, tokens, sceneTitle)
      }
      break

    case 'INTERN': //! doppelganger?, hasMad?
      if (conditions.hasInternPlayer) {
        tokens = getTokensByOriginalIds(players, conditions.hasDoppelgangerPlayer ? [62, 1] : [62])
        return roles.intern(newGameState, tokens, sceneTitle)
      }
      break

    case 'MASONS': //! TODO mason players
      if (conditions.hasMasonPlayers) {
        tokens = getTokensByOriginalIds(players, masonIds)
        return roles.masons(newGameState, tokens, sceneTitle)
      }
      break

    case 'THING':
      if (conditions.hasThingPlayer) {
        tokens = getTokensByOriginalIds(players, [85])
        return roles.thing(newGameState, tokens, sceneTitle)
      }
      break

    case 'ANNOYING_LAD': //? same as thing
      if (conditions.hasAnnoyingLadPlayer) {
        tokens = getTokensByOriginalIds(players, [55])
        return roles.thing(newGameState, tokens, sceneTitle)
      }
      break

    case 'SEER':
      if (conditions.hasSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [9])
        return roles.seer(newGameState, tokens, sceneTitle)
      }
      break

    case 'APPRENTICE_SEER':
      if (conditions.hasApprenticeSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [18])
        return roles.apprenticeseer(newGameState, tokens, sceneTitle)
      }
      break

    case 'PARANORMAL_INVESTIGATOR':
      if (conditions.hasParanormalInvestigatorPlayer) {
        tokens = getTokensByOriginalIds(players, [23])
        return roles.paranormalinvestigator(newGameState, tokens, sceneTitle)
      }
      break /*

    case "MARKSMAN": 
      if (conditions.hasMarksmanPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.marksman(newGameState, tokens, sceneTitle)
      }
      break

    case "NOSTRADAMUS": 
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.nostradamus(newGameState, tokens, sceneTitle)
      }
      break

    case "NOSTRADAMUS_REACTION": 
      if (conditions.hasNostradamusPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.nostradamus_reaction(newGameState, tokens, sceneTitle)
      }
      break

    case "PSYCHIC": 
      if (conditions.hasPsychicPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.psychic(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_PSYCHIC": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPsychicPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_psychic(newGameState, tokens, sceneTitle)
      }
      break */

    case "DETECTOR": //? same as seer
      if (conditions.hasDetectorPlayer) {
        tokens = getTokensByOriginalIds(players, [56])
        return roles.seer(newGameState, tokens, sceneTitle)
      }
      break

    case 'ROBBER':
      if (conditions.hasRobberPlayer) {
        tokens = getTokensByOriginalIds(players, [8])
        return roles.robber(newGameState, tokens, sceneTitle)
      }
      break

    case 'WITCH':
      if (conditions.hasWitchPlayer) {
        tokens = getTokensByOriginalIds(players, [27])
        return roles.witch(newGameState, tokens, sceneTitle)
      }
      break /*

    case "PICKPOCKET": 
      if (conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.pickpocket(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_pickpocket(newGameState, tokens, sceneTitle)
      }
      break */

    case 'ROLE_RETRIEVER': //? same as robber
      if (conditions.hasRoleRetrieverPlayer) {
        tokens = getTokensByOriginalIds(players, [66])
        return roles.robber(newGameState, tokens, sceneTitle)
      }
      break

    case 'VOODOO_LOU':
      if (conditions.hasVoodooLouPlayer) {
        tokens = getTokensByOriginalIds(players, [70])
        return roles.witch(newGameState, tokens, sceneTitle)
      }
      break

    case 'TROUBLEMAKER':
      if (conditions.hasTroublemakerPlayer) {
        tokens = getTokensByOriginalIds(players, [11])
        return roles.troublemaker(newGameState, tokens, sceneTitle)
      }
      break /*

    case "VILLAGE_IDIOT": 
      if (conditions.hasVillageIdiotPlayer) {
        tokens = getTokensByOriginalIds(players, [26])
        return roles.villageidiot(newGameState, tokens, sceneTitle)
      }
      break

    case "AURA_SEER": 
      if (conditions.hasAuraSeerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.auraseer(newGameState, tokens, sceneTitle)
      }
      break

    case "GREMLIN": 
      if (conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.gremlin(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_GREMLIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_gremlin(newGameState, tokens, sceneTitle)
      }
      break

    case "RASCAL": 
      if (conditions.hasRascalPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.rascal(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_RASCAL": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_rascal(newGameState, tokens, sceneTitle)
      }
      break */

    case 'SWITCHEROO': //? same as troublemaker
      if (conditions.hasSwitcherooPlayer) {
        tokens = getTokensByOriginalIds(players, [68])
        return roles.troublemaker(newGameState, tokens, sceneTitle)
      }
      break

    case 'DRUNK':
      if (conditions.hasDrunkPlayer) {
        tokens = getTokensByOriginalIds(players, [2])
        return roles.drunk(newGameState, tokens, sceneTitle)
      }
      break

    case 'INSOMNIAC':
      if (conditions.hasInsomniacPlayer) {
        tokens = getTokensByOriginalIds(players, [4])
        return roles.insomniac(newGameState, tokens, sceneTitle)
      }
      break

    case 'SELF_AWARENESS_GIRL': //? Same as insomniac
      if (conditions.hasSelfAwarenessGirlPlayer) {
        tokens = getTokensByOriginalIds(players, [67])
        return roles.insomniac(newGameState, tokens, sceneTitle)
      }
      break /*

    case "SQUIRE": 
      if (conditions.hasSquirePlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.squire(newGameState, tokens, sceneTitle)
      }
      break

    case "BEHOLDER": 
      if (conditions.hasBeholderPlayer && hasSeers) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.beholder(newGameState, tokens, sceneTitle)
      }
      break */

    case 'REVEALER':
      if (conditions.hasRevealerPlayer) {
        tokens = getTokensByOriginalIds(players, [24])
        return roles.revealer(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_REVEALER':
      if (conditions.hasDoppelgangerPlayer && conditions.hasRevealerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.revealer(newGameState, tokens, sceneTitle)
      }
      break /*

    case "EXPOSER":
      if (conditions.hasExposerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.exposer(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelgangerPlayer && conditions.hasExposerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_exposer(newGameState, tokens, sceneTitle) 
    break */

    case 'FLIPPER': //? Same as revealer
      if (conditions.hasFlipperPlayer) {
        tokens = getTokensByOriginalIds(players, [59])
        return roles.revealer(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_FLIPPER':
      if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.revealer(newGameState, tokens, sceneTitle)
      }
      break /*

    case "EMPATH": 
      if (conditions.hasEmpathPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.empath(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_EMPATH": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasEmpathPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_empath(newGameState, tokens, sceneTitle)
      }
      break */

    case 'CURATOR':
      if (conditions.hasCuratorPlayer) {
        tokens = getTokensByOriginalIds(players, [20])
        return roles.curator(newGameState, tokens, sceneTitle)
      }
      break

    case 'DOPPELGÄNGER_CURATOR':
      if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.curator(newGameState, tokens, sceneTitle)
      }
      break /*

    case "BLOB": 
      if (conditions.hasBlobPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.blob(newGameState, tokens, sceneTitle)
      }
      break

    case "MORTICIAN": 
      if (conditions.hasMorticianPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.mortician(newGameState, tokens, sceneTitle)
      }
      break

    case "DOPPELGÄNGER_MORTICIAN": 
      if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_mortician(newGameState, tokens, sceneTitle)
      }
      break

    case "FAMILY_MAN": 
      if (conditions.hasFamilyManPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.familyman(newGameState, tokens, sceneTitle)
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
