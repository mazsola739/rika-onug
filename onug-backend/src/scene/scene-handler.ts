import * as roles from './roles'
import { logError } from '../log';
import { checkCards } from './check-conditions'

const NARRATION = 'actual_scene.narration'

//! todo save interaction identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
//TODO action_history
export const sceneHandler = gameState => {
  const scene_title    = gameState.actual_scene.scene_title
  const total_players  = Object.keys(gameState.players).length //TODO save total players into the gamestate
  const conditions    = checkCards(gameState.selected_cards, total_players)

  const newGameState = { ... gameState }

  //TODO easteregg / epic battle
  switch (scene_title) {
   case "EPIC_BATTLE":
      if (conditions.hasEpicBattle || conditions.hasEasterEgg) return {
        [NARRATION]: roles.epicbattle_narration(newGameState)
      }
      break
      
    case "ORACLE_QUESTION":
      if (conditions.hasOracle) return {
        [NARRATION]: roles.oracle_question_narration(newGameState)
      }
      break

    case "ORACLE_REACTION":
      if (conditions.hasOracle) return {
        [NARRATION]: roles.oracle_reaction_narration(newGameState),
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycat) return {
        [NARRATION]: roles.copycat_narration(newGameState),
      }
      break

    case "MIRROR_MAN":
      if (conditions.hasMirrorMan) return {
        [NARRATION]: roles.mirrorman_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER":
      if (conditions.hasDoppelganger) return {
        [NARRATION]: roles.doppelganger_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION":
      if (conditions.hasDoppelganger && conditions.hasInstantAction) return {
        [NARRATION]: roles.doppelganger_instant_action_narration(newGameState),
      }
      break

    case "VAMPIRES":
      if (conditions.hasAnyVampire) return {
        [NARRATION]: roles.vampires_narration(newGameState),
      }
      break

    case "THE_COUNT":
      if (conditions.hasTheCount) return {
        [NARRATION]: roles.thecount_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_THE_COUNT":
      if (conditions.hasDoppelganger && conditions.hasTheCount) return {
        [NARRATION]: roles.doppelganger_thecount_narration(newGameState),
      }
      break

    case "RENFIELD": //conditions.hasDoppelganger
      if (conditions.hasRenfield) return {
        [NARRATION]: roles.renfield_narration(newGameState),
      }
      break

    case "DISEASED":
      if (conditions.hasDiseased) return {
        [NARRATION]: roles.diseased_narration(newGameState),
      }
      break

    case "CUPID":
      if (conditions.hasCupid) return {
        [NARRATION]: roles.cupid_narration(newGameState),
      }
      break

    case "INSTIGATOR":
      if (conditions.hasInstigator) return {
        [NARRATION]: roles.instigator_narration(newGameState),
      }
      break

    case "PRIEST":
      if (conditions.hasPriest) return {
        [NARRATION]: roles.priest_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_PRIEST":
      if (conditions.hasDoppelganger && conditions.hasPriest) return {
        [NARRATION]: roles.doppelganger_priest_narration(newGameState),
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassin) return {
        [NARRATION]: roles.assassin_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_ASSASSIN":
      if (conditions.hasDoppelganger && conditions.hasAssassin) return {
        [NARRATION]: roles.doppelganger_assassin_narration(newGameState),
      }
      break

    case "APPRENTICE_ASSASSIN": //conditions.hasAssassin
      if (conditions.hasApprenticeAssassin) return {
        [NARRATION]: roles.apprenticeassassin_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": //conditions.hasAssassin
      if (conditions.hasDoppelganger && conditions.hasApprenticeAssassin) return {
        [NARRATION]: roles.doppelganger_apprenticeassassin_narration(newGameState),
      }
      break

    case "EVERYONE_MARK":
      if (conditions.hasMarks) return {
        [NARRATION]: roles.everyonemark_narration(newGameState),
      }
      break
      
    case "LOVERS":
      if (conditions.hasCupid) return {
        [NARRATION]: roles.lovers_narration(newGameState),
      }
      break

    case "SENTINEL":
      if (conditions.hasSentinel) return {
        [NARRATION]: roles.sentinel_narration(newGameState),
      }
      break

    case "ALIENS":
      if (conditions.hasAnyAlien) return {
        [NARRATION]: roles.aliens_narration(newGameState),
      }
      break

    case "COW": //conditions.hasDoppelganger
      if (conditions.hasCow) return {
        [NARRATION]: roles.cow_narration(newGameState),
      }
      break

    case "GROOB_ZERB": //conditions.hasDoppelganger
      if (conditions.hasGroobAndZerb) return {
        [NARRATION]: roles.groobzerb_narration(newGameState),
      }
      break

    case "LEADER": //conditions.hasDoppelganger
      if (conditions.hasLeader && conditions.hasAnyAlien) return {
        [NARRATION]: roles.leader_narration(newGameState),
      }
      break

    case "LEADER_ZERB_GROOB":
      if (conditions.hasLeader && conditions.hasGroobAndZerb) return {
        [NARRATION]: roles.leader_zerbgroob_narration(newGameState),
      }
      break

    case "BODY_SNATCHER":
      if (conditions.hasBodySnatcher) return {
        [NARRATION]: roles.bodysnatcher_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER":
      if (conditions.hasDoppelganger && conditions.hasBodySnatcher) return {
        [NARRATION]: roles.doppelganger_bodysnatcher_narration(newGameState),
      }
      break

    case "SUPER_VILLAINS":
      if (conditions.hasAnySuperVillains) return {
        [NARRATION]: roles.supervillains_narration(newGameState),
      }
      break

    case "TEMPTRESS":
      if (conditions.hasTemptress) return {
        [NARRATION]: roles.temptress_narration(newGameState),
      }
      break

    case "DR_PEEKER":
      if (conditions.hasDrPeeker) return {
        [NARRATION]: roles.drpeeker_narration(newGameState),
      }
      break

    case "RAPSCALLION":
      if (conditions.hasRapscallion) return {
        [NARRATION]: roles.rapscallion_narration(newGameState),
      }
      break

    case "EVILOMETER": //conditions.hasDoppelganger
      if (conditions.hasEvilometer) return {
        [NARRATION]: roles.evilometer_narration(newGameState),
      }
      break

    case "WEREWOLVES": //conditions.hasDreamWolf
      if (conditions.hasAnyWerewolf) return {
        [NARRATION]: roles.werewolves_narration(newGameState),
      }
      break

    case "ALPHA_WOLF":
      if (conditions.hasAlphaWolf) return {
        [NARRATION]: roles.alphawolf_narration(newGameState),
      }
      break

    case "MYSTIC_WOLF":
      if (conditions.hasMysticWolf) return {
        [NARRATION]: roles.mysticwolf_narration(newGameState),
      }
      break

    case "MINION": //conditions.hasDoppelganger
      if (conditions.hasMinion) return {
        [NARRATION]: roles.minion_narration(newGameState),
      }
      break

    case "APPRENTICE_TANNER": //conditions.hasDoppelganger
      if (conditions.hasApprenticeTanner && conditions.hasTanner) return {
        [NARRATION]: roles.apprenticetanner_narration(newGameState),
      }
      break

    case "MAD_SCIENTIST":
      if (conditions.hasMadScientist) return {
        [NARRATION]: roles.madscientist_narration(newGameState),
      }
      break

    case "INTERN": //conditions.hasDoppelganger, conditions.hasMadScientist
      if (conditions.hasIntern) return {
        [NARRATION]: roles.intern_narration(newGameState),
      }
      break

    case "MASONS":
      if (conditions.hasMasons) return {
        [NARRATION]: roles.masons_narration(newGameState),
      }
      break

    case "THING":
      if (conditions.hasThing) return {
        [NARRATION]: roles.thing_narration(newGameState),
      }
      break

    case "ANNOYING_LAD":
      if (conditions.hasAnnoyingLad) return {
        [NARRATION]: roles.annoyinglad_narration(newGameState),
      }
      break

    case "SEER":
      if (conditions.hasSeer) return {
        [NARRATION]: roles.seer_narration(newGameState),
      }
      break

    case "APPRENTICE_SEER":
      if (conditions.hasApprenticeSeer) return {
        [NARRATION]: roles.apprenticeseer_narration(newGameState),
      }
      break

    case "PARANORMAL_INVESTIGATOR":
      if (conditions.hasParanormalInvestigator) return {
        [NARRATION]: roles.paranormalinvestigator_narration(newGameState),
      }
      break

    case "MARKSMAN": //conditions.hasDoppelganger
      if (conditions.hasMarksman) return {
        [NARRATION]: roles.marksman_narration(newGameState),
      }
      break

    case "NOSTRADAMUS":
      if (conditions.hasNostradamus) return {
        [NARRATION]: roles.nostradamus_narration(newGameState),
      }
      break

    case "NOSTRADAMUS_REACTION": //last viewed card id
      if (conditions.hasNostradamus) return {
        [NARRATION]: roles.nostradamus_reaction_narration(newGameState),
      }
      break

    case "PSYCHIC":
      if (conditions.hasPsychic) return {
        [NARRATION]: roles.psychic_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_PSYCHIC":
      if (conditions.hasDoppelganger && conditions.hasPsychic) return {
        [NARRATION]: roles.doppelganger_psychic_narration(newGameState),
      }
      break

    case "DETECTOR":
      if (conditions.hasDetector) return {
        [NARRATION]: roles.detector_narration(newGameState),
      }
      break

    case "ROBBER":
      if (conditions.hasRobber) return {
        [NARRATION]: roles.robber_narration(newGameState),
      }
      break

    case "WITCH":
      if (conditions.hasWitch) return {
        [NARRATION]: roles.witch_narration(newGameState),
      }
      break

    case "PICKPOCKET":
      if (conditions.hasPickpocket) return {
        [NARRATION]: roles.pickpocket_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET":
      if (conditions.hasDoppelganger && conditions.hasPickpocket) return {
        [NARRATION]: roles.doppelganger_pickpocket_narration(newGameState),
      }
      break

    case "ROLE_RETRIEVER":
      if (conditions.hasRoleRetriever) return {
        [NARRATION]: roles.roleretriever_narration(newGameState),
      }
      break

    case "VOODOO_LOU":
      if (conditions.hasVoodooLou) return {
        [NARRATION]: roles.voodoolou_narration(newGameState),
      }
      break

    case "TROUBLEMAKER":
      if (conditions.hasTroublemaker) return {
        [NARRATION]: roles.troublemaker_narration(newGameState),
      }
      break

    case "VILLAGE_IDIOT":
      if (conditions.hasVillageIdiot) return {
        [NARRATION]: roles.villageidiot_narration(newGameState),
      }
      break

    case "AURA_SEER": //conditions.hasDoppelganger, conditions.hasMarks
      if (conditions.hasAuraSeer) return {
        [NARRATION]: roles.auraseer_narration(newGameState),
      }
      break

    case "GREMLIN":
      if (conditions.hasGremlin) return {
        [NARRATION]: roles.gremlin_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_GREMLIN":
      if (conditions.hasDoppelganger && conditions.hasGremlin) return {
        [NARRATION]: roles.doppelganger_gremlin_narration(newGameState),
      }
      break

    case "RASCAL":
      if (conditions.hasRascal) return {
        [NARRATION]: roles.rascal_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_RASCAL":
      if (conditions.hasDoppelganger && conditions.hasRascal) return {
        [NARRATION]: roles.doppelganger_rascal_narration(newGameState),
      }
      break

    case "SWITCHEROO":
      if (conditions.hasSwitcheroo) return {
        [NARRATION]: roles.switcheroo_narration(newGameState),
      }
      break

    case "DRUNK":
      if (conditions.hasDrunk) return {
        [NARRATION]: roles.drunk_narration(newGameState),
      }
      break

    case "INSOMNIAC": //conditions.hasDoppelganger
      if (conditions.hasInsomniac) return {
        [NARRATION]: roles.insomniac_narration(newGameState),
      }
      break

    case "SELF_AWARENESS_GIRL": //conditions.hasDoppelganger
      if (conditions.hasSelfAwarenessGirl) return {
        [NARRATION]: roles.selfawarenessgirl_narration(newGameState),
      }
      break

    case "SQUIRE": //conditions.hasDoppelganger
      if (conditions.hasSquire) return {
        [NARRATION]: roles.squire_narration(newGameState),
      }
      break

    case "BEHOLDER": //conditions.hasSeer, conditions.hasApprenticeSeer, conditions.hasDoppelganger
      if (conditions.hasBeholder) return {
        [NARRATION]: roles.beholder_narration(newGameState),
      }
      break

    case "REVEALER":
      if (conditions.hasRevealer) return {
        [NARRATION]: roles.revealer_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_REVEALER":
      if (conditions.hasDoppelganger && conditions.hasRevealer) return {
        [NARRATION]: roles.doppelganger_revealer_narration(newGameState),
      }
      break

    case "EXPOSER":
      if (conditions.hasExposer) return {
        [NARRATION]: roles.exposer_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelganger && conditions.hasExposer) return {
        [NARRATION]: roles.doppelganger_exposer_narration(newGameState),
      }
      break

    case "FLIPPER":
      if (conditions.hasFlipper) return {
        [NARRATION]: roles.flipper_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_FLIPPER":
      if (conditions.hasDoppelganger && conditions.hasFlipper) return {
        [NARRATION]: roles.doppelganger_flipper_narration(newGameState),
      }
      break

    case "EMPATH":
      if (conditions.hasEmpath) return {
        [NARRATION]: roles.empath_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_EMPATH":
      if (conditions.hasDoppelganger && conditions.hasEmpath) return {
        [NARRATION]: roles.doppelganger_empath_narration(newGameState),
      }
      break

    case "CURATOR":
      if (conditions.hasCurator) return {
        [NARRATION]: roles.curator_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_CURATOR":
      if (conditions.hasDoppelganger && conditions.hasCurator) return {
        [NARRATION]: roles.doppelganger_curator_narration(newGameState),
      }
      break

    case "BLOB":
      if (conditions.hasBlob) return {
        [NARRATION]: roles.blob_narration(newGameState),
      }
      break

    case "MORTICIAN":
      if (conditions.hasMortician) return {
        [NARRATION]: roles.mortician_narration(newGameState),
      }
      break

    case "DOPPELGÄNGER_MORTICIAN":
      if (conditions.hasMortician && conditions.hasDoppelganger) return {
        [NARRATION]: roles.doppelganger_mortician_narration(newGameState),
      }
      break

    case "FAMILY_MAN": //conditions.hasDoppelganger
      if (conditions.hasFamilyMan) return {
        [NARRATION]: roles.familyman_narration(newGameState),
      }
      break
      
    case "RIPPLE":
      if (conditions.hasRipple) return {
        [NARRATION]: roles.ripple_narration(newGameState),
      }
      break

    case "JOKE":
      return {
        [NARRATION]: roles.joke_narration(newGameState)
      }

    /*  INVESTIGATION":
        VOTE":
        WINNERS":*/
    default:
      logError(`SCENE_HANDLER_DEFAULT case: no role found for: sceneTitle ${scene_title}`)

  }
  
  return {}
};
