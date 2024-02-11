const { roles } = require("./roles")
const { instantRoleIds, doppelgangerInstantActionsIds } = require("./constants")
const { logError } = require("../../log")
const { checkConditions } = require("./check-conditions")
const { getRolesNames, getTeamName } = require("./utils")

const NARRATION = 'actual_scene.narration'

//! todo save interaction identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
//TODO action_history
exports.sceneHandler = gameState => {
  const sceneTitle    = gameState.actual_scene.scene_title
  const selectedCards = gameState.selected_cards
  const totalPlayers  = gameState.players.length
  
  const conditions    = checkConditions(selectedCards)

  switch (sceneTitle) {
    case "JOKE":
      return {
        [NARRATION]: roles.joke()
      }

    case "EPIC_BATTLE":
      if (conditions.hasEpicBattle) return {
        [NARRATION]: roles.epicbattle()
      }
      break
    //! T W I L L I G H T 
    case "ORACLE_QUESTION":
      const oq = roles.oracle_question()

      if (conditions.hasOracle) return {
        [NARRATION]: oq, 'oracle_question': oq[1]
      }
      break

    case "ORACLE_REACTION":
      const oracleQuestion = gameState.oracle_question
      const oracleAnswer = gameState.oracle_answer

      if (conditions.hasOracle) return {
        [NARRATION]: roles.oracle_reaction(oracleQuestion, oracleAnswer),
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycat) return {
        [NARRATION]: roles.copycat(),
      }
      break

    case "MIRROR_MAN":
      if (conditions.hasMirrorMan) return {
        [NARRATION]: roles.mirrorman(),
      }
      break

    case "DOPPELGÄNGER":
      if (conditions.hasDoppelganger) return {
        [NARRATION]: roles.doppelganger(),
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION":
      const instantRoles = getRolesNames(selectedCards, doppelgangerInstantActionsIds, instantRoleIds)

      if (conditions.hasDoppelganger && conditions.hasInstantAction) return {
        [NARRATION]: roles.doppelganger_instant_action(instantRoles),
      }
      break
    //! D U S K
    case "VAMPIRES":
      if (conditions.hasAnyVampire) return {
        [NARRATION]: roles.vampires(),
      }
      break

    case "THE_COUNT":
      if (conditions.hasTheCount) return {
        [NARRATION]: roles.thecount(),
      }
      break

    case "DOPPELGÄNGER_THE_COUNT":
      if (conditions.hasDoppelganger && conditions.hasTheCount) return {
        [NARRATION]: roles.doppelganger_thecount(),
      }
      break

    case "RENFIELD":
      if (conditions.hasRenfield) return {
        [NARRATION]: roles.renfield(conditions.hasDoppelganger),
      }
      break

    case "DISEASED":
      if (conditions.hasDiseased) return {
        [NARRATION]: roles.diseased(),
      }
      break

    case "CUPID":
      if (conditions.hasCupid) return {
        [NARRATION]: roles.cupid(),
      }
      break

    case "INSTIGATOR":
      if (conditions.hasInstigator) return {
        [NARRATION]: roles.instigator(),
      }
      break

    case "PRIEST":
      if (conditions.hasPriest) return {
        [NARRATION]: roles.priest(),
      }
      break

    case "DOPPELGÄNGER_PRIEST":
      if (conditions.hasDoppelganger && conditions.hasPriest) return {
        [NARRATION]: roles.doppelganger_priest(),
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassin) return {
        [NARRATION]: roles.assassin(),
      }
      break

    case "DOPPELGÄNGER_ASSASSIN":
      if (conditions.hasDoppelganger && conditions.hasAssassin) return {
        [NARRATION]: roles.doppelganger_assassin(),
      }
      break

    case "APPRENTICE_ASSASSIN":
      if (conditions.hasApprenticeAssassin) return {
        [NARRATION]: roles.apprenticeassassin(conditions.hasAssassin),
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN":
      if (conditions.hasDoppelganger && conditions.hasApprenticeAssassin) return {
        [NARRATION]: roles.doppelganger_apprenticeassassin(conditions.hasAssassin),
      }
      break

    case "EVERYONE_MARK":
      if (conditions.hasMarks) return {
        [NARRATION]: roles.everyonemark(),
      }
      break
    //! N I G H T
    case "LOVERS":
      if (conditions.hasCupid) return {
        [NARRATION]: roles.lovers(),
      }
      break

    case "SENTINEL":
      if (conditions.hasSentinel) return {
        [NARRATION]: roles.sentinel(gameState),
      }
      break

    case "ALIENS":
      if (conditions.hasAnyAlien) return {
        [NARRATION]: roles.aliens(totalPlayers),
      }
      break

    case "COW":
      if (conditions.hasCow) return {
        [NARRATION]: roles.cow(conditions.hasDoppelganger),
      }
      break

    case "GROOB_ZERB":
      if (conditions.hasGroobAndZerb) return {
        [NARRATION]: roles.groobzerb(conditions.hasDoppelganger),
      }
      break

    case "LEADER":
      if (conditions.hasLeader && conditions.hasAnyAlien) return {
        [NARRATION]: roles.leader(conditions.hasDoppelganger),
      }
      break

    case "LEADER_ZERB_GROOB":
      if (conditions.hasLeader && conditions.hasGroobAndZerb) return {
        [NARRATION]: roles.leader_zerbgroob(),
      }
      break

    case "BODY_SNATCHER":
      if (conditions.hasBodySnatcher) return {
        [NARRATION]: roles.bodysnatcher(),
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER":
      if (conditions.hasDoppelganger && conditions.hasBodySnatcher) return {
        [NARRATION]: roles.doppelganger_bodysnatcher(),
      }
      break

    case "SUPER_VILLAINS":
      if (conditions.hasAnySuperVillains) return {
        [NARRATION]: roles.supervillains(),
      }
      break

    case "TEMPTRESS":
      if (conditions.hasTemptress) return {
        [NARRATION]: roles.temptress(),
      }
      break

    case "DR_PEEKER":
      if (conditions.hasDrPeeker) return {
        [NARRATION]: roles.drpeeker(),
      }
      break

    case "RAPSCALLION":
      if (conditions.hasRapscallion) return {
        [NARRATION]: roles.rapscallion(),
      }
      break

    case "EVILOMETER":
      if (conditions.hasEvilometer) return {
        [NARRATION]: roles.evilometer(conditions.hasDoppelganger),
      }
      break

    case "WEREWOLVES":
      if (conditions.hasAnyWerewolf) return {
        [NARRATION]: roles.werewolves(conditions.hasDreamWolf),
      }
      break

    case "ALPHA_WOLF":
      if (conditions.hasAlphaWolf) return {
        [NARRATION]: roles.alphawolf(),
      }
      break

    case "MYSTIC_WOLF":
      if (conditions.hasMysticWolf) return {
        [NARRATION]: roles.mysticwolf(),
      }
      break

    case "MINION":
      if (conditions.hasMinion) return {
        [NARRATION]: roles.minion(conditions.hasDoppelganger),
      }
      break

    case "APPRENTICE_TANNER":
      if (conditions.hasApprenticeTanner && conditions.hasTanner) return {
        [NARRATION]: roles.apprenticetanner(conditions.hasDoppelganger),
      }
      break

    case "MAD_SCIENTIST":
      if (conditions.hasMadScientist) return {
        [NARRATION]: roles.madscientist(),
      }
      break

    case "INTERN":
      if (conditions.hasIntern) return {
        [NARRATION]: roles.intern(conditions.hasDoppelganger, conditions.hasMadScientist),
      }
      break

    case "MASONS":
      if (conditions.hasMasons) return {
        [NARRATION]: roles.masons(),
      }
      break

    case "THING":
      if (conditions.hasThing) return {
        [NARRATION]: roles.thing(),
      }
      break

    case "ANNOYING_LAD":
      if (conditions.hasAnnoyingLad) return {
        [NARRATION]: roles.annoyinglad(),
      }
      break

    case "SEER":
      if (conditions.hasSeer) return {
        [NARRATION]: roles.seer(),
      }
      break

    case "APPRENTICE_SEER":
      if (conditions.hasApprenticeSeer) return {
        [NARRATION]: roles.apprenticeseer(),
      }
      break

    case "PARANORMAL_INVESTIGATOR":
      if (conditions.hasParanormalInvestigator) return {
        [NARRATION]: roles.paranormalinvestigator(),
      }
      break

    case "MARKSMAN":
      if (conditions.hasMarksman) return {
        [NARRATION]: roles.marksman(conditions.hasDoppelganger),
      }
      break

    case "NOSTRADAMUS":
      if (conditions.hasNostradamus) return {
        [NARRATION]: roles.nostradamus(),
      }
      break

    case "NOSTRADAMUS_REACTION":
      const lastViewedCardId = gameState.lastViewedCardId
      const nostradamusTeam = getTeamName(lastViewedCardId) // TODO it's undefined

      if (conditions.hasNostradamus) return {
        [NARRATION]: roles.nostradamus_reaction(nostradamusTeam),
      }
      break

    case "PSYCHIC":
      if (conditions.hasPsychic) return {
        [NARRATION]: roles.psychic(),
      }
      break

    case "DOPPELGÄNGER_PSYCHIC":
      if (conditions.hasDoppelganger && conditions.hasPsychic) return {
        [NARRATION]: roles.doppelganger_psychic(),
      }
      break

    case "DETECTOR":
      if (conditions.hasDetector) return {
        [NARRATION]: roles.detector(),
      }
      break

    case "ROBBER":
      if (conditions.hasRobber) return {
        [NARRATION]: roles.robber(),
      }
      break

    case "WITCH":
      if (conditions.hasWitch) return {
        [NARRATION]: roles.witch(),
      }
      break

    case "PICKPOCKET":
      if (conditions.hasPickpocket) return {
        [NARRATION]: roles.pickpocket(),
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET":
      if (conditions.hasDoppelganger && conditions.hasPickpocket) return {
        [NARRATION]: roles.doppelganger_pickpocket(),
      }
      break

    case "ROLE_RETRIEVER":
      if (conditions.hasRoleRetriever) return {
        [NARRATION]: roles.roleretriever(),
      }
      break

    case "VOODOO_LOU":
      if (conditions.hasVoodooLou) return {
        [NARRATION]: roles.voodoolou(),
      }
      break

    case "TROUBLEMAKER":
      if (conditions.hasTroublemaker) return {
        [NARRATION]: roles.troublemaker(),
      }
      break

    case "VILLAGE_IDIOT":
      if (conditions.hasVillageIdiot) return {
        [NARRATION]: roles.villageidiot(),
      }
      break

    case "AURA_SEER":
      if (conditions.hasAuraSeer) return {
        [NARRATION]: roles.auraseer(conditions.hasDoppelganger, conditions.hasMarks),
      }
      break

    case "GREMLIN":
      if (conditions.hasGremlin) return {
        [NARRATION]: roles.gremlin(),
      }
      break

    case "DOPPELGÄNGER_GREMLIN":
      if (conditions.hasDoppelganger && conditions.hasGremlin) return {
        [NARRATION]: roles.doppelganger_gremlin(),
      }
      break

    case "RASCAL":
      if (conditions.hasRascal) return {
        [NARRATION]: roles.rascal(),
      }
      break

    case "DOPPELGÄNGER_RASCAL":
      if (conditions.hasDoppelganger && conditions.hasRascal) return {
        [NARRATION]: roles.doppelganger_rascal(),
      }
      break

    case "SWITCHEROO":
      if (conditions.hasSwitcheroo) return {
        [NARRATION]: roles.switcheroo(),
      }
      break

    case "DRUNK":
      if (conditions.hasDrunk) return {
        [NARRATION]: roles.drunk(),
      }
      break

    case "INSOMNIAC":
      if (conditions.hasInsomniac) return {
        [NARRATION]: roles.insomniac(conditions.hasDoppelganger),
      }
      break

    case "SELF_AWARENESS_GIRL":
      if (conditions.hasSelfAwarenessGirl) return {
        [NARRATION]: roles.selfawarenessgirl(conditions.hasDoppelganger),
      }
      break

    case "SQUIRE":
      if (conditions.hasSquire) return {
        [NARRATION]: roles.squire(conditions.hasDoppelganger),
      }
      break

    case "BEHOLDER":
      if (conditions.hasBeholder) return {
        [NARRATION]: roles.beholder(conditions.hasSeer, conditions.hasApprenticeSeer, conditions.hasDoppelganger),
      }
      break

    case "REVEALER":
      if (conditions.hasRevealer) return {
        [NARRATION]: roles.revealer(),
      }
      break

    case "DOPPELGÄNGER_REVEALER":
      if (conditions.hasDoppelganger && conditions.hasRevealer) return {
        [NARRATION]: roles.doppelganger_revealer(),
      }
      break

    case "EXPOSER":
      if (conditions.hasExposer) return {
        [NARRATION]: roles.exposer(),
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelganger && conditions.hasExposer) return {
        [NARRATION]: roles.doppelganger_exposer(),
      }
      break

    case "FLIPPER":
      if (conditions.hasFlipper) return {
        [NARRATION]: roles.flipper(),
      }
      break

    case "DOPPELGÄNGER_FLIPPER":
      if (conditions.hasDoppelganger && conditions.hasFlipper) return {
        [NARRATION]: roles.doppelganger_flipper(),
      }
      break

    case "EMPATH":
      if (conditions.hasEmpath) return {
        [NARRATION]: roles.empath(totalPlayers),
      }
      break

    case "DOPPELGÄNGER_EMPATH":
      if (conditions.hasDoppelganger && conditions.hasEmpath) return {
        [NARRATION]: roles.doppelganger_empath(totalPlayers),
      }
      break

    case "CURATOR":
      if (conditions.hasCurator) return {
        [NARRATION]: roles.curator(),
      }
      break

    case "DOPPELGÄNGER_CURATOR":
      if (conditions.hasDoppelganger && conditions.hasCurator) return {
        [NARRATION]: roles.doppelganger_curator(),
      }
      break

    case "BLOB":
      if (conditions.hasBlob) return {
        [NARRATION]: roles.blob(),
      }
      break

    case "MORTICIAN":
      if (conditions.hasMortician) return {
        [NARRATION]: roles.mortician(),
      }
      break

    case "DOPPELGÄNGER_MORTICIAN":
      if (conditions.hasMortician && conditions.hasDoppelganger) return {
        [NARRATION]: roles.doppelganger_mortician(),
      }
      break

    case "FAMILY_MAN":
      if (conditions.hasFamilyMan) return {
        [NARRATION]: roles.familyman(conditions.hasDoppelganger),
      }
      break
    //! R I P P L E
    case "RIPPLE":
      if (conditions.hasRipple) return {
        [NARRATION]: roles.ripple(),
      }
      break
    //! D A Y
    /*  INVESTIGATION":
        VOTE":
        WINNERS":*/
    default:
      logError(`SCENE_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`)

  }
  
  return {}
}


//TODO check if its better

/* const { roles } = require("./roles");
const { instantRoleIds, doppelgangerInstantActionsIds } = require("./constants");
const { logError } = require("../../log");
const { checkConditions } = require("./check-conditions");
const { getRolesNames } = require("./utils");

const NARRATION = 'actual_scene.narration';

exports.sceneHandler = gameState => {
  const sceneTitle = gameState.actual_scene.scene_title;
  const selectedCards = gameState.selected_cards;
  const totalPlayers = gameState.players.length;
  const conditions = checkConditions(selectedCards);

  const sceneHandlers = {
    "JOKE": () => ({ [NARRATION]: roles.joke() }),
    "EPIC_BATTLE": () => conditions.hasEpicBattle ? { [NARRATION]: roles.epicbattle() } : null,
    "ORACLE_QUESTION": () => handleRoleScene("oracle_question", conditions.hasOracle),
    "ORACLE_REACTION": () => handleRoleScene("oracle_reaction", conditions.hasOracle),
    "COPYCAT": () => handleRoleScene("copycat", conditions.hasCopycat),
    "MIRROR_MAN": () => handleRoleScene("mirrorman", conditions.hasMirrorMan),
    "DOPPELGÄNGER": () => handleRoleScene("doppelganger", conditions.hasDoppelganger),
    "DOPPELGÄNGER_INSTANT_ACTION": () => handleDoppelgangerInstantActionScene(),
    "VAMPIRES": () => handleRoleScene("vampires", conditions.hasAnyVampire),
    "THE_COUNT": () => handleRoleScene("thecount", conditions.hasTheCount),
    "DOPPELGÄNGER_THE_COUNT": () => handleRoleScene("doppelganger_thecount", conditions.hasDoppelganger && conditions.hasTheCount),
    "RENFIELD": () => handleRoleScene("renfield", conditions.hasRenfield),
    "DISEASED": () => handleRoleScene("diseased", conditions.hasDiseased),
    "CUPID": () => handleRoleScene("cupid", conditions.hasCupid),
    "INSTIGATOR": () => handleRoleScene("instigator", conditions.hasInstigator),
    "PRIEST": () => handleRoleScene("priest", conditions.hasPriest),
    "DOPPELGÄNGER_PRIEST": () => handleRoleScene("doppelganger_priest", conditions.hasDoppelganger && conditions.hasPriest),
    "ASSASSIN": () => handleRoleScene("assassin", conditions.hasAssassin),
    "DOPPELGÄNGER_ASSASSIN": () => handleRoleScene("doppelganger_assassin", conditions.hasDoppelganger && conditions.hasAssassin),
    "APPRENTICE_ASSASSIN": () => handleRoleScene("apprenticeassassin", conditions.hasApprenticeAssassin),
    "DOPPELGÄNGER_APPRENTICE_ASSASSIN": () => handleRoleScene("doppelganger_apprenticeassassin", conditions.hasDoppelganger && conditions.hasApprenticeAssassin),
    "EVERYONE_MARK": () => handleRoleScene("everyonemark", conditions.hasMarks),
    "LOVERS": () => handleRoleScene("lovers", conditions.hasCupid),
    "SENTINEL": () => handleRoleScene("sentinel", conditions.hasSentinel),
    "ALIENS": () => handleRoleScene("aliens", conditions.hasAnyAlien),
    "COW": () => handleRoleScene("cow", conditions.hasCow),
    "GROOB_ZERB": () => handleRoleScene("groobzerb", conditions.hasGroobAndZerb),
    "LEADER": () => handleRoleScene("leader", conditions.hasLeader && conditions.hasAnyAlien),
    "LEADER_ZERB_GROOB": () => handleRoleScene("leader_zerbgroob", conditions.hasLeader && conditions.hasGroobAndZerb),
    "BODY_SNATCHER": () => handleRoleScene("bodysnatcher", conditions.hasBodySnatcher),
    "DOPPELGÄNGER_BODY_SNATCHER": () => handleRoleScene("doppelganger_bodysnatcher", conditions.hasDoppelganger && conditions.hasBodySnatcher),
    "SUPER_VILLAINS": () => handleRoleScene("supervillains", conditions.hasAnySuperVillains),
    "TEMPTRESS": () => handleRoleScene("temptress", conditions.hasTemptress),
    "DR_PEEKER": () => handleRoleScene("drpeeker", conditions.hasDrPeeker),
    "RAPSCALLION": () => handleRoleScene("rapscallion", conditions.hasRapscallion),
    "EVILOMETER": () => handleRoleScene("evilometer", conditions.hasEvilometer),
    "WEREWOLVES": () => handleRoleScene("werewolves", conditions.hasAnyWerewolf),
    "ALPHA_WOLF": () => handleRoleScene("alphawolf", conditions.hasAlphaWolf),
    "MYSTIC_WOLF": () => handleRoleScene("mysticwolf", conditions.hasMysticWolf),
    "MINION": () => handleRoleScene("minion", conditions.hasMinion),
    "APPRENTICE_TANNER": () => handleRoleScene("apprenticetanner", conditions.hasApprenticeTanner && conditions.hasTanner),
    "MAD_SCIENTIST": () => handleRoleScene("madscientist", conditions.hasMadScientist),
    "INTERN": () => handleRoleScene("intern", conditions.hasIntern),
    "MASONS": () => handleRoleScene("masons", conditions.hasMasons),
    "THING": () => handleRoleScene("thing", conditions.hasThing),
    "ANNOYING_LAD": () => handleRoleScene("annoyinglad", conditions.hasAnnoyingLad),
    "SEER": () => handleRoleScene("seer", conditions.hasSeer),
    "APPRENTICE_SEER": () => handleRoleScene("apprenticeseer", conditions.hasApprenticeSeer),
    "PARANORMAL_INVESTIGATOR": () => handleRoleScene("paranormalinvestigator", conditions.hasParanormalInvestigator),
    "MARKSMAN": () => handleRoleScene("marksman", conditions.hasMarksman),
    "NOSTRADAMUS": () => handleRoleScene("nostradamus", conditions.hasNostradamus),
    "NOSTRADAMUS_REACTION": () => handleNostradamusReactionScene(),
    "PSYCHIC": () => handleRoleScene("psychic", conditions.hasPsychic),
    "DOPPELGÄNGER_PSYCHIC": () => handleRoleScene("doppelganger_psychic", conditions.hasDoppelganger && conditions.hasPsychic),
    "DETECTOR": () => handleRoleScene("detector", conditions.hasDetector),
    "ROBBER": () => handleRoleScene("robber", conditions.hasRobber),
    "WITCH": () => handleRoleScene("witch", conditions.hasWitch),
    "PICKPOCKET": () => handleRoleScene("pickpocket", conditions.hasPickpocket),
    "DOPPELGÄNGER_PICKPOCKET": () => handleRoleScene("doppelganger_pickpocket", conditions.hasDoppelganger && conditions.hasPickpocket),
    "ROLE_RETRIEVER": () => handleRoleScene("roleretriever", conditions.hasRoleRetriever),
    "VOODOO_LOU": () => handleRoleScene("voodoolou", conditions.hasVoodooLou),
    "TROUBLEMAKER": () => handleRoleScene("troublemaker", conditions.hasTroublemaker),
    "VILLAGE_IDIOT": () => handleRoleScene("villageidiot", conditions.hasVillageIdiot),
    "AURA_SEER": () => handleRoleScene("auraseer", conditions.hasAuraSeer),
    "GREMLIN": () => handleRoleScene("gremlin", conditions.hasGremlin),
    "DOPPELGÄNGER_GREMLIN": () => handleRoleScene("doppelganger_gremlin", conditions.hasDoppelganger && conditions.hasGremlin),
    "RASCAL": () => handleRoleScene("rascal", conditions.hasRascal),
    "DOPPELGÄNGER_RASCAL": () => handleRoleScene("doppelganger_rascal", conditions.hasDoppelganger && conditions.hasRascal),
    "SWITCHEROO": () => handleRoleScene("switcheroo", conditions.hasSwitcheroo),
    "DRUNK": () => handleRoleScene("drunk", conditions.hasDrunk),
    "INSOMNIAC": () => handleRoleScene("insomniac", conditions.hasInsomniac),
    "SELF_AWARENESS_GIRL": () => handleRoleScene("selfawarenessgirl", conditions.hasSelfAwarenessGirl),
    "SQUIRE": () => handleRoleScene("squire", conditions.hasSquire),
    "BEHOLDER": () => handleRoleScene("beholder", conditions.hasBeholder),
    "REVEALER": () => handleRoleScene("revealer", conditions.hasRevealer),
    "DOPPELGÄNGER_REVEALER": () => handleRoleScene("doppelganger_revealer", conditions.hasDoppelganger && conditions.hasRevealer),
    "EXPOSER": () => handleRoleScene("exposer", conditions.hasExposer),
    "DOPPELGÄNGER_EXPOSER": () => handleRoleScene("doppelganger_exposer", conditions.hasDoppelganger && conditions.hasExposer),
    "FLIPPER": () => handleRoleScene("flipper", conditions.hasFlipper),
    "DOPPELGÄNGER_FLIPPER": () => handleRoleScene("doppelganger_flipper", conditions.hasDoppelganger && conditions.hasFlipper),
    "EMPATH": () => handleRoleScene("empath", conditions.hasEmpath),
    "DOPPELGÄNGER_EMPATH": () => handleRoleScene("doppelganger_empath", conditions.hasDoppelganger && conditions.hasEmpath),
    "CURATOR": () => handleRoleScene("curator", conditions.hasCurator),
    "DOPPELGÄNGER_CURATOR": () => handleRoleScene("doppelganger_curator", conditions.hasDoppelganger && conditions.hasCurator),
    "BLOB": () => handleRoleScene("blob", conditions.hasBlob),
    "MORTICIAN": () => handleRoleScene("mortician", conditions.hasMortician),
    "DOPPELGÄNGER_MORTICIAN": () => handleRoleScene("doppelganger_mortician", conditions.hasMortician && conditions.hasDoppelganger),
    "FAMILY_MAN": () => handleRoleScene("familyman", conditions.hasFamilyMan),
    "RIPPLE": () => handleRoleScene("ripple", conditions.hasRipple),
    // Add more scene handlers as needed...
  };
  
  function handleRoleScene(roleName, condition) {
    return condition ? { [NARRATION]: roles[roleName]() } : null;
  }
  
  function handleDoppelgangerInstantActionScene() {
    const instantRoles = getRolesNames(selectedCards, doppelgangerInstantActionsIds, instantRoleIds);
    return conditions.hasDoppelganger && conditions.hasInstantAction ? { [NARRATION]: roles.doppelganger_instant_action(instantRoles) } : null;
  }
  
  function handleNostradamusReactionScene() {
    const lastViewedCardId = gameState.lastViewedCardId;
    const nostradamusTeam = getTeamName(lastViewedCardId); // TODO it's undefined
    return conditions.hasNostradamus ? { [NARRATION]: roles.nostradamus_reaction(nostradamusTeam) } : null;
  }
  

  function handleRoleScene(roleName, condition) {
    return condition ? { [NARRATION]: roles[roleName]() } : null;
  }

  function handleDoppelgangerInstantActionScene() {
    const instantRoles = getRolesNames(selectedCards, doppelgangerInstantActionsIds, instantRoleIds);
    return conditions.hasDoppelganger && conditions.hasInstantAction ? { [NARRATION]: roles.doppelganger_instant_action(instantRoles) } : null;
  }

  const handler = sceneHandlers[sceneTitle];
  if (handler) {
    return handler();
  } else {
    logError(`SCENE_HANDLER_DEFAULT case: no role found for sceneTitle ${sceneTitle}`);
    return {};
  }
};
 */