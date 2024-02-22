import * as roles from './roles'
import { logError } from '../log'
import * as conditions from './conditions'

export let selected_cards = {}

//! todo save interaction identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
//TODO delete 
 //! TODO if must action, random selecting?
export const sceneHandler = (gameState) => {
  const newGameState   = { ... gameState }
  const scene_title    = newGameState.actual_scene.scene_title
        selected_cards = newGameState.selected_cards

  //TODO easteregg / epic battle
  switch (scene_title) {
   /* case "EPIC_BATTLE": //! total players
      if (conditions.hasEpicBattle || conditions.hasEasterEgg) {
        newGameState.actual_scene.started = true
        return roles.epicbattle(newGameState)
      }
      break
      
    case "ORACLE_QUESTION":
      if (conditions.hasOracle) {
        newGameState.actual_scene.started = true
        return roles.oracle_question(newGameState)
      }
      break

    case "ORACLE_REACTION":
      if (conditions.hasOracle) {
        newGameState.actual_scene.started = true
        return roles.oracle_reaction(newGameState)
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycat) {
        newGameState.actual_scene.started = true
        return roles.copycat(newGameState)
      }
      break

    case "MIRROR_MAN":
      if (conditions.hasMirrorMan) {
        newGameState.actual_scene.started = true
        return roles.mirrorman(newGameState)
      }
      break

    case "DOPPELGÄNGER":
      if (conditions.hasDoppelganger) {
        newGameState.actual_scene.started = true
        return roles.doppelganger(newGameState)
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION":
      if (conditions.hasDoppelganger && conditions.hasInstantAction) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_instant_action(newGameState)
      }
      break

    case "VAMPIRES":
      if (conditions.hasAnyVampire) {
        newGameState.actual_scene.started = true
        return roles.vampires(newGameState)
      }
      break

    case "THE_COUNT": //TODO
      if (conditions.hasTheCount) {
        newGameState.actual_scene.started = true
        return roles.thecount(newGameState)
      }
      break

    case "DOPPELGÄNGER_THE_COUNT": //TODO
      if (conditions.hasDoppelganger && conditions.hasTheCount) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_thecount(newGameState)
      }
      break

    case "RENFIELD": //conditions.hasDoppelganger
      if (conditions.hasRenfield) {
        newGameState.actual_scene.started = true
        return roles.renfield(newGameState)
      }
      break

    case "DISEASED":
      if (conditions.hasDiseased) {
        newGameState.actual_scene.started = true
        return roles.diseased(newGameState)
      }
      break

    case "CUPID":
      if (conditions.hasCupid) {
        newGameState.actual_scene.started = true
        return roles.cupid(newGameState)
      }
      break

    case "INSTIGATOR":
      if (conditions.hasInstigator) {
        newGameState.actual_scene.started = true
        return roles.instigator(newGameState)
      }
      break

    case "PRIEST":
      if (conditions.hasPriest) {
        newGameState.actual_scene.started = true
        return roles.priest(newGameState)
      }
      break

    case "DOPPELGÄNGER_PRIEST":
      if (conditions.hasDoppelganger && conditions.hasPriest) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_priest(newGameState)
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassin) {
        newGameState.actual_scene.started = true
        return roles.assassin(newGameState)
      }
      break

    case "DOPPELGÄNGER_ASSASSIN":
      if (conditions.hasDoppelganger && conditions.hasAssassin) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_assassin(newGameState)
      }
      break

    case "APPRENTICE_ASSASSIN": //conditions.hasAssassin
      if (conditions.hasApprenticeAssassin) {
        newGameState.actual_scene.started = true
        return roles.apprenticeassassin(newGameState)
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": //conditions.hasAssassin
      if (conditions.hasDoppelganger && conditions.hasApprenticeAssassin) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_apprenticeassassin(newGameState)
      }
      break

    case "EVERYONE_MARK":
      if (conditions.hasMarks) {
        newGameState.actual_scene.started = true
        return roles.everyonemark(newGameState)
      }
      break
      
    case "LOVERS":
      if (conditions.hasCupid) {
        newGameState.actual_scene.started = true
        return roles.lovers(newGameState)
      }
      break

    case "SENTINEL":
      if (conditions.hasSentinel) {
        newGameState.actual_scene.started = true
        return roles.sentinel(newGameState)
      }
      break

    case "ALIENS":
      if (conditions.hasAnyAlien) {
        newGameState.actual_scene.started = true
        return roles.aliens(newGameState)
      }
      break

    case "COW": //conditions.hasDoppelganger
      if (conditions.hasCow) {
        newGameState.actual_scene.started = true
        return roles.cow(newGameState)
      }
      break

    case "GROOB_ZERB": //conditions.hasDoppelganger
      if (conditions.hasGroobAndZerb) {
        newGameState.actual_scene.started = true
        return roles.groobzerb(newGameState)
      }
      break

    case "LEADER": //conditions.hasDoppelganger
      if (conditions.hasLeader && conditions.hasAnyAlien) {
        newGameState.actual_scene.started = true
        return roles.leader(newGameState)
      }
      break

    case "LEADER_ZERB_GROOB":
      if (conditions.hasLeader && conditions.hasGroobAndZerb) {
        newGameState.actual_scene.started = true
        return roles.leader_zerbgroob(newGameState)
      }
      break

    case "BODY_SNATCHER":
      if (conditions.hasBodySnatcher) {
        newGameState.actual_scene.started = true
        return roles.bodysnatcher(newGameState)
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER":
      if (conditions.hasDoppelganger && conditions.hasBodySnatcher) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_bodysnatcher(newGameState)
      }
      break

    case "SUPER_VILLAINS":
      if (conditions.hasAnySuperVillains) {
        newGameState.actual_scene.started = true
        return roles.supervillains(newGameState)
      }
      break

    case "TEMPTRESS":
      if (conditions.hasTemptress) {
        newGameState.actual_scene.started = true
        return roles.temptress(newGameState)
      }
      break

    case "DR_PEEKER":
      if (conditions.hasDrPeeker) {
        newGameState.actual_scene.started = true
        return roles.drpeeker(newGameState)
      }
      break

    case "RAPSCALLION":
      if (conditions.hasRapscallion) {
        newGameState.actual_scene.started = true
        return roles.rapscallion(newGameState)
      }
      break

    case "EVILOMETER": //conditions.hasDoppelganger
      if (conditions.hasEvilometer) {
        newGameState.actual_scene.started = true
        return roles.evilometer(newGameState)
      }
      break */

    case "WEREWOLVES": //conditions.hasDreamWolf
      if (conditions.hasAnyWerewolf) {
        newGameState.actual_scene.started = true
        return roles.werewolves(newGameState, conditions.hasDreamWolf)
      }
      break /*

    case "ALPHA_WOLF":
      if (conditions.hasAlphaWolf) {
        newGameState.actual_scene.started = true
        return roles.alphawolf(newGameState)
      }
      break

    case "MYSTIC_WOLF":
      if (conditions.hasMysticWolf) {
        newGameState.actual_scene.started = true
        return roles.mysticwolf(newGameState)
      }
      break

    case "MINION": //conditions.hasDoppelganger
      if (conditions.hasMinion) {
        newGameState.actual_scene.started = true
        return roles.minion(newGameState)
      }
      break

    case "APPRENTICE_TANNER": //conditions.hasDoppelganger
      if (conditions.hasApprenticeTanner && conditions.hasTanner) {
        newGameState.actual_scene.started = true
        return roles.apprenticetanner(newGameState)
      }
      break

    case "MAD_SCIENTIST":
      if (conditions.hasMadScientist) {
        newGameState.actual_scene.started = true
        return roles.madscientist(newGameState)
      }
      break

    case "INTERN": //conditions.hasDoppelganger, conditions.hasMadScientist
      if (conditions.hasIntern) {
        newGameState.actual_scene.started = true
        return roles.intern(newGameState)
      }
      break

    case "MASONS":
      if (conditions.hasMasons) {
        newGameState.actual_scene.started = true
        return roles.masons(newGameState)
      }
      break

    case "THING":
      if (conditions.hasThing) {
        newGameState.actual_scene.started = true
        return roles.thing(newGameState)
      }
      break

    case "ANNOYING_LAD":
      if (conditions.hasAnnoyingLad) {
        newGameState.actual_scene.started = true
        return roles.annoyinglad(newGameState)
      }
      break

    case "SEER":
      if (conditions.hasSeer) {
        newGameState.actual_scene.started = true
        return roles.seer(newGameState)
      }
      break

    case "APPRENTICE_SEER":
      if (conditions.hasApprenticeSeer) {
        newGameState.actual_scene.started = true
        return roles.apprenticeseer(newGameState)
      }
      break

    case "PARANORMAL_INVESTIGATOR":
      if (conditions.hasParanormalInvestigator) {
        newGameState.actual_scene.started = true
        return roles.paranormalinvestigator(newGameState)
      }
      break

    case "MARKSMAN": //conditions.hasDoppelganger
      if (conditions.hasMarksman) {
        newGameState.actual_scene.started = true
        return roles.marksman(newGameState)
      }
      break

    case "NOSTRADAMUS":
      if (conditions.hasNostradamus) {
        newGameState.actual_scene.started = true
        return roles.nostradamus(newGameState)
      }
      break

    case "NOSTRADAMUS_REACTION": //last viewed card id
      if (conditions.hasNostradamus) {
        newGameState.actual_scene.started = true
        return roles.nostradamus_reaction(newGameState)
      }
      break

    case "PSYCHIC":
      if (conditions.hasPsychic) {
        newGameState.actual_scene.started = true
        return roles.psychic(newGameState)
      }
      break

    case "DOPPELGÄNGER_PSYCHIC":
      if (conditions.hasDoppelganger && conditions.hasPsychic) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_psychic(newGameState)
      }
      break

    case "DETECTOR":
      if (conditions.hasDetector) {
        newGameState.actual_scene.started = true
        return roles.detector(newGameState)
      }
      break

    case "ROBBER":
      if (conditions.hasRobber) {
        newGameState.actual_scene.started = true
        return roles.robber(newGameState)
      }
      break

    case "WITCH":
      if (conditions.hasWitch) {
        newGameState.actual_scene.started = true
        return roles.witch(newGameState)
      }
      break

    case "PICKPOCKET":
      if (conditions.hasPickpocket) {
        newGameState.actual_scene.started = true
        return roles.pickpocket(newGameState)
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET":
      if (conditions.hasDoppelganger && conditions.hasPickpocket) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_pickpocket(newGameState)
      }
      break

    case "ROLE_RETRIEVER":
      if (conditions.hasRoleRetriever) {
        newGameState.actual_scene.started = true
        return roles.roleretriever(newGameState)
      }
      break

    case "VOODOO_LOU":
      if (conditions.hasVoodooLou) {
        newGameState.actual_scene.started = true
        return roles.voodoolou(newGameState)
      }
      break */

    case "TROUBLEMAKER":
      if (conditions.hasTroublemaker) {
        newGameState.actual_scene.started = true
        return roles.troublemaker(newGameState)
      }
      break /*

    case "VILLAGE_IDIOT":
      if (conditions.hasVillageIdiot) {
        newGameState.actual_scene.started = true
        return roles.villageidiot(newGameState)
      }
      break

    case "AURA_SEER": //conditions.hasDoppelganger, conditions.hasMarks
      if (conditions.hasAuraSeer) {
        newGameState.actual_scene.started = true
        return roles.auraseer(newGameState)
      }
      break

    case "GREMLIN":
      if (conditions.hasGremlin) {
        newGameState.actual_scene.started = true
        return roles.gremlin(newGameState)
      }
      break

    case "DOPPELGÄNGER_GREMLIN":
      if (conditions.hasDoppelganger && conditions.hasGremlin) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_gremlin(newGameState)
      }
      break

    case "RASCAL":
      if (conditions.hasRascal) {
        newGameState.actual_scene.started = true
        return roles.rascal(newGameState)
      }
      break

    case "DOPPELGÄNGER_RASCAL":
      if (conditions.hasDoppelganger && conditions.hasRascal) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_rascal(newGameState)
      }
      break

    case "SWITCHEROO":
      if (conditions.hasSwitcheroo) {
        newGameState.actual_scene.started = true
        return roles.switcheroo(newGameState)
      }
      break

    case "DRUNK":
      if (conditions.hasDrunk) {
        newGameState.actual_scene.started = true
        return roles.drunk(newGameState)
      }
      break

    case "INSOMNIAC": //conditions.hasDoppelganger
      if (conditions.hasInsomniac) {
        newGameState.actual_scene.started = true
        return roles.insomniac(newGameState)
      }
      break

    case "SELF_AWARENESS_GIRL": //conditions.hasDoppelganger
      if (conditions.hasSelfAwarenessGirl) {
        newGameState.actual_scene.started = true
        return roles.selfawarenessgirl(newGameState)
      }
      break

    case "SQUIRE": //conditions.hasDoppelganger
      if (conditions.hasSquire) {
        newGameState.actual_scene.started = true
        return roles.squire(newGameState)
      }
      break

    case "BEHOLDER": //conditions.hasSeer, conditions.hasApprenticeSeer, conditions.hasDoppelganger
      if (conditions.hasBeholder) {
        newGameState.actual_scene.started = true
        return roles.beholder(newGameState)
      }
      break

    case "REVEALER":
      if (conditions.hasRevealer) {
        newGameState.actual_scene.started = true
        return roles.revealer(newGameState)
      }
      break

    case "DOPPELGÄNGER_REVEALER":
      if (conditions.hasDoppelganger && conditions.hasRevealer) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_revealer(newGameState)
      }
      break

    case "EXPOSER":
      if (conditions.hasExposer) {
        newGameState.actual_scene.started = true
        return roles.exposer(newGameState)
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelganger && conditions.hasExposer) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_exposer(newGameState)
      }
      break

    case "FLIPPER":
      if (conditions.hasFlipper) {
        newGameState.actual_scene.started = true
        return roles.flipper(newGameState)
      }
      break

    case "DOPPELGÄNGER_FLIPPER":
      if (conditions.hasDoppelganger && conditions.hasFlipper) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_flipper(newGameState)
      }
      break

    case "EMPATH":
      if (conditions.hasEmpath) {
        newGameState.actual_scene.started = true
        return roles.empath(newGameState)
      }
      break

    case "DOPPELGÄNGER_EMPATH":
      if (conditions.hasDoppelganger && conditions.hasEmpath) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_empath(newGameState)
      }
      break

    case "CURATOR":
      if (conditions.hasCurator) {
        newGameState.actual_scene.started = true
        return roles.curator(newGameState)
      }
      break

    case "DOPPELGÄNGER_CURATOR":
      if (conditions.hasDoppelganger && conditions.hasCurator) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_curator(newGameState)
      }
      break

    case "BLOB":
      if (conditions.hasBlob) {
        newGameState.actual_scene.started = true
        return roles.blob(newGameState)
      }
      break

    case "MORTICIAN":
      if (conditions.hasMortician) {
        newGameState.actual_scene.started = true
        return roles.mortician(newGameState)
      }
      break

    case "DOPPELGÄNGER_MORTICIAN":
      if (conditions.hasMortician && conditions.hasDoppelganger) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_mortician(newGameState)
      }
      break

    case "FAMILY_MAN": //conditions.hasDoppelganger
      if (conditions.hasFamilyMan) {
        newGameState.actual_scene.started = true
        return roles.familyman(newGameState)
      }
      break
      
    case "RIPPLE":
      if (conditions.hasRipple) {
        newGameState.actual_scene.started = true
        return roles.ripple(newGameState)
      }
      break */

    case "JOKE":
      
        newGameState.actual_scene.started = true
        return roles.joke(newGameState)
      

    /*  INVESTIGATION":
        VOTE":
        WINNERS":*/
    default:
      logError(`SCENE_HANDLER_DEFAULT case: no role found for: sceneTitle ${scene_title}`)

  }
  
  return newGameState
}
