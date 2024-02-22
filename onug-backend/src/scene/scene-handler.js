//@ts-check
import * as roles from './roles'
import { logError } from '../log'
import * as conditions from './conditions'

//! todo save interaction identifiers for this: RIPPLE, aliens, blob, bodysnatcher, exposer, familyman, mortician, oracle, psychic, rascal
//TODO delete 
 //! TODO if must action, random selecting?
export const sceneHandler = (gameState) => {
  const newGameState = { ...gameState }
  const scene_title = newGameState.actual_scene.scene_title
  const selected_cards = newGameState.selected_cards
  const total_players = newGameState.total_players

  //TODO easteregg / epic battle
  switch (scene_title) {
    case "EPIC_BATTLE": //! total players
      if (conditions.hasEpicBattle(selected_cards) || conditions.hasEasterEgg(total_players)) {
        newGameState.actual_scene.started = true
        return roles.epicbattle(newGameState)
      }
      break

    case "ORACLE_QUESTION":
      if (conditions.hasOracle(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.oracle_question(newGameState)
      }
      break

    case "ORACLE_ANSWER":
      if (conditions.hasOracle(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.oracle_answer(newGameState)
      }
      break

    case "COPYCAT":
      if (conditions.hasCopycat(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.copycat(newGameState)
      }
      break

    case "MIRROR_MAN":
      if (conditions.hasMirrorMan(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.mirrorman(newGameState)
      }
      break

    case "DOPPELGÄNGER":
      if (conditions.hasDoppelganger(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.doppelganger(newGameState)
      }
      break

    case "DOPPELGÄNGER_INSTANT_ACTION":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasInstantAction(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.doppelganger_instant_action(newGameState)
      }
      break

    case "VAMPIRES":
      if (conditions.hasAnyVampire(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.vampires(newGameState)
      }
      break

    case "THE_COUNT":
      if (conditions.hasTheCount(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.thecount(newGameState, 'thecount')
      }
      break

    case "DOPPELGÄNGER_THE_COUNT":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasTheCount(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.thecount(newGameState, 'doppelganger_thecount')
      }
      break

    case "RENFIELD":
      if (conditions.hasRenfield(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.renfield(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "DISEASED":
      if (conditions.hasDiseased(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.diseased(newGameState)
      }
      break

    case "CUPID":
      if (conditions.hasCupid(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.cupid(newGameState)
      }
      break

    case "INSTIGATOR":
      if (conditions.hasInstigator(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.instigator(newGameState)
      }
      break

    case "PRIEST":
      if (conditions.hasPriest(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.priest(newGameState, 'priest')
      }
      break

    case "DOPPELGÄNGER_PRIEST":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasPriest(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.priest(newGameState, 'doppelganger_priest')
      }
      break

    case "ASSASSIN":
      if (conditions.hasAssassin(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.assassin(newGameState, 'assassin')
      }
      break

    case "DOPPELGÄNGER_ASSASSIN":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasAssassin(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.assassin(newGameState, 'doppelganger_assassin')
      }
      break

    case "APPRENTICE_ASSASSIN": 
      if (conditions.hasApprenticeAssassin(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.apprenticeassassin(newGameState, conditions.hasAssassin(selected_cards), "apprenticeassassin")
      }
      break

    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": 
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasApprenticeAssassin(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.apprenticeassassin(newGameState, conditions.hasAssassin(selected_cards), "doppelganger_apprenticeassassin")
      }
      break

    case "EVERYONE_MARK":
      if (conditions.hasMarks(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.everyonemark(newGameState)
      }
      break

    case "LOVERS":
      if (conditions.hasCupid(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.lovers(newGameState)
      }
      break

    case "SENTINEL":
      if (conditions.hasSentinel(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.sentinel(newGameState)
      }
      break

    case "ALIENS":
      if (conditions.hasAnyAlien(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.aliens(newGameState)
      }
      break

    case "COW":
      if (conditions.hasCow(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.cow(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "GROOB_ZERB":
      if (conditions.hasGroobAndZerb(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.groobzerb(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "LEADER":
      if (conditions.hasLeader(selected_cards) && conditions.hasAnyAlien(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.leader(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "LEADER_ZERB_GROOB":
      if (conditions.hasLeader(selected_cards) && conditions.hasGroobAndZerb(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.leader_zerbgroob(newGameState)
      }
      break

    case "BODY_SNATCHER":
      if (conditions.hasBodySnatcher(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.bodysnatcher(newGameState, "bodysnatcher")
      }
      break

    case "DOPPELGÄNGER_BODY_SNATCHER":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasBodySnatcher(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.bodysnatcher(newGameState, "doppelganger_bodysnatcher")
      }
      break

    case "SUPER_VILLAINS":
      if (conditions.hasAnySuperVillains(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.supervillains(newGameState)
      }
      break

    case "TEMPTRESS":
      if (conditions.hasTemptress(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.temptress(newGameState)
      }
      break

    case "DR_PEEKER":
      if (conditions.hasDrPeeker(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.drpeeker(newGameState)
      }
      break

    case "RAPSCALLION":
      if (conditions.hasRapscallion(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.rapscallion(newGameState)
      }
      break

    case "EVILOMETER":
      if (conditions.hasEvilometer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.evilometer(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "WEREWOLVES":
      if (conditions.hasAnyWerewolf(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.werewolves(newGameState, conditions.hasDreamWolf(selected_cards))
      }
      break

    case "ALPHA_WOLF":
      if (conditions.hasAlphaWolf(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.alphawolf(newGameState)
      }
      break

    case "MYSTIC_WOLF":
      if (conditions.hasMysticWolf(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.mysticwolf(newGameState)
      }
      break

    case "MINION":
      if (conditions.hasMinion(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.minion(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "APPRENTICE_TANNER":
      if (conditions.hasApprenticeTanner(selected_cards) && conditions.hasTanner(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.apprenticetanner(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "MAD_SCIENTIST":
      if (conditions.hasMadScientist(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.madscientist(newGameState)
      }
      break

    case "INTERN":
      if (conditions.hasIntern(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.intern(newGameState, conditions.hasDoppelganger(selected_cards), conditions.hasMadScientist(selected_cards))
      }
      break

    case "MASONS":
      if (conditions.hasMasons(selected_cards)) { //TODO fix hasMasons
        newGameState.actual_scene.started = true
        return roles.masons(newGameState)
      }
      break

    case "THING":
      if (conditions.hasThing(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.thing(newGameState)
      }
      break

    case "ANNOYING_LAD":
      if (conditions.hasAnnoyingLad(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.annoyinglad(newGameState)
      }
      break

    case "SEER":
      if (conditions.hasSeer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.seer(newGameState)
      }
      break

    case "APPRENTICE_SEER":
      if (conditions.hasApprenticeSeer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.apprenticeseer(newGameState)
      }
      break

    case "PARANORMAL_INVESTIGATOR":
      if (conditions.hasParanormalInvestigator(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.paranormalinvestigator(newGameState)
      }
      break

    case "MARKSMAN":
      if (conditions.hasMarksman(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.marksman(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "NOSTRADAMUS":
      if (conditions.hasNostradamus(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.nostradamus(newGameState)
      }
      break

    case "NOSTRADAMUS_REACTION":
      if (conditions.hasNostradamus(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.nostradamus_reaction(newGameState)
      }
      break

    case "PSYCHIC":
      if (conditions.hasPsychic(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.psychic(newGameState, "psychic")
      }
      break

    case "DOPPELGÄNGER_PSYCHIC":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasPsychic(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.psychic(newGameState, "doppelganger_psychic")
      }
      break

    case "DETECTOR":
      if (conditions.hasDetector(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.detector(newGameState)
      }
      break

    case "ROBBER":
      if (conditions.hasRobber(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.robber(newGameState)
      }
      break

    case "WITCH":
      if (conditions.hasWitch(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.witch(newGameState)
      }
      break

    case "PICKPOCKET":
      if (conditions.hasPickpocket(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.pickpocket(newGameState, "pickpocket")
      }
      break

    case "DOPPELGÄNGER_PICKPOCKET":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasPickpocket(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.pickpocket(newGameState, "doppelganger_pickpocket")
      }
      break

    case "ROLE_RETRIEVER":
      if (conditions.hasRoleRetriever(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.roleretriever(newGameState)
      }
      break

    case "VOODOO_LOU":
      if (conditions.hasVoodooLou(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.voodoolou(newGameState)
      }
      break

    case "TROUBLEMAKER":
      if (conditions.hasTroublemaker(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.troublemaker(newGameState)
      }
      break

    case "VILLAGE_IDIOT":
      if (conditions.hasVillageIdiot(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.villageidiot(newGameState)
      }
      break

    case "AURA_SEER":
      if (conditions.hasAuraSeer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.auraseer(newGameState, conditions.hasDoppelganger(selected_cards), conditions.hasMarks(selected_cards))
      }
      break

    case "GREMLIN":
      if (conditions.hasGremlin(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.gremlin(newGameState, "gremlin")
      }
      break

    case "DOPPELGÄNGER_GREMLIN":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasGremlin(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.gremlin(newGameState, "doppelganger_gremlin")
      }
      break

    case "RASCAL":
      if (conditions.hasRascal(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.rascal(newGameState, "rascal")
      }
      break

    case "DOPPELGÄNGER_RASCAL":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasRascal(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.rascal(newGameState, "doppelganger_rascal")
      }
      break

    case "SWITCHEROO":
      if (conditions.hasSwitcheroo(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.switcheroo(newGameState)
      }
      break

    case "DRUNK":
      if (conditions.hasDrunk(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.drunk(newGameState)
      }
      break

    case "INSOMNIAC":
      if (conditions.hasInsomniac(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.insomniac(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "SELF_AWARENESS_GIRL":
      if (conditions.hasSelfAwarenessGirl(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.selfawarenessgirl(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "SQUIRE":
      if (conditions.hasSquire(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.squire(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "BEHOLDER":
      if (conditions.hasBeholder(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.beholder(newGameState, conditions.hasSeer(selected_cards), conditions.hasApprenticeSeer(selected_cards), conditions.hasDoppelganger(selected_cards))
      }
      break

    case "REVEALER":
      if (conditions.hasRevealer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.revealer(newGameState, "revealer")
      }
      break

    case "DOPPELGÄNGER_REVEALER":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasRevealer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.revealer(newGameState, "doppelganger_revealer")
      }
      break

    case "EXPOSER":
      if (conditions.hasExposer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.exposer(newGameState, "exposer")
      }
      break

    case "DOPPELGÄNGER_EXPOSER":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasExposer(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.exposer(newGameState, "doppelganger_exposer")
      }
      break

    case "FLIPPER":
      if (conditions.hasFlipper(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.flipper(newGameState, "flipper")
      }
      break

    case "DOPPELGÄNGER_FLIPPER":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasFlipper(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.flipper(newGameState, "doppelganger_flipper")
      }
      break

    case "EMPATH":
      if (conditions.hasEmpath(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.empath(newGameState, "empath")
      }
      break

    case "DOPPELGÄNGER_EMPATH":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasEmpath(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.empath(newGameState, "doppelganger_empath")
      }
      break

    case "CURATOR":
      if (conditions.hasCurator(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.curator(newGameState, "curator")
      }
      break

    case "DOPPELGÄNGER_CURATOR":
      if (conditions.hasDoppelganger(selected_cards) && conditions.hasCurator(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.curator(newGameState, "doppelganger_curator")
      }
      break

    case "BLOB":
      if (conditions.hasBlob(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.blob(newGameState)
      }
      break

    case "MORTICIAN":
      if (conditions.hasMortician(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.mortician(newGameState, "mortician")
      }
      break

    case "DOPPELGÄNGER_MORTICIAN":
      if (conditions.hasMortician(selected_cards) && conditions.hasDoppelganger(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.mortician(newGameState, "doppelganger_mortician")
      }
      break

    case "FAMILY_MAN":
      if (conditions.hasFamilyMan(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.familyman(newGameState, conditions.hasDoppelganger(selected_cards))
      }
      break

    case "RIPPLE":
      if (conditions.hasRipple(selected_cards)) {
        newGameState.actual_scene.started = true
        return roles.ripple(newGameState)
      }
      break

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
