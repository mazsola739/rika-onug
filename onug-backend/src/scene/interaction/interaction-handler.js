const { logError } = require("../../log")
const { checkConditions } = require("./check-conditions")
const { doppelgangerInstantActionsIds, werewolvesIds, seerIds, masonIds } = require("./constants")
const { roles } = require("./roles")
const { doppelganger_instant_action } = require("./roles/doppelgangerinstantaction")
const { getTokenByOriginalIds, containsAnyIds, containsAllIds, getTokensByOriginalIds } = require("./utils")

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

  let token = ""
  let tokens = []

  switch (sceneTitle) {
  //! T W I L L I G H T  
  /* 
    case "ORACLE_QUESTION":
      if (conditions.hasOraclePlayer) {
        token = getTokenByOriginalIds(players, [50])
        return roles.oracle_question(newGameState, token)
      }
      break

    case "ORACLE_REACTION": //TODO make sure always have answer if oracle in selected cards
      if (conditions.hasOracle && oracleAnswerPlayer) {
        token = getTokenByOriginalIds(players, [50])
        return roles.oracle_reaction(newGameState, token)
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycatPlayer) {
        token = getTokenByOriginalIds(players, [30])
        return roles.copycat(newGameState, token)
      }
      break

    case "MIRROR_MAN":
      if (conditions.hasMirrorManPlayer) {
        token = getTokenByOriginalIds(players, [64])
        return roles.mirrorman(newGameState, token)
      }
      break */

    case "DOPPELGÄNGER":
      if (conditions.hasDoppelgangerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION":
      if (conditions.hasDoppelgangerPlayer && hasInstantAction) {
        token = getTokenByOriginalIds(players, [1])
        return doppelganger_instant_action(newGameState, token)
      }
      break

  //! D U S K 
  /*
    case "VAMPIRES": //TODO check vampire ids
      if (conditions.hasAnyVampirePlayer) {
        token = getTokenByOriginalIds(players, [vampireIds]) 
        return roles.vampires(newGameState, token)
      }
      break

    case "THE_COUNT": 
      if (conditions.hasTheCountPlayer) {
        token = getTokenByOriginalIds(players, [39])
        return roles.thecount(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_THE_COUNT": //TODO 39 the count
      if (conditions.hasDoppelgangerPlayer && conditions.hasTheCountPlayer) {
        token = getTokenByOriginalIds(players, [1]) 
        return roles.doppelganger_thecount(newGameState, token)
      }
      break

    case "RENFIELD": 
      if (conditions.hasRenfieldPlayer) {
        token = getTokenByOriginalIds(players, [38])
        return roles.renfield(newGameState, token)
      }
      break

    case "DISEASED": 
      if (conditions.hasDiseasedPlayer) {
        token = getTokenByOriginalIds(players, [32])
        return roles.diseased(newGameState, token)
      }
      break

    case "CUPID": 
      if (conditions.hasCupidPlayer) {
        token = getTokenByOriginalIds(players, [31])
        return roles.cupid(newGameState, token)
      }
      break

    case "INSTIGATOR": 
      if (conditions.hasInstigatorPlayer) {
        token = getTokenByOriginalIds(players, [34])
        return roles.instigator(newGameState, token)
      }
      break

    case "PRIEST": 
      if (conditions.hasPriestPlayer) {
        token = getTokenByOriginalIds(players, [37])
        return roles.priest(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_PRIEST": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPriestPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_priest(newGameState, token)
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassinPlayer) { 
        token = getTokenByOriginalIds(players, [29])
        return roles.assassin(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasAssassinPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_assassin(newGameState, token)
      }
      break

    case "APPRENTICE_ASSASSIN": 
      if (conditions.hasApprenticeAssassinPlayer) {
        token = getTokenByOriginalIds(players, [28])
        return roles.apprenticeassassin(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasApprenticeAssassinPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_apprenticeassassin(newGameState, token)
      }
      break

    case "EVERYONE_MARK": 
      if (conditions.hasMarksPlayer) {
        token = getAllPlayerTokens(players)
        return roles.everyonemark(newGameState, token)
      }
      break*/
  //! N I G H T 
  /*
    case "LOVERS": //TODO mark_of_love   token = ?
      if (conditions.hasCupidPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.lovers(newGameState, token)
      }
      break */

    case "SENTINEL":  //!SHIELD & MARK_OF_FEAR
      if (conditions.hasSentinelPlayer) {
        token = getTokenByOriginalIds(players, [25])
        return roles.sentinel(newGameState, token)
      }
      break /*

    case "ALIENS": 
      if (conditions.hasAnyAlienPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.aliens(newGameState, token)
      }
      break

    case "COW": 
      if (conditions.hasCowPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.cow(newGameState, token)
      }
      break

    case "GROOB_ZERB": 
      if (conditions.hasGroobAndZerbPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.groobzerb(newGameState, token)}
      break

    case "LEADER": 
      if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.leader(newGameState, token)
      }
      break

    case "LEADER_ZERB_GROOB": 
      if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.leader_zerbgroob(newGameState, token)
      }
      break

    case "BODY_SNATCHER": 
      if (conditions.hasBodySnatcherPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.bodysnatcher(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasBodySnatcherPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_bodysnatcher(newGameState, token)
      }
      break

    case "SUPER_VILLAINS": 
      if (conditions.hasAnySuperVillainsPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.supervillains(newGameState, token)
      }
      break

    case "TEMPTRESS": 
      if (conditions.hasTemptressPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.temptress(newGameState, token)
      }
      break

    case "DR_PEEKER": 
      if (conditions.hasDrPeekerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.drpeeker(newGameState, token)
      }
      break

    case "RAPSCALLION": 
      if (conditions.hasRapscallionPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.rapscallion(newGameState, token)
      }
      break

    case "EVILOMETER": 
      if (conditions.hasEvilometerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.evilometer(newGameState, token)
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
        token = getTokenByOriginalIds(players, [17])
        return roles.alphawolf(newGameState, token)
      }
      break

    case "MYSTIC_WOLF":
      if (conditions.hasMysticWolfPlayer) {
        token = getTokenByOriginalIds(players, [22])
        return roles.mysticwolf(newGameState, token)
      }
      break

    case "MINION":
      if (conditions.hasMinionPlayer) {
        token = getTokenByOriginalIds(players, [7])
        return roles.minion(newGameState, token)
      }
      break

    case "APPRENTICE_TANNER":
      if (conditions.hasApprenticeTannerPlayer && conditions.hasTannerPlayer) {
        token = getTokenByOriginalIds(players, [71])
        return roles.apprenticetanner(newGameState, token)
      }
      break /*

    case "MAD_SCIENTIST": 
      if (conditions.hasMadScientistPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.madscientist(newGameState, token)
      }
      break

    case "INTERN": 
      if (conditions.hasInternPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.intern(newGameState, token)
      }
      break */

    case "MASONS":  //! TODO mason players
      if (conditions.hasMasonPlayers) {
        tokens = getTokensByOriginalIds(players, masonIds)
        return roles.masons(newGameState, token)
      }
      break

    case "THING":
      if (conditions.hasThingPlayer) {
        token = getTokenByOriginalIds(players, [85])
        return roles.thing(newGameState, token)
      }
      break

    case "ANNOYING_LAD":
      if (conditions.hasAnnoyingLadPlayer) {
        token = getTokenByOriginalIds(players, [55])
        return roles.annoyinglad(newGameState, token)
      }
      break

    case "SEER":
      if (conditions.hasSeerPlayer) {
        token = getTokenByOriginalIds(players, [9])
        return roles.seer(newGameState, token)
      }
      break

    case "APPRENTICE_SEER":
      if (conditions.hasApprenticeSeerPlayer) {
        token = getTokenByOriginalIds(players, [18])
        return roles.apprenticeseer(newGameState, token)
      } 
      break /*

    case "PARANORMAL_INVESTIGATOR": 
      if (conditions.hasParanormalInvestigatorPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.paranormalinvestigator(newGameState, token)
      }
      break

    case "MARKSMAN": 
      if (conditions.hasMarksmanPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.marksman(newGameState, token)
      }
      break

    case "NOSTRADAMUS": 
      if (conditions.hasNostradamusPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.nostradamus(newGameState, token)
      }
      break

    case "NOSTRADAMUS_REACTION": 
      if (conditions.hasNostradamusPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.nostradamus_reaction(newGameState, token)
      }
      break

    case "PSYCHIC": 
      if (conditions.hasPsychicPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.psychic(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_PSYCHIC": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPsychicPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_psychic(newGameState, token)
      }
      break

    case "DETECTOR": 
      if (conditions.hasDetectorPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.detector(newGameState, token)
      }
      break */

    case "ROBBER":
      if (conditions.hasRobberPlayer) {
        token = getTokenByOriginalIds(players, [8])
        return roles.robber(newGameState, token)
      }
      break /*

    case "WITCH": 
      if (conditions.hasWitchPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.witch(newGameState, token)
      }
      break

    case "PICKPOCKET": 
      if (conditions.hasPickpocketPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.pickpocket(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasPickpocketPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_pickpocket(newGameState, token)
      }
      break

    case "ROLE_RETRIEVER": 
      if (conditions.hasRoleRetrieverPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.roleretriever(newGameState, token)
      }
      break

    case "VOODOO_LOU": 
      if (conditions.hasVoodooLouPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.voodoolou(newGameState, token)}
          break*/

    case "TROUBLEMAKER":
      if (conditions.hasTroublemakerPlayer) {
        token = getTokenByOriginalIds(players, [11])
        return roles.troublemaker(newGameState, token)
      }
      break /*

    case "VILLAGE_IDIOT": 
      if (conditions.hasVillageIdiotPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.villageidiot(newGameState, token)
      }
      break

    case "AURA_SEER": 
      if (conditions.hasAuraSeerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.auraseer(newGameState, token)
      }
      break

    case "GREMLIN": 
      if (conditions.hasGremlinPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.gremlin(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_GREMLIN": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasGremlinPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_gremlin(newGameState, token)
      }
      break

    case "RASCAL": 
      if (conditions.hasRascalPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.rascal(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_RASCAL": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_rascal(newGameState, token)
      }
      break

    case "SWITCHEROO": 
      if (conditions.hasSwitcherooPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.switcheroo(newGameState, token)}
      break*/

    case "DRUNK":
      if (conditions.hasDrunkPlayer) {
        token = getTokenByOriginalIds(players, [2])
        return roles.drunk(newGameState, token)
      }
      break

    case "INSOMNIAC":
      if (conditions.hasInsomniacPlayer) {
        token = getTokenByOriginalIds(players, [4])
        return roles.insomniac(newGameState, token)
      }
      break

    case "SELF_AWARENESS_GIRL":
      if (conditions.hasSelfAwarenessGirlPlayer) {
        token = getTokenByOriginalIds(players, [67])
        return roles.selfawarenessgirl(newGameState, token)
      }
      break /*

    case "SQUIRE": 
      if (conditions.hasSquirePlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.squire(newGameState, token)
      }
      break

    case "BEHOLDER": 
      if (conditions.hasBeholderPlayer && hasSeers) {
        token = getTokenByOriginalIds(players, [1])
        return roles.beholder(newGameState, token)
      }
      break

    case "REVEALER":  //! FLIPPED
      if (conditions.hasRevealerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.revealer(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_REVEALER": //! FLIPPED}
      if (conditions.hasDoppelgangerPlayer && conditions.hasRevealerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_revealer(newGameState, token) 
    break

    case "EXPOSER":  //! FLIPPED
      if (conditions.hasExposerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.exposer(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_EXPOSER": //! FLIPPED}
      if (conditions.hasDoppelgangerPlayer && conditions.hasExposerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_exposer(newGameState, token) 
    break

    case "FLIPPER": 
      if (conditions.hasFlipperPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.flipper(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_FLIPPER": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasFlipperPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_flipper(newGameState, token)
      }
      break

    case "EMPATH": 
      if (conditions.hasEmpathPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.empath(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_EMPATH": 
      if (conditions.hasDoppelgangerPlayer && conditions.hasEmpathPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_empath(newGameState, token)
      }
      break

    case "CURATOR":  //! ARTIFACT visibility
      if (conditions.hasCuratorPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.curator(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_CURATOR": //! ARTIFACT visibility
      if (conditions.hasDoppelgangerPlayer && conditions.hasCuratorPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_curator(newGameState, token) 
      }
      break

    case "BLOB": 
      if (conditions.hasBlobPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.blob(newGameState, token)
      }
      break

    case "MORTICIAN": 
      if (conditions.hasMorticianPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.mortician(newGameState, token)
      }
      break

    case "DOPPELGÄNGER_MORTICIAN": 
      if (conditions.hasMorticianPlayer && conditions.hasDoppelgangerPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.doppelganger_mortician(newGameState, token)
      }
      break

    case "FAMILY_MAN": 
      if (conditions.hasFamilyManPlayer) {
        token = getTokenByOriginalIds(players, [1])
        return roles.familyman(newGameState, token)
      }
      break */

    default:
  logError(
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
