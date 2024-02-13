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
  const conditions    = checkConditions(selectedCards, totalPlayers)

  //TODO easteregg / epic battle
  switch (sceneTitle) {
   case "EPIC_BATTLE":
      if (conditions.hasEpicBattle || conditions.hasEasterEgg) return {
        [NARRATION]: roles.epicbattle(conditions.hasEasterEgg, conditions.hasEpicBattle, totalPlayers, conditions.nobadguys, conditions.nogoodguys)
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
    case "JOKE":
      return {
        [NARRATION]: roles.joke()
      }

    /*  INVESTIGATION":
        VOTE":
        WINNERS":*/
    default:
      logError(`SCENE_HANDLER_DEFAULT case: no role found for: sceneTitle ${sceneTitle}`)

  }
  
  return {}
}
